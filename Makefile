TESTS = test/*.test.js

test:
	@./node_modules/.bin/mocha \
		--ui exports \
		--reporter spec \
		--require should \
	 	$(TESTS)

.PHONY: test
