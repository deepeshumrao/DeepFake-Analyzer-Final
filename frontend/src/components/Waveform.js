export function generateWaveform(type) {
  const canvas = document.getElementById('waveform-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  ctx.beginPath();
  ctx.moveTo(0, h / 2);
  const bars = type === 'audio' ? 80 : 40;
  for (let i = 0; i < bars; i++) {
    const x = (i / bars) * w;
    const y = h / 2 + (Math.random() - 0.5) * h * 0.8;
    ctx.lineTo(x, y);
  }
  ctx.strokeStyle = 'var(--color-primary)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

export function generateFreqBars() {
  const c = document.getElementById('freq-bars');
  if (!c) return;
  c.innerHTML = '';
  for (let i = 0; i < 38; i++) {
    const b = document.createElement('div');
    const h = Math.random() * 60 + 20;
    b.style.cssText = `width:6px;border-radius:3px 3px 0 0;background:rgba(0,88,190,${.2 + Math.random() * .5});height:${h}px;transition:height .35s ease;`;
    c.appendChild(b);
  }
}

export function animateFreqBars() {
  const c = document.getElementById('freq-bars');
  if (!c) return;
  Array.from(c.children).forEach(b => {
    if (Math.random() > 0.4) {
      const h = Math.random() * 60 + 20;
      b.style.height = h + 'px';
      b.style.background = `rgba(0,88,190,${.2 + Math.random() * .5})`;
    }
  });
}
