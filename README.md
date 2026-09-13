# 青と浅 · 下载站

极简静态下载站。零构建、零依赖，纯 HTML/CSS/JS。

## 目录

```text
index.html            页面结构
assets/style.css      样式（配色/圆角/倾斜都在顶部 :root 里改）
assets/app.js         交互逻辑
assets/logo.png       标题图
assets/audio.mp3      点击音效
data/apps.js          下载列表（加东西只改这里）
```

## 加一个下载项

编辑 `data/apps.js`，往数组里加一行：

```js
{ name: '名字', tag: 'APK', icon: '图标链接', url: '下载链接' }
```

## 部署

Cloudflare Pages 连接本仓库，构建命令留空，输出目录填 `/`。
下载文件走 GitHub Releases，不经过 Cloudflare 代理。
