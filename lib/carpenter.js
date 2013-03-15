/**
 * Module dependencies
 */

var fs = require('fs'),
    path = require('path'),
    markup = require('./markup');

/**
 * Build source directory `src` and output to `dest`
 *
 * @param {String} src
 * @param {String} dest
 */

module.exports = function(src, dest) {
  if(!fs.existsSync(src)) throw new Error('Source path does not exist');
  if(fs.existsSync(dest)) throw new Error('Destination already exists in the filesystem');


};
