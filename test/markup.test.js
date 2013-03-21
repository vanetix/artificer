/**
 * Module dependencies
 */

var doxen = require('doxen'),
    marked = require('marked'),
    utils = require('../lib/utils'),
    markup = require('../lib/markup');

/**
 * Markup tests
 */

describe('markup()', function() {
  it('should handle markdown with .md extension', function() {
    var f = __dirname + '/fixtures/first.md';
    markup(f).should.equal(marked(utils.read(f)));
  });

  it('should handle markdown with .markdown extension', function() {
    var f = __dirname + '/fixtures/second.markdown';
    markup(f).should.equal(marked(utils.read(f)));
  }); 

  it('should handle dox with .dox extension', function() {
    var f = __dirname + '/fixtures/utils.dox';
    markup(f).should.equal(doxen(utils.read(f)));
  });
});
