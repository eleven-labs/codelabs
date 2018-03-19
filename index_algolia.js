const algoliasearch = require('algoliasearch');

const data = require('./_posts/codelabs/index.json');

const client = algoliasearch(process.env.APP_ID, process.env.ADMIN_API_KEY);

const index = client.initIndex('codelabs');

index.clearIndex((err, content) => {
  if (err) {
    console.error(content);
  }
});

index.addObjects(data, (err, content) => {
  if (err) {
    console.error(content);
  }
});

index.setSettings({
  searchableAttributes: [
    'title',
    'tags',
    'excerpt',
  ],
}, (err, content) => {
  if (err) {
    console.error(content);
  }
});
