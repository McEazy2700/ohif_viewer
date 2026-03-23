const fs = require('fs');
const path = require('path');
const dirs = [
  path.join(__dirname, 'platform/app/src'),
  path.join(__dirname, 'platform/ui/src'),
  path.join(__dirname, 'platform/ui-next/src'),
];

function replaceInDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return;
  }
  const files = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const file of files) {
    const fullPath = path.join(dirPath, file.name);
    if (file.isDirectory()) {
      replaceInDir(fullPath);
    } else if (file.isFile() && /\.(tsx|ts|js|jsx)$/.test(file.name)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('bg-black')) {
        content = content.replace(/bg-black/g, 'bg-background');
        fs.writeFileSync(fullPath, content);
        console.log('Updated ' + fullPath);
      }
      if (content.includes('class="bg-black"')) {
        content = content.replace(/class="bg-black"/g, 'class="bg-background"');
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

dirs.forEach(replaceInDir);
console.log('Done replacement.');
