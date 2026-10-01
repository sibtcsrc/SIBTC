(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const small = matchMedia('(max-width:760px)').matches;

  /* ---- Parallax (a few pixels only) ---- */
  const px = document.getElementById('parallax');
  const cursor = document.querySelector('.cursor');
  let tx = 0, ty = 0, cx = -100, cy = -100, rx = -100, ry = -100;
  if (fine && !reduce) {
    addEventListener('mousemove', e => {
      tx = (e.clientX / innerWidth - .5) * 2;
      ty = (e.clientY / innerHeight - .5) * 2;
      cx = e.clientX; cy = e.clientY;
    }, { passive: true });
  }
  if (fine) {
    document.querySelectorAll('a,[data-hover]').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
    });
  }

  /* ---- Embers & dust (canvas, very few) ---- */
  const cv = document.getElementById('embers');
  const ctx = cv.getContext('2d');
  let W, H, dpr, parts = [], running = !reduce;
  const COUNT = small ? 10 : 26;

  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = cv.width = innerWidth * dpr;
    H = cv.height = innerHeight * dpr;
  }
  function spawn(p, initial) {
    const ember = Math.random() < .35;
    p.ember = ember;
    p.x = Math.random() * W;
    p.y = initial ? Math.random() * H : H + 10;
    p.r = (ember ? .9 + Math.random() * 1.2 : .5 + Math.random() * .9) * dpr;
    p.vy = -(ember ? .25 + Math.random() * .5 : .05 + Math.random() * .15) * dpr;
    p.vx = (Math.random() - .5) * .25 * dpr;
    p.life = 0;
    p.max = 400 + Math.random() * 500;
    p.hue = Math.random() < .2 ? '212,85,31' : '236,211,145';
    return p;
  }
  function frame() {
    if (!running) return;
    // parallax + cursor easing
    if (px) px.style.transform = `translate3d(${(tx * 7).toFixed(2)}px,${(ty * 5).toFixed(2)}px,0)`;
    if (fine && cursor) {
      rx += (cx - rx) * .22; ry += (cy - ry) * .22;
      cursor.style.transform = `translate3d(${rx}px,${ry}px,0)`;
    }
    ctx.clearRect(0, 0, W, H);
    for (const p of parts) {
      p.x += p.vx + Math.sin((p.life + p.y) * .004) * .15 * dpr;
      p.y += p.vy; p.life++;
      if (p.life > p.max || p.y < -10) spawn(p, false);
      const t = p.life / p.max;
      const a = Math.sin(Math.PI * t) * (p.ember ? .8 : .22);
      ctx.beginPath();
      ctx.fillStyle = `rgba(${p.ember ? p.hue : '200,195,180'},${a})`;
      ctx.arc(p.x, p.y, p.r, 0, 6.283);
      ctx.fill();
    }
    requestAnimationFrame(frame);
  }
  if (!reduce) {
    resize();
    for (let i = 0; i < COUNT; i++) parts.push(spawn({}, true));
    addEventListener('resize', resize);
    document.addEventListener('visibilitychange', () => {
      running = !document.hidden;
      if (running) requestAnimationFrame(frame);
    });
    requestAnimationFrame(frame);
  }
})();
