// Action key that carries API call info interpreted by our api middleware.
export const CALL_API = Symbol('Call API');
export const CALL_ALGOLIA_API = Symbol('Call Algolia API');

export { search } from './Algolia';
export { default as Request } from './Request';
