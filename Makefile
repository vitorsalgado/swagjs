SHELL := /bin/bash

sample_server:
	node index server ./example -i ./example/base_swagger.yml

test:
	npm run sonar
	npm run test:all

nvm:
	[ -s "$$HOME/.nvm/nvm.sh" ] && . "$$HOME/.nvm/nvm.sh" && \
	nvm install $$(cat .nvmrc) && \
	nvm use
