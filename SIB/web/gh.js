(() => {
  const scene = document.getElementById('scene');
  const canvas = document.getElementById('sea');
  const ctx = canvas.getContext('2d');
  const halo = document.querySelector('.halo');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(pointer: fine)').matches;

  let width = 0, height = 0, haloX = 0, haloSize = 0;

  function measure() {
    const sea = canvas.parentElement.getBoundingClientRect();
    const box = halo.getBoundingClientRect();
    width = canvas.width = Math.round(sea.width);
    height = canvas.height = Math.round(sea.height);
    haloSize = halo.offsetWidth;
    haloX = box.left + box.width / 2 - sea.left - (parseFloat(getComputedStyle(halo).translate) || 0);
  }

  function drawSea(t) {
    ctx.clearRect(0, 0, width, height);
    for (let y = 2; y < height; y += 3) {
      const d = y / height;
      const fade = Math.pow(1 - d, 1.3);
      const wobble = Math.sin(y * 0.09 + t * 0.0006 + Math.sin(y * 0.02 + t * 0.0003) * 2);
      const flicker = 0.35 + 0.65 * Math.abs(Math.sin(y * 0.31 + t * 0.0004));
      const cx = haloX + wobble * haloSize * 0.06 * (0.3 + d);
      const half = haloSize * (0.12 + d * 0.32) * flicker;

      ctx.fillStyle = `rgba(150, 215, 255, ${0.05 * fade})`;
      ctx.fillRect(cx - half * 2.2, y, half * 4.4, 1);
      ctx.fillStyle = `rgba(170, 225, 255, ${0.26 * fade * (0.4 + 0.6 * Math.abs(wobble))})`;
      ctx.fillRect(cx - half, y, half * 2, 1.2);

      const swell = Math.sin(y * 0.17 - t * 0.0005) * 0.5 + 0.5;
      ctx.fillStyle = `rgba(110, 170, 235, ${0.035 * swell * (1 - d * 0.6)})`;
      ctx.fillRect(0, y, width, 1);
    }
  }

  let last = 0;
  function loop(t) {
    if (t - last > 33) { drawSea(t); last = t; }
    requestAnimationFrame(loop);
  }

  measure();
  drawSea(0);
  if (!reduceMotion) requestAnimationFrame(loop);

  let resizeTimer;
  addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { measure(); drawSea(0); }, 120);
  });

  if (!reduceMotion && finePointer) {
    let tx = 0, ty = 0, cx = 0, cy = 0;
    addEventListener('pointermove', (e) => {
      tx = e.clientX / innerWidth - 0.5;
      ty = e.clientY / innerHeight - 0.5;
    });
    (function ease() {
      cx += (tx - cx) * 0.04;
      cy += (ty - cy) * 0.04;
      scene.style.setProperty('--px', cx.toFixed(3));
      scene.style.setProperty('--py', cy.toFixed(3));
      requestAnimationFrame(ease);
    })();
  }

  const ready = () => requestAnimationFrame(() => document.body.classList.remove('is-loading'));
  if (halo.querySelector('img').complete) ready();
  else halo.querySelector('img').addEventListener('load', ready);
})();
