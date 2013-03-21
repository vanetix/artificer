TESTS = test/*.test.js

test:
	@./node_modules/.bin/mocha \
		--reporter spec \
		--require should \
	 	$(TESTS)

.PHONY: test
