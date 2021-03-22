.PHONY: build

AETHER_ROC_GUI_VERSION := latest

build: # @HELP build the Web GUI and run all validations (default)
build:
	ng build --prod

test: # @HELP run the unit tests and source code validation
test: deps build lint license_check
	ng test --browsers=ChromeHeadlessNoSandbox --watch=false

coverage: # @HELP generate unit test coverage data
coverage: deps build license_check test

deps: # @HELP ensure that the required dependencies are in place
	NG_CLI_ANALYTICS=false npm install

lint: # @HELP run the linters for Typescript source code
	ng lint

license_check: # @HELP examine and ensure license headers exist
	@if [ ! -d "../build-tools" ]; then cd .. && git clone https://github.com/onosproject/build-tools.git; fi
	./../build-tools/licensing/boilerplate.py -v --rootdir=${CURDIR} --boilerplate LicenseRef-ONF-Member-1.0

openapi-gen: # @HELP compile the OpenAPI files in to Typescript
	node_modules/.bin/ng-openapi-gen --input ../aether-roc-api/api/aether-2.0.0-openapi3.yaml --output src/openapi3/aether/2.0.0
	node_modules/.bin/ng-openapi-gen --input ../aether-roc-api/api/aether-2.1.0-openapi3.yaml --output src/openapi3/aether/2.1.0
	node_modules/.bin/ng-openapi-gen --input ../aether-roc-api/api/aether-top-level-openapi3.yaml --output src/openapi3/top/level
	for f in src/openapi3/*/*/*.ts src/openapi3/*/*/*/*.ts; do \
		sed -i '1i// GENERATED CODE -- DO NOT EDIT!' $$f; \
	done

aether-roc-gui-docker: # @HELP build aether-roc-gui Docker image
	docker build . -f build/aether-roc-gui/Dockerfile \
		-t onosproject/aether-roc-gui:${AETHER_ROC_GUI_VERSION}

images: # @HELP build all Docker images
images: build aether-roc-gui-docker

kind: # @HELP build Docker images and add them to the currently configured kind cluster
kind: images
	@if [ `kind get clusters` = '' ]; then echo "no kind cluster found" && exit 1; fi
	kind load docker-image onosproject/aether-roc-gui:${AETHER_ROC_GUI_VERSION}

all: build images

publish: build images
	./../build-tools/publish-version ${VERSION} onosproject/aether-roc-gui

clean: # @HELP remove all the build artifacts
	rm -rf ./dist ./node-modules

help:
	@grep -E '^.*: *# *@HELP' $(MAKEFILE_LIST) \
    | sort \
    | awk ' \
        BEGIN {FS = ": *# *@HELP"}; \
        {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}; \
    '
