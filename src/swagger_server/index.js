'use strict'

/* eslint-disable no-console */

const Express = require('express')
const SwaggerTools = require('swagger-tools')

const Server = Express()

module.exports.startServerWith = (opts, specs) =>
  SwaggerTools.initializeMiddleware(specs, middleware => {
    Server.use(middleware.swaggerMetadata())
    Server.use(middleware.swaggerValidator())
    Server.use(middleware.swaggerRouter({ useStubs: false }))
    Server.use(middleware.swaggerUi({ swaggerUi: '/' }))

    console.debug(`
 ____                         _ ____  
/ ___|_      ____ _  __ _    | / ___| 
\\___ \\ \\ /\\ / / _\` |/ _\` |_  | \\___ \\ 
 ___) \\ V  V / (_| | (_| | |_| |___) |
|____/ \\_/\\_/ \\__,_|\\__, |\\___/|____/ 
                    |___/             
  `
    )

    Server.listen(opts.port, opts.host, () =>
      console.debug(
        `Specs Root: ${opts.baseDir}\n` +
        `Swagger UI: http://${opts.host}:${opts.port}${opts.uiPath}\n\n` +
        `Swagger is online and ready ...\n`))
  })
