module.exports = string =>
  string
    .split(' ')
    .map(item => item.replace(/[^a-z]/gi, ''))
    .map(item => item.toLowerCase())
    .join('-')
