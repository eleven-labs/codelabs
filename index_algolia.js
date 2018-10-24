const algoliasearch = require('algoliasearch');

const data = require('./_posts/codelabs/index.json');

const LOCAL_STORAGE_KEY = process.env.NODE_ENV === 'production' ? 'codelabs' : 'codelabs';
const ADMIN_API_KEY = process.env.ADMIN_API_KEY ? process.env.ADMIN_API_KEY : 'cc67393ad4b8ba16bd920591d1bd0cda';
const APP_ID = process.env.APP_ID ? process.env.APP_ID : '5IGTHBX5JS';

const client = algoliasearch(APP_ID, ADMIN_API_KEY);
const index = client.initIndex(LOCAL_STORAGE_KEY);

index.clearIndex((err, content) => {
  if (err) {
    console.error(content);
  }

  index.addObjects(data, (addObjectsErr, addObjectsContent) => {
    if (addObjectsErr) {
      console.error(addObjectsContent);
    }

    index.setSettings({
      searchableAttributes: [
        'title',
        'tags',
        'excerpt',
      ],
    }, (setSettingsErr, setSettingsContent) => {
      if (setSettingsErr) {
        console.error(setSettingsContent);
      }
    });
  });
});
