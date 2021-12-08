# set default shell
SHELL = bash -e -o pipefail

# Variables
VERSION                  ?= $(shell cat ./VERSION)

## Docker related
DOCKER_USER              ?=
DOCKER_PASSWORD          ?=
DOCKER_REGISTRY          ?=
DOCKER_REPOSITORY        ?= onosproject/
DOCKER_BUILD_ARGS        ?=
DOCKER_TAG               ?= ${VERSION}
DOCKER_IMAGENAME         := ${DOCKER_REGISTRY}${DOCKER_REPOSITORY}aether-roc-gui:${DOCKER_TAG}

## Docker labels. Only set ref and commit date if committed
DOCKER_LABEL_VCS_URL     ?= $(shell git remote get-url $(shell git remote | head -n 1))
DOCKER_LABEL_BUILD_DATE  ?= $(shell date -u "+%Y-%m-%dT%H:%M:%SZ")
DOCKER_LABEL_COMMIT_DATE = $(shell git show -s --format=%cd --date=iso-strict HEAD)

ifeq ($(shell git ls-files --others --modified --exclude-standard 2>/dev/null | wc -l | sed -e 's/ //g'),0)
  DOCKER_LABEL_VCS_REF = $(shell git rev-parse HEAD)
else
  DOCKER_LABEL_VCS_REF = $(shell git rev-parse HEAD)+dirty
endif

.PHONY: build

help:
	@grep -E '^.*: *# *@HELP' $(MAKEFILE_LIST) \
    | sort \
    | awk ' \
        BEGIN {FS = ": *# *@HELP"}; \
        {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}; \
    '

build: # @HELP build the Web GUI and run all validations (on the host machine)
build:
	npm run build:prod

test: # @HELP run the unit tests and source code validation
test: deps build lint license_check
	npm test

jenkins-test: lint test

coverage: # @HELP generate unit test coverage data
coverage: deps build license_check test

deps: # @HELP ensure that the required dependencies are in place
	NG_CLI_ANALYTICS=false npm install

lint: deps
	npm run lint

license_check: # @HELP examine and ensure license headers exist
	@if [ ! -d "../build-tools" ]; then cd .. && git clone https://github.com/onosproject/build-tools.git; fi
	./../build-tools/licensing/boilerplate.py -v --rootdir=${CURDIR} --boilerplate LicenseRef-ONF-Member-1.0

# For running make openapi-gen in Mac run the below command and change sed to gsed\
brew install gsed

openapi-gen: # @HELP compile the OpenAPI files in to Typescript
	node_modules/.bin/ng-openapi-gen --input ../aether-roc-api/api/aether-3.0.0-openapi3.yaml --output src/openapi3/aether/3.0.0
	node_modules/.bin/ng-openapi-gen --input ../aether-roc-api/api/aether-4.0.0-openapi3.yaml --output src/openapi3/aether/4.0.0
	node_modules/.bin/ng-openapi-gen --input ../aether-roc-api/api/aether-top-level-openapi3.yaml --output src/openapi3/top/level
	for f in src/openapi3/*/*/*.ts src/openapi3/*/*/*/*.ts; do \
		sed -i '1i// GENERATED CODE -- DO NOT EDIT!' $$f; \
	done

aether-roc-gui-docker: # @HELP build aether-roc-gui Docker image
	docker build . -f build/aether-roc-gui/Dockerfile \
        --build-arg LOCAL_ONOSAPPS=$(LOCAL_ONOSAPPS) \
        --build-arg org_label_schema_version="${VERSION}" \
        --build-arg org_label_schema_vcs_url="${DOCKER_LABEL_VCS_URL}" \
        --build-arg org_label_schema_vcs_ref="${DOCKER_LABEL_VCS_REF}" \
        --build-arg org_label_schema_build_date="${DOCKER_LABEL_BUILD_DATE}" \
        --build-arg org_opencord_vcs_commit_date="${DOCKER_LABEL_COMMIT_DATE}" \
		-t ${DOCKER_IMAGENAME}

images: # @HELP build all Docker images (the build happens inside a docker container)
images: aether-roc-gui-docker

docker-build: aether-roc-gui-docker

docker-push: # push to docker registy: use DOCKER_REGISTRY, DOCKER_REPOSITORY and DOCKER_TAG to customize
ifdef DOCKER_USER
ifdef DOCKER_PASSWORD
	echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USER} --password-stdin
else
	@echo "DOCKER_USER is specified but DOCKER_PASSWORD is missing"
	@exit 1
endif
endif
	docker push ${DOCKER_IMAGENAME}

kind: # @HELP build Docker images and add them to the currently configured kind cluster
kind: images
	@if [ `kind get clusters` = '' ]; then echo "no kind cluster found" && exit 1; fi
	kind load docker-image onosproject/aether-roc-gui:${AETHER_ROC_GUI_VERSION}

all: build images

publish: build images
	./../build-tools/publish-version ${VERSION} onosproject/aether-roc-gui

clean: # @HELP remove all the build artifacts
	rm -rf ./dist ./node-modules
