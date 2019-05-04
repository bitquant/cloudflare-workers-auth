# cloudflare-workers-auth
API key authentication for Cloudflare Workers

## Install
```
$ npm install cloudflare-workers-auth cloudflare-workers
```


## Usage
```javascript
const worker = require('cloudflare-workers');
const auth = require('cloudflare-workers-auth');

auth.init({
    apiKeyHeader: 'x-apikey',
    apiKeys: [ 'key123', 'keyabc', 'keyxyz' ]
})

worker.get('/', (request) => new Response('welcome\n'));
worker.use('/protected*', auth.apiKey);
worker.get('/protected', (request) => new Response('path protected by apikey\n'));
worker.get('/protected/account', (request) => new Response('account info: apikey protected\n'));
worker.get('/protected/address', (request) => new Response('address details: apikey protected\n'));
worker.get('/public', (request) => new Response('public path: not apikey protected\n'));

addEventListener('fetch', function(event) {
    event.respondWith(worker.handleRequest(event));
});
```
See ['Using NPM modules'](https://developers.cloudflare.com/workers/writing-workers/using-npm-modules/) to `require` the package in your worker.

## Design
This package is designed as middleware for  the ['cloudflare-workers'](https://www.npmjs.com/package/cloudflare-workers) routing package.

## License
MIT license; see [LICENSE](./LICENSE).
