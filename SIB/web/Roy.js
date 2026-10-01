(() => {
  const dustLayer = document.getElementById('dust');
  const scene = document.getElementById('scene');
  const amount = window.matchMedia('(max-width: 700px)').matches ? 18 : 34;

  for (let i = 0; i < amount; i += 1) {
    const speck = document.createElement('i');
    speck.className = 'dust';
    speck.style.left = `${Math.random() * 100}%`;
    speck.style.top = `${20 + Math.random() * 90}%`;
    speck.style.setProperty('--duration', `${11 + Math.random() * 16}s`);
    speck.style.setProperty('--delay', `${-Math.random() * 22}s`);
    speck.style.setProperty('--drift', `${-25 + Math.random() * 50}px`);
    speck.style.setProperty('--opacity', `${0.08 + Math.random() * 0.28}`);
    dustLayer.appendChild(speck);
  }

  if (window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    scene.addEventListener('pointermove', (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      scene.style.setProperty('--mx', x.toFixed(3));
      scene.style.setProperty('--my', y.toFixed(3));
      document.querySelector('.brand-mark').style.transform = `translate3d(${x * -7}px, ${y * -5}px, 0) rotate(-1.8deg)`;
      document.querySelector('.evidence-board').style.marginLeft = `${x * 4}px`;
      document.querySelector('.evidence-board').style.marginTop = `${y * 3}px`;
    });
  }
})();
