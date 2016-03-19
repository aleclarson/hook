
hook = require "../src/hook"

describe "hook()", ->

  it "overrides the original function", ->
    obj = key: spy = jasmine.createSpy()
    hook obj, "key", emptyFunction
    obj.key()
    expect(spy.calls.count()).toBe 0

  it "passes the original function as the first argument", ->
    obj = key: orig = ->
    hook obj, "key", (func) ->
      expect(func).toBe orig
    obj.key()

  it "passes an empty function if no original exists", ->
    obj = {}
    hook obj, "key", (func) ->
      expect(func).toBe emptyFunction
    obj.key()

describe "hook.before()", ->

  it "calls the original function right after the hook", ->
    obj = key: spy = jasmine.createSpy()
    hook.before obj, "key", ->
      expect(spy.calls.count()).toBe 0
    obj.key()

describe "hook.after()", ->

  it "calls the original function right before the hook", ->
    obj = key: spy = jasmine.createSpy()
    hook.after obj, "key", ->
      expect(spy.calls.count()).toBe 1
    obj.key()

  it "passes the original function's result to the hook", ->
    obj = key: -> 1
    hook.after obj, "key", (result) ->
      expect(result).toBe 1
    obj.key()
