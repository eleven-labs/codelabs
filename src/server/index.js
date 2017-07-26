import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import serveStatic from 'serve-static';
import lodashExpress from 'lodash-express';
import path from 'path';

import routes from './routes';
import api from './api';
import handler404 from './middlewares/404';
import handler500 from './middlewares/500';

const publicPath = path.join(__dirname, '..', '..', 'public');
const port = 9001;
const app = express();

lodashExpress(app, 'html');

app.set('views', publicPath);
app.set('view engine', 'html');
app.use(morgan('combined', { colors: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/static', serveStatic(publicPath));
app.use('/', routes);
app.use(api);

// error handlers
app.use(handler404);
app.use(handler500(app.get('env')));

app.listen(port, error => {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});
