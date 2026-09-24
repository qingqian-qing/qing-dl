/* ==========================================
   下载列表 —— 以后加/改只动这个文件

   url 三种写法：
     A. 自动同步的文件（推荐）—— 上游更新会自动覆盖，链接永不变
        REL + 'ehviewer.apk'
     B. 手动传的固定文件
        REL + 'JMComic2_1.8.2.apk'
     C. 站外直链
        'https://example.com/x.apk'
   ========================================== */
var REL = 'https://github.com/qingqian-qing/qing-dl/releases/download/apk-v1/';

window.APPS = [
  { name: 'EhViewer',     tag: '自动更新', icon: 'https://i.stardots.io/xyqingzx/StarDots-2026070411545733726.png', url: REL + 'ehviewer.apk' },
  { name: 'Han1meViewer', tag: '自动更新', icon: 'https://i.stardots.io/xyqingzx/StarDots-2026070420524206788.png', url: REL + 'han1meviewer.apk' },
  { name: 'JMComic2',     tag: 'APK',      icon: 'https://i.stardots.io/xyqingzx/StarDots-2026070411550635713.png', url: REL + 'JMComic2_1.8.2.apk' },
  { name: '哔咔',         tag: 'APK',      icon: 'https://i.stardots.io/xyqingzx/StarDots-2026070517205126854.png', url: REL + 'PicACG_2.2.1.3.3.4.apk' },
  { name: 'AcFan',        tag: 'APK',      icon: 'assets/acfan.png', url: '' }
];

window.LINKS = {
  github: 'https://github.com/qingqian-qing',
  bilibili: 'https://b23.tv/PspvUuj'
};
