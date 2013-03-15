/**
 * Module dependencies
 */

var fs = require('fs'),
    path = require('path');

/**
 * Reads file with path `p` and returns the marked up html string.
 *
 * @param {String} p
 * @return {String}
 */

module.exports = function(p) {
  var parserFn = parser(path.extname(p).slice(1));

  if(!parserFn) throw new Error('Undefined document type');
  return parseFn(fs.readFileSync(p));
};

/**
 * Find the correct parser for the file extension and return it.
 *
 * TODO: Support more parsers. Ex: Json, yaml
 *
 * @param {String} ext
 */

function parser(ext) {
  if(ext === 'md' || ext === 'markdown') {
    return require('marked');
  }

  if(ext === 'textile' || ext === 'tex') {
    return require('textile');
  }
}
