const fs = require('node:fs');
const path = require('node:path');
const process = require('node:process');
const readline = require('readline');

const fullPath = path.join(__dirname, 'out.txt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function writeText(text) {
  const writeStream = fs.createWriteStream(fullPath, 'utf-8');
  if (text.indexOf('exit') >= 0) {
    rl.close();
  }
  writeStream.write(text + '\n', () => {
    console.log('Строка обновлена, введите еще:');
    writeStream.end();
  })
}

rl.on('line', (input) => { writeText(input) });

rl.on('close', function () {
  console.log(`\n Конец) Введённые данные записаны в ${fullPath}`);
  process.exit(0);
});

rl.on('SIGINT', function () {
  rl.output.write(`\nКонец)  Введённые данные записаны в ${fullPath}`);
  process.exit(2);
});

rl.output.write('Введите текст:');
