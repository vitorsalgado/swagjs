'use strict'

const Fs = require('fs')
const Path = require('path')

module.exports.eliminateGoogleFonts = () => {
  const googleFontsTag = '<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700|Source+Code+Pro:300,600|Titillium+Web:400,600,700" rel="stylesheet">'
  const path = Path.resolve('node_modules/swagger-tools/middleware/swagger-ui/index.html')
  const content = Fs.readFileSync(path)

  Fs.writeFileSync(path, content.toString().replace(googleFontsTag, ''))
}
