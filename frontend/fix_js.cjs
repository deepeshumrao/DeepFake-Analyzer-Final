const fs = require('fs');

const files = [
  'src/components/FileUpload.js',
  'src/components/Gauge.js',
  'src/components/History.js',
  'src/components/Profile.js',
  'src/components/Waveform.js'
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  // Terminal gradient
  content = content.replace(/background:linear-gradient\(to top,#dadad9,transparent\)/g, 'background:linear-gradient(to top,var(--color-surface-dim),transparent)');

  content = content.replace(/#4edea3/g, 'var(--color-secondary-fixed-dim)'); // or secondary
  content = content.replace(/#0058be/g, 'var(--color-primary)');
  content = content.replace(/#da3437/g, 'var(--color-tertiary-container)');
  content = content.replace(/#ba1a1a/g, 'var(--color-error)');
  content = content.replace(/#006c49/g, 'var(--color-secondary)');
  content = content.replace(/#b17e00/g, 'var(--color-primary-fixed-dim)'); // mapping yellow
  content = content.replace(/#74777f/g, 'var(--color-outline)');
  content = content.replace(/#44474e/g, 'var(--color-on-surface-variant)');
  content = content.replace(/#e3e2e1/g, 'var(--color-surface-variant)');
  
  // Specific complex inline styles
  content = content.replace(/background:rgba\(0,88,190,\.08\);color:var\(--color-primary\);border:1px solid rgba\(0,88,190,\.18\)/g, 'background:color-mix(in srgb, var(--color-primary) 8%, transparent);color:var(--color-primary);border:1px solid color-mix(in srgb, var(--color-primary) 18%, transparent)');

  fs.writeFileSync(file, content);
}
