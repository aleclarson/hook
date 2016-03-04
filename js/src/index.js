var _addHook, emptyFunction, steal,
  slice = [].slice;

require("lotus-require");

emptyFunction = require("emptyFunction");

steal = require("steal");

module.exports = {
  before: function(obj, key, hook) {
    return _addHook(obj, key, function(orig, args) {
      hook.call(this, args);
      return orig.apply(this, args);
    });
  },
  after: function(obj, key, hook) {
    return _addHook(obj, key, function(orig, args) {
      var result;
      result = orig.apply(this, args);
      return hook.call(this, args, result);
    });
  }
};

_addHook = function(obj, key, hook) {
  var orig;
  orig = steal(obj, key, emptyFunction);
  obj[key] = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return hook.call(this, orig, args);
  };
};

//# sourceMappingURL=../../map/src/index.map
