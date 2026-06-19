const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Try multiple possible dist locations
const possibleDirs = [
  path.join(__dirname, 'dist'),
  path.join(process.cwd(), 'dist'),
];

let distDir = possibleDirs.find(d => fs.existsSync(d));
if (!distDir) {
  console.error('ERROR: dist/ not found at any of:', possibleDirs);
  // Fall back to first option for the error message
  distDir = possibleDirs[0];
} else {
  console.log('Serving from:', distDir);
  console.log('Files in dist:', fs.readdirSync(distDir).join(', '));
}

app.use(express.static(distDir));

app.get('/_debug', (req, res) => {
  res.json({
    cwd: process.cwd(),
    dirname: __dirname,
    distDir,
    exists: fs.existsSync(distDir) ? 'yes' : 'no',
    distContents: fs.existsSync(distDir) ? fs.readdirSync(distDir) : [],
    rootContents: fs.readdirSync(__dirname).filter(f => !f.startsWith('.')),
  });
});

app.get('*', (req, res) => {
  const htmlPath = path.join(distDir, 'index.html');
  if (fs.existsSync(htmlPath)) {
    res.sendFile(htmlPath);
  } else {
    res.status(500).send('dist/index.html not found. Build may have failed. Path: ' + htmlPath);
  }
});

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
