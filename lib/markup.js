/**
 * Module dependencies
 */

var path = require('path'),
    utils = require('./utils');

/**
 * Reads file with path `p` and returns the marked up html string.
 *
 * @param {String} p
 * @return {String}
 */

module.exports = function(p) {
  var fn = parser(path.extname(p).slice(1));

  if(!fn) throw new Error('Undefined document type');
  return fn(utils.read(p));
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

  if(ext === 'dox') {
    return require('doxen');
  }
}
