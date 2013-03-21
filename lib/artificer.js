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
  var s, data,
      T = Handlebars.compile(utils.read(__dirname + '/templates/layout.html'));

  options = options || {};

  recurse(src, function(f) {
    s = utils.joinPaths(dest, f);

    data = {
      title: utils.fileName(f) + ' | ' + (options.title || 'Artificer'),
      content: markup(f)
    };

    if(options.verbose) {
      process.stdout.write('  Wrote file: \x1b[32m' + f + '\x1b[0m\n');
    }

    utils.write(s, T(data));
  });
};

/**
 * Recurse through all files in a given path, executing `fn` for each file
 *
 * @param {String} p
 * @param {Function} fn called for every file found
 */

function recurse(p, fn) {
  var d = utils.readDir(p);

  d.directories.forEach(function(d) {
    return recurse(d);
  });

  d.files.forEach(function(f) {
    return fn(f);
  });
}
