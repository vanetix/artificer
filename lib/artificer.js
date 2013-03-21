/**
 * Module dependencies
 */

var utils = require('./utils'),
    markup = require('./markup'),
    Handlebars = require('handlebars');

/**
 * Build source directory `src` and output to `dest`
 *
 * @param {String} src
 * @param {String} dest
 * @param {Object} options
 */

module.exports = function(src, dest, options) {
  options = options || {};
  //var T = Handlebars.compile(utils.read(__dirname + '/templates/layout.html'));

  return recurse(src);

  function recurse(p) {
    var dir = utils.readDir(p);

    if(!dir) return;

    console.log(dir);

    // Pre-recurse into the lowest levels
    dir.directories.forEach(function(d) {
      console.log('recursing');
      return recurse(d);
    });

    dir.files.forEach(function(f) {
      console.log(f);
    });
  }
};
