const algoliasearch = require('algoliasearch');

const data = require('./_posts/codelabs/index.json');

const client = algoliasearch(process.env.APP_ID, process.env.ADMIN_API_KEY);
const index = client.initIndex('codelabs');

index.clearIndex((err, content) => {
  if (err) {
    console.error('clearIndex :: error', err, content);
  }

  index.addObjects(data, (addObjectsErr, addObjectsContent) => {
    if (addObjectsErr) {
      console.error('addObjects :: error', addObjectsErr, addObjectsContent);
    }

    index.setSettings({
      searchableAttributes: [
        'title',
        'tags',
        'excerpt',
      ],
    }, (setSettingsErr, setSettingsContent) => {
      if (setSettingsErr) {
        console.error('setSettings :: error', setSettingsErr, setSettingsContent);
      }
    });
  });
});
