const fs = require('fs');
const path = require('path');

const codelabsPath = '_posts/codelabs/';
const indexJson = [];

const calculateDuration = wordCount => (wordCount < 100 ? 1 : Math.ceil(wordCount / 50));

const getDuration = course => {
  const coursePath = `${codelabsPath}/${course.date}-${course.slug}`;

  return [...Array(course.stepTitles.length)]
    .map((_, index) => `${coursePath}/${index === 0 ? 'index' : `step${index}`}.md`)
    .map(stepPath => fs.readFileSync(stepPath, 'utf8'))
    .reduce((acc, md, index) => {
      const words = md
        .replace(/\n/g, ' ')
        .split(' ')
        .filter(word => Boolean(word) && /\w|\d|\b/g.test(word));

      const stepDuration = calculateDuration(words.length);

      return {
        ...acc,
        [index + 1]: stepDuration,
        total: acc.total + stepDuration,
      };
    }, {
        total: 0,
      });
};

function readDir(dirPath) {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.log(err);
      throw err;
    }

    files
      .map((file) => {
        if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
          readDir(path.join(dirPath, file));
        }

        return path.join(dirPath, file);
      })
      .filter((file) => fs.statSync(file).isFile())
      .forEach((file) => {
        if (path.extname(file) === '.json' && file !== '_posts/codelabs/index.json') {
          const obj = JSON.parse(fs.readFileSync(file, 'utf8'));

          obj.duration = getDuration(obj);

          indexJson.push(obj);
          const json = JSON.stringify(indexJson);
          fs.writeFileSync(`${codelabsPath}/index.json`, json, 'utf8');
        }
      });
  });
}

readDir(codelabsPath);
