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
  check(loadMatchingPattern(opts, opts.modelPattern)).fold()

const paths = opts =>
  check(loadMatchingPattern(opts, opts.pathPattern)).fold()

const tags = ({ baseDir, tags }) =>
  check(tags)
    .on(file => !file, () => ({}))
    .on(isYml, file => safeLoad(readFile(Path.resolve(file))))
    .fold()

const isYml = x => x.indexOf('.yml') >= 0 || x.indexOf('.yaml') >= 0

const isJson = x => x.indexOf('.json') >= 0

const load = file =>
  check(file)
    .on(isYml, x => safeLoad(readFile(x)))
    .on(isJson, readFile)
    .fold()

const loadMatchingPattern = (opts, pattern) =>
  readDir(opts.baseDir,
    file => pattern.some(pattern => file.indexOf(pattern) >= 0), load)

const shouldSaveOutput = opts => !!opts.output

const saveOutput = (opts, data) =>
  shouldSaveOutput(opts)
    ? Fs.writeFileSync(opts.output, JSON.stringify(data, 2, 2))
    : null
