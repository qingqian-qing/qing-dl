#!/usr/bin/env python3
'''自动同步上游 GitHub Release 的 APK 到本仓库 Release（tag: apk-v1）。'''
import json, os, sys, urllib.parse, urllib.request, urllib.error

REPO  = os.environ['GITHUB_REPOSITORY']
TOKEN = os.environ.get('GH_TOKEN') or os.environ.get('GITHUB_TOKEN')
TAG   = 'apk-v1'
API   = 'https://api.github.com'
UP    = 'https://uploads.github.com'
ROOT  = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATE = os.path.join(ROOT, 'data', 'versions.json')

# 想加应用就往这里加一行：key 唯一，file 是仓库里固定的文件名
APPS = [
    {'key': 'ehviewer',     'file': 'ehviewer.apk',     'upstream': 'xiaojieonly/Ehviewer_CN_SXJ'},
    {'key': 'han1meviewer', 'file': 'han1meviewer.apk', 'upstream': 'misaka10032w/Han1meViewer'},
]

def req(url, method='GET', data=None, ctype=None, auth=True, timeout=180):
    r = urllib.request.Request(url, method=method, data=data)
    r.add_header('User-Agent', 'apk-sync')
    if auth:
        r.add_header('Authorization', 'Bearer ' + TOKEN)
        r.add_header('Accept', 'application/vnd.github+json')
    if ctype:
        r.add_header('Content-Type', ctype)
    try:
        with urllib.request.urlopen(r, timeout=timeout) as resp:
            return resp.read()
    except urllib.error.HTTPError as e:
        print('  ! HTTP %s  %s' % (e.code, url), file=sys.stderr)
        return None
    except Exception as e:
        print('  ! %s  %s' % (e, url), file=sys.stderr)
        return None

def gh(path, method='GET', obj=None):
    data = json.dumps(obj).encode() if obj is not None else None
    raw = req(API + path, method=method, data=data, ctype='application/json')
    if not raw:
        return None
    try:
        return json.loads(raw)
    except Exception:
        return None

def ensure_release():
    r = gh('/repos/%s/releases/tags/%s' % (REPO, TAG))
    if r and r.get('id'):
        return r
    print('> 创建 release %s' % TAG)
    return gh('/repos/%s/releases' % REPO, 'POST',
              {'tag_name': TAG, 'name': 'APK Collection ' + TAG, 'body': '由 GitHub Actions 自动同步'})

def del_asset(rel, name):
    for a in rel.get('assets', []):
        if a['name'] == name:
            print('  删除旧资产 %s' % name)
            gh('/repos/%s/releases/assets/%d' % (REPO, a['id']), 'DELETE')

def upload(rel_id, name, blob):
    url = '%s/repos/%s/releases/%d/assets?name=%s' % (UP, REPO, rel_id, urllib.parse.quote(name))
    raw = req(url, 'POST', data=blob, ctype='application/octet-stream', timeout=900)
    if not raw:
        return None
    try:
        return json.loads(raw)
    except Exception:
        return None

def main():
    if not TOKEN:
        print('缺少 TOKEN'); return 1
    try:
        state = json.load(open(STATE))
    except Exception:
        state = {}
    rel = ensure_release()
    if not rel or not rel.get('id'):
        print('无法取得 release'); return 1
    changed = False
    for app in APPS:
        up = gh('/repos/%s/releases/latest' % app['upstream'])
        if not up or not up.get('tag_name'):
            print('[跳过] %-13s 上游不可用' % app['key']); continue
        tag = up['tag_name']
        apk = None
        for a in up.get('assets') or []:
            if a['name'].lower().endswith('.apk'):
                apk = a; break
        if not apk:
            print('[跳过] %-13s 上游无 apk' % app['key']); continue
        has = any(a['name'] == app['file'] for a in rel.get('assets', []))
        if state.get(app['key']) == tag and has:
            print('[最新] %-13s %s' % (app['key'], tag)); continue
        print('[更新] %-13s %s -> %s  (%s, %.1f MB)' % (app['key'], state.get(app['key'], '无'), tag, apk['name'], apk['size']/1048576))
        blob = req(apk['browser_download_url'], auth=False, timeout=900)
        if not blob:
            print('  下载失败'); continue
        if len(blob) != apk['size']:
            print('  大小不符 %d != %d，放弃' % (len(blob), apk['size'])); continue
        del_asset(rel, app['file'])
        print('  上传 %s …' % app['file'])
        res = upload(rel['id'], app['file'], blob)
        if res and res.get('id'):
            state[app['key']] = tag
            changed = True
            rel = gh('/repos/%s/releases/tags/%s' % (REPO, TAG))
            print('  ✓ 完成')
        else:
            print('  上传失败')
    if changed:
        json.dump(state, open(STATE, 'w'), indent=2, ensure_ascii=False)
        print('> 已写入 %s' % STATE)
    else:
        print('> 无变化')
    return 0

if __name__ == '__main__':
    sys.exit(main())
