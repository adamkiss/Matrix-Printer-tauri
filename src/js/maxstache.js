// Minimalist mustache template replacement
// (str, obj) -> null
// if the index is even, the "token" is around {{}} and should be left alone
// if it's odd, it's inside the brackets and should be replaced
// Adopted from
// https://github.com/yoshuawuyts/maxstache/blob/master/index.js

export default function maxstache (str, ctx = {}) {
  const tokens = str.split(/\{\{|\}\}/)
  const res = tokens.map((token, i) => i % 2 === 0 ? token : ctx[token])
  return res.join('')
}