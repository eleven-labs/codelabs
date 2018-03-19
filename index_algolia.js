const algoliasearch = require('algoliasearch');

const client = algoliasearch(process.env.APP_ID, process.env.ADMIN_API_KEY);
const index = client.initIndex('codelabs');

const data = require('./_posts/codelabs/index.json');

index.addObjects(data, (err, content) => {
  if (err) {
    console.error(content);
  }
});

index.setSettings({
  searchableAttributes: [
    'title',
    'tags',
  ],
}, (err, content) => {
  if (err) {
    console.log(content);
  }
});
