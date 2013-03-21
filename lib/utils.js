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

var exists = utils.exists = function(p) {
  return fs.existsSync(p);
};

/**
 * Returns `true` if `p` is a directory
 *
 * @param {String} p
 * @return {Boolean}
 */

var isDir = utils.isDir = function(p) {
  return exists(p) && fs.lstatSync(p).isDirectory();
};

/**
 * Returns `true` if `p` is a file
 *
 * @param {String} p
 * @return {Boolean}
 */

var isFile = utils.isFile = function(p) {
  return exists(p) && fs.lstatSync(p).isFile();
};

/**
 * Chunk `p` into parts
 *
 * @param {String} p
 * @return {Array}
 */

var splitPaths = utils.splitPaths = function(p) {
  return p.split(path.sep);
};

/**
 * Return the name of file `p`
 *
 * @param {String} p
 * @return {String}
 */

var fileName = utils.fileName = function(p) {
  return path.basename(p, path.extname(p));
};

/**
 * Joins paths `a` and `b`, but replaces `b` ext with html
 *
 * @param {String} a
 * @param {String} b
 * @return {String}
 */

var joinPaths = utils.joinPaths = function(a, b) {
  var f = fileName(b),
      b = path.dirname(b);

  return path.join(a, b, f + '.html');
};

/**
 * Make all directories leading up to `p`
 * like a unix `mkdir -p p`
 *
 * @param {String} p
 * @return {Boolean}
 */

var mkdir = utils.mkdir = function(p) {
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

var readDir = utils.readDir = function(p) {
  if(!isDir(p)) return false;
  var dir = fs.readdirSync(p).map(function(f) {
    return path.join(p, f);
  });

  return {
    files: dir.filter(function(f) {
      return isFile(f);
    }),
    directories: dir.filter(function(f) {
      return isDir(f);
    })
  };
};

/**
 * Read file `p`
 *
 * @param {String} p
 * @return {String|Boolean}
 */

var read = utils.read = function(p) {
  if(!exists(p)) return false;

  try {
    return fs.readFileSync(p, 'utf8');
  } catch(e) {
    return false;
  }
};

/**
 * Write `data` to path `p` creating any directories on the way.
 *
 * @param {String} p
 * @param {String} data
 * @return {Boolean}
 */

var write = utils.write = function(p, data) {
  mkdir(path.dirname(p));

  try {
    fs.writeFileSync(p, data);
    return true;
  } catch(e) {
    return false;
  }
};
