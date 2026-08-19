const fs = require('fs');

const lightColors = {
  "tertiary-container": "#da3437", "surface": "#ffffff", "on-error": "#ffffff", "error": "#ba1a1a",
  "on-tertiary-fixed-variant": "#930013", "secondary-container": "#6cf8bb", "tertiary-fixed": "#ffdad7",
  "secondary-fixed": "#6ffbbe", "primary-container": "#2170e4", "inverse-on-surface": "#f1f0f0",
  "on-primary-fixed": "#001a42", "on-tertiary-container": "#fffbff", "surface-container-low": "#f4f3f2",
  "background": "#faf9f8", "error-container": "#ffdad6", "on-primary": "#ffffff", "on-tertiary-fixed": "#410004",
  "primary-fixed": "#d8e2ff", "surface-tint": "#005ac2", "surface-container-high": "#e9e8e7",
  "inverse-surface": "#2f3130", "on-surface-variant": "#44474e", "surface-container-lowest": "#ffffff",
  "on-primary-container": "#fefcff", "surface-variant": "#e3e2e1", "outline": "#74777f",
  "on-primary-fixed-variant": "#004395", "inverse-primary": "#adc6ff", "on-error-container": "#93000a",
  "on-secondary-container": "#00714d", "surface-container-highest": "#e3e2e1", "on-surface": "#1a1c1c",
  "primary-fixed-dim": "#adc6ff", "on-tertiary": "#ffffff", "secondary-fixed-dim": "#4edea3",
  "on-background": "#1a1c1c", "surface-bright": "#faf9f8", "on-secondary-fixed-variant": "#005236",
  "secondary": "#006c49", "surface-container": "#f1f0ef", "primary": "#0058be",
  "on-secondary-fixed": "#002113", "outline-variant": "#c2c6d6", "on-secondary": "#ffffff",
  "tertiary": "#b61722", "tertiary-fixed-dim": "#ffb3ad", "surface-dim": "#dadad9"
};

// Hand-picked reasonable MD3 dark mode equivalents for these tokens
const darkColors = {
  "tertiary-container": "#930013", "surface": "#121414", "on-error": "#690005", "error": "#ffb4ab",
  "on-tertiary-fixed-variant": "#ffb3ad", "secondary-container": "#005236", "tertiary-fixed": "#ffdad7",
  "secondary-fixed": "#6cf8bb", "primary-container": "#004395", "inverse-on-surface": "#1a1c1c",
  "on-primary-fixed": "#d8e2ff", "on-tertiary-container": "#ffdad7", "surface-container-low": "#1a1c1c",
  "background": "#121414", "error-container": "#93000a", "on-primary": "#002d6b", "on-tertiary-fixed": "#ffdad7",
  "primary-fixed": "#d8e2ff", "surface-tint": "#adc6ff", "surface-container-high": "#2b2d2d",
  "inverse-surface": "#e3e2e1", "on-surface-variant": "#c2c6d6", "surface-container-lowest": "#0e0f0f",
  "on-primary-container": "#d8e2ff", "surface-variant": "#44474e", "outline": "#8e9099",
  "on-primary-fixed-variant": "#adc6ff", "inverse-primary": "#0058be", "on-error-container": "#ffdad6",
  "on-secondary-container": "#6cf8bb", "surface-container-highest": "#363838", "on-surface": "#e3e2e1",
  "primary-fixed-dim": "#adc6ff", "on-tertiary": "#690005", "secondary-fixed-dim": "#4edea3",
  "on-background": "#e3e2e1", "surface-bright": "#383a3a", "on-secondary-fixed-variant": "#6cf8bb",
  "secondary": "#4edea3", "surface-container": "#1e2020", "primary": "#adc6ff",
  "on-secondary-fixed": "#6cf8bb", "outline-variant": "#44474e", "on-secondary": "#003825",
  "tertiary": "#ffb4ab", "tertiary-fixed-dim": "#ffb3ad", "surface-dim": "#121414"
};

let cssVars = ':root {\n';
for (const [key, val] of Object.entries(lightColors)) {
  cssVars += `  --color-${key}: ${val};\n`;
}
cssVars += '}\n\n.dark {\n';
for (const [key, val] of Object.entries(darkColors)) {
  cssVars += `  --color-${key}: ${val};\n`;
}
cssVars += '}\n';

const stylePath = 'src/style.css';
const styleContent = fs.readFileSync(stylePath, 'utf8');
fs.writeFileSync(stylePath, cssVars + '\n' + styleContent);

const configPath = 'tailwind.config.js';
let configContent = fs.readFileSync(configPath, 'utf8');
let colorsObj = '{\n';
for (const key of Object.keys(lightColors)) {
  colorsObj += `        "${key}": "var(--color-${key})",\n`;
}
colorsObj += '      }';

configContent = configContent.replace(/colors: \{[\s\S]*?\},/, `colors: ${colorsObj},`);
fs.writeFileSync(configPath, configContent);
