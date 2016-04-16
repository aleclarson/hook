var hook,
  slice = [].slice;

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
  it("passes an empty function if no original exists", function() {
    var obj;
    obj = {};
    hook(obj, "key", function(func) {
      return expect(func).toBe(emptyFunction);
    });
    return obj.key();
  });
  return it("works with inherited functions", function() {
    var Foo, obj, spy;
    spy = jasmine.createSpy();
    Foo = function() {};
    Foo.prototype.key = spy;
    obj = new Foo;
    hook(obj, "key", function(func, arg) {
      func();
      spy(arg);
      return arg;
    });
    expect(obj.key(1)).toBe(1);
    expect(spy.calls.count()).toBe(2);
    expect(spy.calls.argsFor(0)).toEqual([]);
    return expect(spy.calls.argsFor(1)).toEqual([1]);
  });
});

describe("hook.before()", function() {
  it("calls the original function right after the hook", function() {
    var obj, spy;
    spy = jasmine.createSpy();
    obj = {
      key: spy
    };
    hook.before(obj, "key", function() {
      return spy(1);
    });
    obj.key();
    expect(spy.calls.count()).toBe(2);
    expect(spy.calls.argsFor(0)).toEqual([1]);
    return expect(spy.calls.argsFor(1)).toEqual([]);
  });
  return it("passes the arguments to the hook", function() {
    var obj;
    obj = {};
    hook.before(obj, "key", function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return expect(args).toEqual([1, 2]);
    });
    return obj.key(1, 2);
  });
});

describe("hook.after()", function() {
  it("calls the original function right before the hook", function() {
    var obj, spy;
    spy = jasmine.createSpy();
    obj = {
      key: spy
    };
    hook.after(obj, "key", function() {
      return spy(1);
    });
    obj.key();
    expect(spy.calls.count()).toBe(2);
    expect(spy.calls.argsFor(0)).toEqual([]);
    return expect(spy.calls.argsFor(1)).toEqual([1]);
  });
  it("passes the original function's result to the hook", function() {
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
  return it("passes the arguments to the hook", function() {
    var obj;
    obj = {};
    hook.after(obj, "key", function() {
      var args, result;
      result = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      return expect(args).toEqual([2, 3]);
    });
    return obj.key(2, 3);
  });
});

//# sourceMappingURL=../../map/spec/hook.map
