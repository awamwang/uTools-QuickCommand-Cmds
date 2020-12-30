const iconv = require('iconv-lite')

const reEncode = function (data) {
  var codec = utools.isWindows() ? 'cp936' : 'utf8'
  return iconv.decode(data, codec)
}
