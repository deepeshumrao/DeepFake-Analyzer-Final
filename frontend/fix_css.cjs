const fs = require('fs');

let css = fs.readFileSync('src/style.css', 'utf8');

css = css.replace(/background-image: radial-gradient\(#c2c6d6 1px, transparent 1px\);/g, 'background-image: radial-gradient(var(--color-outline-variant) 1px, transparent 1px);');
css = css.replace(/background: #fff;/g, 'background: var(--color-surface);');
css = css.replace(/color: #44474e;/g, 'color: var(--color-on-surface-variant);');
css = css.replace(/color: #1a1c1c;/g, 'color: var(--color-on-surface);');
css = css.replace(/color: #0058be;/g, 'color: var(--color-primary);');
css = css.replace(/border-color: #0058be;/g, 'border-color: var(--color-primary);');
css = css.replace(/border-color: #006c49;/g, 'border-color: var(--color-secondary);');
css = css.replace(/color: #006c49;/g, 'color: var(--color-secondary);');
css = css.replace(/color: #ba1a1a;/g, 'color: var(--color-error);');
css = css.replace(/color: #74777f;/g, 'color: var(--color-outline);');

// Fix glass-card
css = css.replace(
  /background: rgba\(255, 255, 255, .65\);\s*backdrop-filter: blur\(20px\);\s*border: 1px solid rgba\(255, 255, 255, .5\);/g,
  'background: color-mix(in srgb, var(--color-surface) 65%, transparent);\n  backdrop-filter: blur(20px);\n  border: 1px solid color-mix(in srgb, var(--color-outline-variant) 30%, transparent);'
);

fs.writeFileSync('src/style.css', css);
