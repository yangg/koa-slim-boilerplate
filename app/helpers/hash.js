const crypto = require('crypto')

module.exports = (str, algorithm = 'sha1') => {
  const shasum = crypto.createHash(algorithm)
  shasum.update(str)
  return shasum.digest('hex')
}
