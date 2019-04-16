/* eslint-disable global-require */

'use strict'

const Fs = require('fs')
const { check, flatten } = require('nodejs-fx')

const CHARSET = 'utf8'

module.exports.readDir = (root, fileFilter, transform, acc = []) =>
  flatten(
    Fs
      .readdirSync(root)
      .map(directory => `${root}/${directory}`)
      .map(file =>
        check(file)
          .on(isDirectory, x => acc.concat(exports.readDir(x, fileFilter, transform, acc)))
          .on(fileFilter, x => acc.concat(transform(x)))
          .otherwise(() => acc))
      .filter(notEmpty))

module.exports.readFile = file => Fs.readFileSync(file, CHARSET)

const isDirectory = value =>
  check(value)
    .map(Fs.statSync)
    .on(stat => stat && stat.isDirectory(), () => true)
    .otherwise(() => false)

const notEmpty = arr => arr && arr.length > 0
