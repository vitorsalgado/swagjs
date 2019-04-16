# SwagJS
[![Build Status](https://travis-ci.org/vitorsalgado/swagjs.svg?branch=master)](https://travis-ci.org/vitorsalgado/swagjs) 
[![Coverage Status](https://coveralls.io/repos/github/vitorsalgado/swagjs/badge.svg?branch=master)](https://coveralls.io/github/vitorsalgado/swagjs?branch=master) 
[![Maintainability](https://api.codeclimate.com/v1/badges/8132957f371a0573f384/maintainability)](https://codeclimate.com/github/vitorsalgado/swagjs/maintainability)  

Modular Swagger Spec Builder.  

---

**SwagJs** enables you to build modular Swagger Documentation.  
You can create separate files for **paths**, **models**, **tags** and **base configuration**.  
The [example](./example) directory contains a sample modularized Swagger Documentation.

## Install
```
npm i swagjs -g
```

## Usage
You can create a Node.js based Swagger Specs Server or generate only a merged spec from your modular documentation.  
This library uses files pattern to identify which one is a model definition, a path definition and so on. 
You can configure the file pattern the way you like in the command line providing the parameters:  
```
--model-pattern
--path-pattern
```
Below the available command description.

### Help
```
swagjs --help 
swagjs gen --help
swagjs server --help
```

### Merging Modular Spec
```
# sample
swagjs gen ./specs_root_dir --output=./output_file
``` 

### Swagger Server With Modular Spec
```
# sample
server ./specs_root_dir --port=8080 
```

## License
This project is available under Apache Public License version 2.0. See [LICENSE](LICENSE).
