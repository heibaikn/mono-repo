.PHONY: pnpm_clear
pnpm_clear:
	bash -ec 'find . -type d -name "node_modules" -exec rm -rf {} \;'
# bash -ec 'rm -rf node_modules;cd ..;'
# bash -ec 'cd packages; for dir in editor widget virtual-list helper file-icon; do pushd $$dir; rm -rf node_modules; popd; done;'
# bash -ec 'cd www; for dir in main design react; do pushd $$dir; rm -rf node_modules; popd; done'
# bash -ec 'cd components; for dir in blg-popover file-icon; do pushd $$dir; rm -rf node_modules; popd; done'

# .PHONY: build
# build:
# 	bash -ec 'pnpm i;'
# 	bash -ec 'pnpm run a:build;'

.PHONY: build
build:
	bash -ec 'docker-compose -f ./docker/docker-compose.yml up -d'	

.PHONY: rebuild
rebuild:
	bash -ec 'docker-compose -f ./docker/docker-compose.yml up -d --build'	

.PHONY: stop
stop:
	bash -ec 'docker-compose -f ./docker/docker-compose.yml stop'