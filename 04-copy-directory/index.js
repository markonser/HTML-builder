const fs = require('node:fs/promises');
const path = require('node:path');

const initialDirPath = path.join(__dirname, 'files');
const tergetDirPath = path.join(__dirname, 'file-copy');

function makeCopyDir() {
  fs.mkdir(tergetDirPath, { recursive: true }, (err) => {
    if (err) {
      console.log('Что-то пошло не так(');
    }
    console.log(`Каталог files-copy успешно создан`);
  })
}

fs.readdir(initialDirPath)
  .then((files) => {
    makeCopyDir();
    files.forEach(file => {
      console.log('скопирование:',file);
      fs.copyFile(path.join(__dirname, 'files',file), path.join(__dirname, 'file-copy', file))
    })
  })
  .catch(err=>{console.log('Что-то пошло не так(', err);})
  .finally(() => { console.log(`Всё скопировано в ${tergetDirPath}`) });