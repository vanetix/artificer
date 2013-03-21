/**
 * Module dependencies
 */

var utils = require('../lib/utils');

/**
 * Tests for artificer utils
 */

describe('splitPaths()', function() {
  it('should split absolute paths', function() {
    var p = utils.splitPaths('/path/to/destination');
    p.should.be.length(3);
    p.should.eql(['path', 'to', 'destination']);
  });

  it('should split relative paths', function() {
    var p = utils.splitPaths('path/to/dest/foo');
    p.should.be.length(4);
    p.should.include('path', 'to', 'dest', 'foo');
  });
});

describe('filename()', function() {
  it('should get the name in absolute path', function() {
    var name = utils.fileName('/path/to/foo.bar');
    name.should.equal('foo');
  });

  it('should get the name in a basename case', function() {
    var name = utils.fileName('foo.bar');
    name.should.equal('foo');
  });
});

describe('joinPaths()', function() {
  it('should join a simple case', function() {
    var p = utils.joinPaths('/path/to/', '/new/file.json');
    p.should.equal('/path/to/new/file.html');
  });

  it('should join a complex case', function() {
    var p = utils.joinPaths('../path/to', 'file.txt');
    p.should.equal('../path/to/file.html');
  });
});

describe('read()', function() {
  it('should return false when not found', function() {
    var f = utils.read(__dirname + '/nonexistent.no');
    f.should.not.be.ok;
  });
});
