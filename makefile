include utils/meta.mk

LATEST_TAG ?= latest

install: ##@local Install all dependencies
install:
	@yarn

clean-install: ##@local Reinstalls all dependencies
clean-install:
	@rm -Rf node_modules
	@yarn

run: ##@local Run the project locally (without docker)
run:
	@echo "WEBAPP RUN"
	@$(SHELL_EXPORT) yarn && yarn dev | cat
	@echo "done webapp"

build-docker: ##@devops Build the docker image
build-docker: ./Dockerfile
	@echo "DOCKER WEBAPP"
	echo "Building containers..."
	@docker pull $(DOCKER_REGISTRY)/$(IMAGE_NAME):$(LATEST_TAG) || true
	@docker build \
		-t $(DOCKER_REGISTRY)/$(IMAGE_NAME):$(VERSION) --target runner \
		-t $(DOCKER_REGISTRY)/$(IMAGE_NAME):$(LATEST_TAG) --target runner \
		--build-arg next_public_ual_app_name="$(NEXT_PUBLIC_UAL_APP_NAME)" \
		--build-arg next_public_ual_api_protocol="$(NEXT_PUBLIC_UAL_API_PROTOCOL)" \
		--build-arg next_public_ual_api_host="$(NEXT_PUBLIC_UAL_API_HOST)" \
		--build-arg next_public_ual_api_port="$(NEXT_PUBLIC_UAL_API_PORT)" \
		--build-arg next_public_ual_chain_id="$(NEXT_PUBLIC_UAL_CHAIN_ID)" \
		--build-arg next_public_aa_api_host="$(NEXT_PUBLIC_AA_API_HOST)" \
		--build-arg next_public_genesiseden_contract="$(NEXT_PUBLIC_GENESISEDEN_CONTRACT)" \
		--build-arg next_public_edensmartproxy_contract="$(NEXT_PUBLIC_EDENSMARTPROXY_CONTRACT)" \
		--build-arg next_public_myvoteeosdao_contract="$(NEXT_PUBLIC_MYVOTEEOSDAO_CONTRACT)" \
		.

pull-image: ##@devops Pull the latest image from registry for caching
pull-image:
	@docker pull $(DOCKER_REGISTRY)/$(IMAGE_NAME):$(LATEST_TAG) || true

build-docker-cached: ##@devops Build the docker image using cached layers
build-docker-cached: ./Dockerfile
	@docker build \
		--target runner \
		--cache-from $(DOCKER_REGISTRY)/$(IMAGE_NAME):$(LATEST_TAG) \
		-t $(DOCKER_REGISTRY)/$(IMAGE_NAME):$(VERSION) \
		-t $(DOCKER_REGISTRY)/$(IMAGE_NAME):$(LATEST_TAG) \
		.

push-image: ##@devops Push the freshly built image and tag with release or latest tag
push-image:
	@docker push $(DOCKER_REGISTRY)/$(IMAGE_NAME):$(VERSION)
	@docker push $(DOCKER_REGISTRY)/$(IMAGE_NAME):$(LATEST_TAG)

build-kubernetes: ##@devops Generate proper k8s files based on the templates
build-kubernetes: ./k8s
	@echo "Build kubernetes files..."
	@rm -Rf $(K8S_BUILD_DIR) && mkdir -p $(K8S_BUILD_DIR)
	@for file in $(K8S_FILES); do \
		mkdir -p `dirname "$(K8S_BUILD_DIR)/$$file"`; \
		$(SHELL_EXPORT) envsubst <./k8s/$$file >$(K8S_BUILD_DIR)/$$file; \
	done

deploy-kubernetes: ##@devops Publish the build k8s files
deploy-kubernetes: $(K8S_BUILD_DIR)
	@kubectl create ns $(NAMESPACE) || echo "Namespace '$(NAMESPACE)' already exists.";
	@for file in $(shell find $(K8S_BUILD_DIR) -name '*.yml' | sed 's:$(K8S_BUILD_DIR)/::g'); do \
		kubectl apply -n edenproxy -f $(K8S_BUILD_DIR)/$$file; \
	done

build-docker-voter: ##@devops Build the docker image
build-docker-voter: ./Dockerfile
	@docker pull $(DOCKER_REGISTRY)/$(IMAGE_NAME_VOTER):$(VERSION) || true
	@docker build \
		--target release \
		-t $(DOCKER_REGISTRY)/$(IMAGE_NAME_VOTER):$(VERSION) \
		-t $(DOCKER_REGISTRY)/$(IMAGE_NAME_VOTER):$(LATEST_TAG) \
		./voter

pull-image-voter: ##@devops Pull the latest image from registry for caching
pull-image-voter:
	@docker pull $(DOCKER_REGISTRY)/$(IMAGE_NAME_VOTER):$(LATEST_TAG) || true

build-docker-cached-voter: ##@devops Build the docker image using cached layers
build-docker-cached-voter: ./Dockerfile
	@docker build \
		--target prod-stage \
		--cache-from $(DOCKER_REGISTRY)/$(IMAGE_NAME_VOTER):$(LATEST_TAG) \
		-t $(DOCKER_REGISTRY)/$(IMAGE_NAME_VOTER):$(VERSION) \
		-t $(DOCKER_REGISTRY)/$(IMAGE_NAME_VOTER):$(LATEST_TAG) \
		./voter

push-image-voter: ##@devops Push the freshly built image and tag with release or latest tag
push-image-voter:
	@docker push $(DOCKER_REGISTRY)/$(IMAGE_NAME_VOTER):$(VERSION)
