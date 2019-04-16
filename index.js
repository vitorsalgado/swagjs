#!/usr/bin/env node

/* eslint-disable no-console */

'use strict'

const Program = require('commander')
const Package = require('./package')
const SpecsBuilder = require('./src/spec_builder')
const SwaggerServer = require('./src/swagger_server')

const argv = process.argv

if (argv.length <= 2) argv.push('--help')

Program
  .version(Package.version)
  .description(Package.description)
  .allowUnknownOption()

Program
  .command('generate <base_dir>')
  .alias('gen')
  .description('Merge modularized Swagger specs into a single file')
  .option('-o, --output <output>', 'Output file/directory', './__temp__/swagger.json')
  .option('-i, --index <index>', 'Swagger base definition')
  .option('--model-pattern [model_pattern]', 'Model files naming pattern', (val, def) => def.concat([val]), ['.model.', '.models.'])
  .option('--path-pattern [path_pattern]', 'Path files naming pattern', (val, def) => def.concat([val]), ['.path.', '.paths.'])
  .option('-t, --tags [tags]', 'Tags definition. If none is provided, tags should be defined in base Swagger definition')
  .action((baseDir, opts) => SpecsBuilder.joinAndBuild({ baseDir, ...opts }))
  .on('--help', () =>
    console.log(`
Example:
   $ ${Package.name} generate ./specs_root_dir --output=./output_file`))

Program
  .command('server <base_dir>')
  .description('Create a Web Server for a modularized Swagger specification')
  .option('-p, --port <port>', 'Server port', parseInt, 3000)
  .option('-h, --host <host>', 'Server host', '0.0.0.0')
  .option('-i, --index <index>', 'Swagger base definition')
  .option('-u, --ui-path <uiPath>', 'Swagger UI Path', '/')
  .option('--model-pattern [model_pattern]', 'Model files naming pattern', (val, def) => def.concat([val]), ['.model.', '.models.'])
  .option('--path-pattern [path_pattern]', 'Path files naming pattern', (val, def) => def.concat([val]), ['.path.', '.paths.'])
  .option('-t, --tags [tags]', 'Tags definition. If none is provided, tags should be defined in base Swagger definition')
  .action((baseDir, opts) =>
    SwaggerServer.startServerWith({ baseDir, ...opts },
      SpecsBuilder.joinAndBuild({ baseDir, ...opts })))
  .on('--help', () =>
    console.log(`
Example:
   $ ${Package.name} server ./specs_root_dir --port=8080 --model-pattern=.definition.`))

Program.parse(argv)
