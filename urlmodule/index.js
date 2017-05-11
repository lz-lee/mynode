var url = require('url')
// console.log(url.parse('https://www.google.co.jp/search?q=macrotask+microtask&oq=macrotask&aqs=chrome.1.69i57j0l5.6871j0j1&sourceid=chrome&ie=UTF-8', true, false))
console.log(url.format({
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'www.google.co.jp',
  port: null,
  hostname: 'www.google.co.jp',
  hash: null,
  search: '?q=macrotask+microtask&oq=macrotask&aqs=chrome.1.69i57j0l5.6871j0j1&sourceid=chrome&ie=UTF-8',
  query: 
   { q: 'macrotask microtask',
     oq: 'macrotask',
     aqs: 'chrome.1.69i57j0l5.6871j0j1',
     sourceid: 'chrome',
     ie: 'UTF-8' },
  pathname: '/search',
  path: '/search?q=macrotask+microtask&oq=macrotask&aqs=chrome.1.69i57j0l5.6871j0j1&sourceid=chrome&ie=UTF-8',
  href: 'https://www.google.co.jp/search?q=macrotask+microtask&oq=macrotask&aqs=chrome.1.69i57j0l5.6871j0j1&sourceid=chrome&ie=UTF-8' }))
