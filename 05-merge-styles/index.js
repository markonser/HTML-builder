const fs = require('node:fs/promises');
const path = require('node:path');

const fileTypeToRead = '.css';
const stylesInitialDirName = 'styles';
const projectStylesDistDirName = 'project-dist';
const projectBundleName = 'bundle.css';
const srcDir = path.join(__dirname, stylesInitialDirName);
const tergetDirPath = path.join(__dirname, projectStylesDistDirName);
let bundle = [];

fs.readdir(srcDir)
  .then((files) => {
    files.forEach(file => {
      const elPath = path.join(srcDir, file);
      const extName = path.extname(elPath);
      if (extName === fileTypeToRead) {
        console.log('добавление стилей из:', file);
        fs.readFile(path.join(srcDir, file), 'utf-8')
          .then(data => {
            bundle.push(data);
          })
          .catch(err => { console.log('При чтении файлов, что-то пошло не так(', err); })
          .finally(() => {
            fs.writeFile(path.join(tergetDirPath, projectBundleName), bundle.join(''))
          })
      } else {
        console.log(`Файл ${file} не соответствует типу файла '${fileTypeToRead}' и не был добавлен в '${projectBundleName}'`);
      }
    });
  })
  .catch(err => { console.log('Что-то пошло не так(', err); })
  .finally(() => { console.log(`\nВсё содержимое из файлов '${fileTypeToRead}' добавлено в ${projectBundleName}`) });