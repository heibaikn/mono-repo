.PHONY: pnpm_clear
pnpm_clear:
	bash -ec 'rm -rf node_modules;cd ..;'
	bash -ec 'cd packages; for dir in editor widget virtual-list helper file-icon; do pushd $$dir; rm -rf node_modules; popd; done;'
	bash -ec 'cd www; for dir in main low-code; do pushd $$dir; rm -rf node_modules; popd; done'
# bash -ec 'cd components; for dir in blg-popover file-icon; do pushd $$dir; rm -rf node_modules; popd; done'
