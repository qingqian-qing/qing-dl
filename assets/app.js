(function(){
  var orb   = document.getElementById('orb');
  var panel = document.getElementById('panel');
  var q     = document.getElementById('q');
  var grid  = document.getElementById('grid');
  var empty = document.getElementById('empty');

  /* ---- 作者链接 ---- */
  document.getElementById('lnkGithub').href = (window.LINKS && window.LINKS.github) || '#';
  document.getElementById('lnkBili').href   = (window.LINKS && window.LINKS.bilibili) || '#';

  /* ---- 标题图：点一下播一次（再点从头重播） ---- */
  var logo = document.getElementById('logo');
  var snd  = new Audio('assets/audio.mp3');
  snd.preload = 'auto';
  snd.volume  = 0.7;
  window.CLICK_SOUND = snd;
  if (logo) {
    logo.addEventListener('click', function(){
      try {
        snd.currentTime = 0;
        var pr = snd.play();
        if (pr && pr.catch) pr.catch(function(){});
      } catch (err) {}
      logo.classList.remove('ring');
      void logo.offsetWidth;
      logo.classList.add('ring');
      setTimeout(function(){ logo.classList.remove('ring'); }, 520);
    });
  }

  /* ---- 主页面卡片：均匀铺开 ---- */
  function fill(kw){
    var all = window.APPS || [];
    var k = (kw || '').trim().toLowerCase();
    var hit = k ? all.filter(function(a){
      return a.name.toLowerCase().indexOf(k) > -1 ||
             (a.tag || '').toLowerCase().indexOf(k) > -1;
    }) : all;
    grid.innerHTML = '';
    hit.forEach(function(a){
      var el = document.createElement('a');
      el.className = 'cell';
      el.href = a.url;
      el.setAttribute('download', '');
      var img = document.createElement('img');
      img.className = 'ico'; img.src = a.icon || ''; img.alt = ''; img.loading = 'lazy';
      var meta = document.createElement('span'); meta.className = 'meta';
      var nm = document.createElement('span'); nm.className = 'nm'; nm.textContent = a.name;
      var tg = document.createElement('span'); tg.className = 'tg'; tg.textContent = a.tag || '';
      meta.appendChild(nm); meta.appendChild(tg);
      el.appendChild(img); el.appendChild(meta);
      grid.appendChild(el);
    });
    empty.hidden = !(k && !hit.length);
  }
  fill('');
  q.addEventListener('input', function(){ fill(q.value); });

  /* ---- 左下圆钮：开 / 关卡片 ---- */
  var open = false;
  function setOpen(v){
    open = v;
    panel.classList.toggle('on', v);
    orb.classList.toggle('on', v);
    orb.setAttribute('aria-expanded', v ? 'true' : 'false');
    if (v) setTimeout(function(){ q.focus(); }, 120);
  }
  orb.addEventListener('click', function(e){ e.stopPropagation(); setOpen(!open); });
  panel.addEventListener('click', function(e){ e.stopPropagation(); });
  document.addEventListener('click', function(){ if (open) setOpen(false); });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && open) setOpen(false);
  });
  setOpen(false);
})();
