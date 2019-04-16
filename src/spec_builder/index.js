'use strict'

const Fs = require('fs')
const Path = require('path')

const { safeLoad } = require('js-yaml')
const { check, peek } = require('nodejs-fx')
const { readDir, readFile } = require('../utils/file')

module.exports.joinAndBuild = opts =>
  check(opts)
    .map(base)
    .map(swagger =>
      ({
        ...swagger,
        ...tags(opts),
        paths: Object.assign({}, ...paths(opts)),
        definitions: Object.assign({}, ...definitions(opts))
      }))
    .map(peek(data => saveOutput(opts, data)))
    .fold()

const base = opts =>
  check(opts.index)
    .on(isYml, x => safeLoad(readFile(Path.resolve(x))))
    .otherwise(readFile)

const definitions = opts =>
  check(readDir(opts.baseDir,
    file => opts.modelPattern.some(pattern => file.indexOf(pattern) >= 0), load))
    .fold()

const paths = opts =>
  check(readDir(opts.baseDir,
    file => opts.pathPattern.some(pattern => file.indexOf(pattern) >= 0), load))
    .fold()

const tags = ({ baseDir, tags }) =>
  check(tags)
    .on(file => !file, () => ({}))
    .on(isYml, file => safeLoad(readFile(Path.join(baseDir, file))))
    .fold()

const isYml = x => x.indexOf('.yml') >= 0 || x.indexOf('.yaml') >= 0

const isJson = x => x.indexOf('.json') >= 0

const load = file =>
  check(file)
    .on(isYml, x => safeLoad(readFile(x)))
    .on(isJson, readFile)
    .fold()

const shouldSaveOutput = opts => !!opts.output

const saveOutput = (opts, data) =>
  shouldSaveOutput(opts)
    ? Fs.writeFileSync(Path.resolve(opts.output), JSON.stringify(data, 2, 2))
    : null
