var emptyFunction, hook, shift, unshift;

require("lotus-require");

emptyFunction = require("emptyFunction");

shift = Array.prototype.shift;

unshift = Array.prototype.unshift;

hook = function(obj, key, newValue) {
  var oldValue;
  oldValue = obj[key] || emptyFunction;
  return obj[key] = function() {
    unshift.call(arguments, oldValue);
    return newValue.apply(this, arguments);
  };
};

hook.before = function(obj, key, newValue) {
  return hook(obj, key, function() {
    var oldValue;
    oldValue = shift.call(arguments);
    newValue.apply(this, arguments);
    return oldValue.apply(this, arguments);
  });
};

hook.after = function(obj, key, newValue) {
  return hook(obj, key, function() {
    unshift.call(arguments, (shift.call(arguments)).apply(this, arguments));
    return newValue.apply(this, arguments);
  });
};

module.exports = hook;

//# sourceMappingURL=../../map/src/hook.map