const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', port: PORT, cwd: __dirname, files: fs.readdirSync(__dirname).slice(0,20) });
});

app.get('*', (req, res) => {
  const htmlPath = path.join(__dirname, 'public', 'index.html');
  if (fs.existsSync(htmlPath)) {
    res.sendFile(htmlPath);
  } else {
    res.status(404).send('Not Found: ' + htmlPath);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
