const fs = require('fs');
const path = require("path");

var p = "_posts/codelabs/"
var indexJson = [];

function readDir(p) {
  fs.readdir(p, function (err, files) {
      if (err) {
        console.log(err);
        throw err;
      }

      files.map(function (file) {
           if (fs.statSync(path.join(p, file)).isDirectory()) {
            readDir(path.join(p, file));
          }

          return path.join(p, file);
      }).filter(function (file) {
          return fs.statSync(file).isFile();
      }).forEach(function (file) {
          if (path.extname(file) === '.json' && file !== '_posts/codelabs/index.json') {
            var obj = JSON.parse(fs.readFileSync(file, 'utf8'));
            indexJson.push(obj);

            var json = JSON.stringify(indexJson);
            fs.writeFileSync('_posts/codelabs/index.json', json, 'utf8');
          }
      });
  });
}

readDir(p);
