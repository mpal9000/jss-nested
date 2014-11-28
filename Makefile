push:
	git push origin master
	git push origin master:gh-pages
	git push --tags

publish: push
	npm pu

.PHONY: push publish
