/**
 * Module dependencies
 */

var fs = require('fs'),
    path = require('path'),
    utils = exports = module.exports;

/**
 * Does path `p` exist?
 *
 * @param {String} p
 * @return {Boolean}
 */

utils.exists = function exists(p) {
  return fs.existsSync(p);
};

/**
 * Returns `true` if `p` is a directory
 *
 * @param {String} p
 * @return {Boolean}
 */

utils.isDir = function isDir(p) {
  return exists(p) && fs.lstatSync().isDirectory();
};

/**
 * Returns `true` if `p` is a file
 *
 * @param {String} p
 * @return {Boolean}
 */

utils.isFile = function isFile(p) {
  return exists(p) && fs.lstatSync().isFile();
};

/**
 * Chunk `p` into parts
 *
 * @param {String} p
 * @return {Array}
 */

utils.splitPaths = function splitPaths(p) {
  return p.split(path.sep);
};

/**
 * Make all directories leading up to `p`
 * like a unix `mkdir -p p`
 *
 * @param {String} p
 * @return {Boolean}
 */

utils.mkdir = function mkdir(p) {
  var errors;

  splitPaths(p).reduce(function(dirs, dir) {
    dirs += dir + path.sep;
    var s = path.resolve(dirs);

    if(!exists(s)) {
      try {
        fs.mkdirSync(s);
      } catch(e) {
        errors = true;
      }
    }

    return dirs;
  }, '');

  return !errors;
};

/**
 * Read the path `p` and return an object with files and directories
 *
 * @param {String} p
 * @return {Object}
 */

utils.readDir = function readDir(p) {
  if(!isDir(p)) return false;
  var dir = fs.readdirSync(p);

  return {
    files: dir.filter(function(f) {
      return isFile(p);
    }),
    directories: dir.filter(function(f) {
      return isDir(p);
    });
  };
};

/**
 * Read file `p`
 *
 * @param {String} p
 * @return {String|Boolean}
 */

utils.read = function read(p) {
  if(!exists(p)) return false;

  try {
    return fs.readFileSync(p);
  } catch(e) {
    return false;
  }
};

/**
 * Write `data` to path `p`
 *
 * @param {String} p
 * @param {String} data
 * @return {Boolean}
 */

utils.write = function write(p, data) {
  mkdir(path.dirname(p));

  try {
    fs.writeFileSync(p, data);
    return true;
  } catch(e) {
    return false;
  }
};
