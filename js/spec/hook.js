var hook;

hook = require("../src/hook");

describe("hook()", function() {
  it("overrides the original function", function() {
    var obj, spy;
    obj = {
      key: spy = jasmine.createSpy()
    };
    hook(obj, "key", emptyFunction);
    obj.key();
    return expect(spy.calls.count()).toBe(0);
  });
  it("passes the original function as the first argument", function() {
    var obj, orig;
    obj = {
      key: orig = function() {}
    };
    hook(obj, "key", function(func) {
      return expect(func).toBe(orig);
    });
    return obj.key();
  });
  return it("passes an empty function if no original exists", function() {
    var obj;
    obj = {};
    hook(obj, "key", function(func) {
      return expect(func).toBe(emptyFunction);
    });
    return obj.key();
  });
});

describe("hook.before()", function() {
  return it("calls the original function right after the hook", function() {
    var obj, spy;
    obj = {
      key: spy = jasmine.createSpy()
    };
    hook.before(obj, "key", function() {
      return expect(spy.calls.count()).toBe(0);
    });
    return obj.key();
  });
});

describe("hook.after()", function() {
  it("calls the original function right before the hook", function() {
    var obj, spy;
    obj = {
      key: spy = jasmine.createSpy()
    };
    hook.after(obj, "key", function() {
      return expect(spy.calls.count()).toBe(1);
    });
    return obj.key();
  });
  return it("passes the original function's result to the hook", function() {
    var obj;
    obj = {
      key: function() {
        return 1;
      }
    };
    hook.after(obj, "key", function(result) {
      return expect(result).toBe(1);
    });
    return obj.key();
  });
});

//# sourceMappingURL=../../map/spec/hook.map
