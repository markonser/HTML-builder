const fs = require('node:fs/promises')
const path = require('node:path');

const fullPath = path.join(__dirname, 'secret-folder')

fs.readdir(fullPath, {
  withFileTypes: true,
  encoding: 'utf-8',
}).then((content => {
  content.forEach(el => {
    if (el.isFile()) {
      const elPath = path.join(fullPath, el.name);
      const extName = path.extname(elPath);
      const cleanedName = path.basename(elPath).replace(extName, '');
      fs
        .stat(elPath)
        .then(stat => {
          console.log(`file name : ${cleanedName},  extension : ${extName},   size: ${stat.size} bytes`);
        })
    }
  })
}))
