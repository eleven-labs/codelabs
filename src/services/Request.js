import util from 'util';
import urlJoin from 'url-join';

import { API_ROOT } from '../constants';

const methods = ['get', 'post', 'put', 'patch', 'delete'];

export default methods.reduce((Request, method) => ({
  ...Request,
  [method]: async (endpoint, fetchOptions) => {
    const response = await fetch(urlJoin(API_ROOT, endpoint), {
      method,
      ...fetchOptions,
    });

    if (!response.ok) {
      throw new Error(`Error occured : ${util.inspect(response, { showHidden: true })}`);
    }

    if (response.headers.get('content-type').match(/application\/json/)) {
      return response.json();
    }

    return response.text();
  },
}), {});
