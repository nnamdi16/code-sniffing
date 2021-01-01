// /**
//  * 
//  * @param {string} name Cookie name
//  */
// const getCookie = (name,req) => {
//      const rawCookies = req.headers.cookie.split(';');
//      console.log(rawCookies);
//     if (!req.headers.cookie) {
//         return null;
//     }

//     const xsrfCookies = req.headers.cookie.split(';')
//                         .map(c => c.trim())
//                         .filter(c => c.startsWith(name + '='));
//     if (xsrfCookies.length === 0) {
//         return null;
//     }
//     return decodeURIComponent(xsrfCookies[0].split('=')[1]);

// }

// module.exports = getCookie;

const Tokens = require('csrf');
const tokens = new Tokens({saltLength:20, secretLength:50});
console.log(tokens);
const secret = tokens.secretSync();
console.log(secret);
console.log(tokens.create(secret));
// const secret = csrf.secretSync()
// const token = csrf.create(secret);

// console.log(token);