export function animateGauge(score, color) {
  const g = document.getElementById('gauge-needle');
  const d = document.getElementById('gauge-score-display');
  if (!g) return;
  // Score to degrees (50% = 0deg, 0% = -90deg, 100% = 90deg)
  const deg = (score / 100) * 180 - 90;
  g.style.transform = `rotate(${deg}deg)`;
  
  let cur = 0;
  const int = setInterval(() => {
    if (cur >= score) {
      clearInterval(int);
      if (d) d.innerHTML = `${score}<span style="font-size:22px;color:var(--color-outline);">%</span>`;
    } else {
      cur += 2;
      if (d) d.innerHTML = `${cur}<span style="font-size:22px;color:var(--color-outline);">%</span>`;
    }
  }, 30);
  
  drawDataNodes(color);
}

export function drawDataNodes(color) {
  const svg = document.getElementById('data-nodes');
  if (!svg) return;
  svg.innerHTML = '';
  const W = 280, H = 140;
  const num = 14, bw = W / num;
  for (let i = 0; i < num; i++) {
    const bh = Math.random() * 80 + 20;
    const x = i * bw + bw * .12, y = (H - bh) / 2;
    const r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    r.setAttribute('x', x); r.setAttribute('y', y);
    r.setAttribute('width', bw * .65); r.setAttribute('height', bh);
    r.setAttribute('rx', '1.5'); r.setAttribute('fill', color);
    r.setAttribute('opacity', (.2 + Math.random() * .45).toFixed(2));
    svg.appendChild(r);
  }
}
