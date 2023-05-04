const fs = require('node:fs/promises');
const path = require('node:path');

const fileTypeToRead = '.css';
const temblateHtmlPath = path.join(__dirname, 'template.html');
const componentsDirName = path.join(__dirname, 'components');
const stylesSrcDirPath = path.join(__dirname, 'styles');
const assetsSrcPath = path.join(__dirname, 'assets');
const assetsDestDirName = 'assets';
const destPath = path.join(__dirname, 'project-dist');

let outHtml = '';
let style = [];

fs.readFile(temblateHtmlPath, 'utf-8')
  .then(data => {
    outHtml += data;
    makeDir(destPath);
    makeDir(path.join(destPath, assetsDestDirName));
    fs.readdir(componentsDirName, { withFileTypes: true })
      .then(files => {
        files.forEach(file => {
          const filePath = path.join(componentsDirName, file.name);
          const fileExtName = path.extname(path.join(componentsDirName, file.name));
          const clearedFileName = file.name.replace(fileExtName, '');

          if (outHtml.includes(clearedFileName)) {
            fs.readFile(filePath, 'utf-8')
              .then(data => {
                outHtml = outHtml.replace(`{{${clearedFileName}}}`, data);
                const indexdestPath = path.join(destPath, 'index.html');
                fs.writeFile(indexdestPath, outHtml);
              })
          } else {
            console.log('есть не совпадение имен файлов компонентов с шаблонными');
          }
        })
      })
      .catch(err => { console.log(err) })
      .finally(() => {
        copyDir(assetsSrcPath, path.join(destPath, assetsDestDirName));
        buildStyles(stylesSrcDirPath);
      })
  })

function makeDir(dirPath) {
  fs.mkdir(dirPath, { recursive: true }, (err) => {
    if (err) {
      console.log('Что-то пошло не так(');
    }
  })
}

function copyDir(src, dest) {
  fs.readdir(src, { withFileTypes: true })
    .then(files => {
      files.forEach(file => {
        const fileAbsPath = path.join(src, file.name);
        const fileDestPath = path.join(dest, file.name);
        if (file.isDirectory()) {
          makeDir(fileDestPath);
          copyDir(fileAbsPath, fileDestPath)
        } else {
          fs.copyFile(fileAbsPath, fileDestPath)
        }
      })
    })
}

function buildStyles(srcDir){
  fs.readdir(srcDir)
  .then((files) => {
    files.forEach(file => {
      const elAbsPath = path.join(srcDir, file);
      const extName = path.extname(elAbsPath);
      if (extName === fileTypeToRead) {
        fs.readFile(path.join(srcDir, file), 'utf-8')
          .then(data => {
            style.push(data);
          })
          .catch(err => { console.log('При чтении файлов стилей, что-то пошло не так(', err); })
          .finally(() => {
            fs.writeFile(path.join(destPath, 'style.css'), style.join(''))
          })
      } else {
        console.log(`Файл ${file} не соответствует типу файла '${fileTypeToRead}' и не был добавлен в '${projectBundleName}'`);
      }
    });
  })
  .catch(err => { console.log('Что-то пошло не так(', err); })
}