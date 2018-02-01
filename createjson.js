const fs = require('fs');
const path = require('path');

const codelabsPath = '_posts/codelabs/';
const indexJson = [];

function readDir(lolPath) {
  fs.readdir(lolPath, (err, files) => {
    if (err) {
      console.log(err);
      throw err;
    }

    files
      .map((file) => {
        if (fs.statSync(path.join(lolPath, file)).isDirectory()) {
          readDir(path.join(lolPath, file));
        }

        return path.join(lolPath, file);
      })
      .filter((file) => fs.statSync(file).isFile())
      .forEach((file) => {
        if (path.extname(file) === '.json' && file !== '_posts/codelabs/index.json') {
          const obj = JSON.parse(fs.readFileSync(file, 'utf8'));
          indexJson.push(obj);

          const json = JSON.stringify(indexJson);
          fs.writeFileSync('_posts/codelabs/index.json', json, 'utf8');
        }
      });
  });
}

readDir(codelabsPath);
