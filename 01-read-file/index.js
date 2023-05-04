const fs = require('node:fs');
const path = require('node:path');

const readStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');

readStream.on('data', (chunk) => {
  let data = [];
  data.push(chunk)
  console.log(data.join(' '));
})