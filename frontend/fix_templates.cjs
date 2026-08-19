const fs = require('fs');

const files = [
  'src/templates/layoutTemplate.js',
  'src/templates/resultsTemplate.js',
  'src/templates/profileTemplate.js'
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  // Linear gradients
  content = content.replace(/#0058be/g, 'var(--color-primary)');
  content = content.replace(/#8b5cf6/g, 'var(--color-tertiary)'); // mapping #8b5cf6 to tertiary
  
  // Fills and strokes
  content = content.replace(/fill="#1a1c1c"/g, 'fill="var(--color-on-surface)"');
  content = content.replace(/fill="#ffffff"/g, 'fill="var(--color-surface)"');
  content = content.replace(/stroke="#e3e2e1"/g, 'stroke="var(--color-surface-variant)"');
  
  // Specific colors
  content = content.replace(/#ba1a1a/g, 'var(--color-error)');
  content = content.replace(/#006c49/g, 'var(--color-secondary)');
  content = content.replace(/#ffd573/g, 'var(--color-primary-fixed-dim)'); // mapping yellow
  content = content.replace(/#74777f/g, 'var(--color-outline)');

  fs.writeFileSync(file, content);
}
