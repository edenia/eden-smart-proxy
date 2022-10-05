-include .env

VERSION ?= $(shell git ls-files -s nginx.conf k8s public src package.json yarn.lock Dockerfile | git hash-object --stdin)

IMAGE_NAME=eden-proxy-webapp
IMAGE_ID=$(shell docker images --format '{{.ID}}' --filter reference='docker.pkg.github.com/edenia/eden-smart-proxy*latest')
DOCKER_REGISTRY=ghcr.io//edenia/eden-smart-proxy

MAKE_ENV += DOCKER_REGISTRY VERSION IMAGE_NAME

SHELL_EXPORT := $(foreach v,$(MAKE_ENV),$(v)='$($(v))')
K8S_BUILD_DIR ?= ./build_k8s
K8S_FILES := $(shell find ./k8s -name '*.yml' | sed 's:./k8s/::g')

ifneq ("$(wildcard .env)", "")
	export $(shell sed 's/=.*//' .env)
endif
