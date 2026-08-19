const fs = require('fs');

const files = [
  'index.html',
  'src/templates/uploadTemplate.js',
  'src/templates/layoutTemplate.js'
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/Deepfake AI/g, 'DeepShield AI');
  fs.writeFileSync(file, content);
}
