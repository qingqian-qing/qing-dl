/* ==========================================
   下载列表 —— 以后加东西只改这个文件
   url 支持两种：
     1. GitHub Release 完整链接（推荐，见下）
     2. 本地相对路径，如 'files/xxx.apk'
   ========================================== */
var REL = 'https://github.com/qingqian-qing/qing-dl/releases/download/apk-v1/';

window.APPS = [
  { name: 'JMComic2',    tag: 'APK', icon: 'https://i.stardots.io/xyqingzx/StarDots-2026070411550635713.png', url: REL + 'JMComic2_1.8.2.apk' },
  { name: 'EhViewer',    tag: 'APK', icon: 'https://i.stardots.io/xyqingzx/StarDots-2026070411545733726.png', url: REL + 'EhViewer_2.0.1.5.apk' },
  { name: 'Han1meViewer',tag: 'APK', icon: 'https://i.stardots.io/xyqingzx/StarDots-2026070420524206788.png', url: REL + 'Han1meViewer_0.25.0-release%2B26051916.apk' },
  { name: '哔咔',        tag: 'APK', icon: 'https://i.stardots.io/xyqingzx/StarDots-2026070517205126854.png', url: REL + 'PicACG_2.2.1.3.3.4.apk' }
];

/* 作者链接 */
window.LINKS = {
  github: 'https://github.com/qingqian-qing',
  bilibili: 'https://b23.tv/PspvUuj'
};
