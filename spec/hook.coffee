
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

  it "works with inherited functions", ->

    spy = jasmine.createSpy()

    Foo = ->

    Foo::key = spy

    obj = new Foo

    hook obj, "key", (func, arg) ->
      func()
      spy arg
      return arg

    expect obj.key 1
      .toBe 1

    expect spy.calls.count()
      .toBe 2

    expect spy.calls.argsFor 0
      .toEqual []

    expect spy.calls.argsFor 1
      .toEqual [ 1 ]

describe "hook.before()", ->

  it "calls the original function right after the hook", ->

    spy = jasmine.createSpy()

    obj = { key: spy }

    hook.before obj, "key", -> spy 1

    obj.key()

    expect spy.calls.count()
      .toBe 2

    expect spy.calls.argsFor 0
      .toEqual [ 1 ]

    expect spy.calls.argsFor 1
      .toEqual []

  it "passes the arguments to the hook", ->

    obj = {}

    hook.before obj, "key", (args...) ->
      expect args
        .toEqual [ 1, 2 ]

    obj.key 1, 2

describe "hook.after()", ->

  it "calls the original function right before the hook", ->

    spy = jasmine.createSpy()

    obj = { key: spy }

    hook.after obj, "key", -> spy 1

    obj.key()

    expect spy.calls.count()
      .toBe 2

    expect spy.calls.argsFor 0
      .toEqual []

    expect spy.calls.argsFor 1
      .toEqual [ 1 ]

  it "passes the original function's result to the hook", ->

    obj = key: -> 1

    hook.after obj, "key", (result) ->

      expect result
        .toBe 1

    obj.key()

  it "passes the arguments to the hook", ->

    obj = {}

    hook.after obj, "key", (result, args...) ->

      expect args
        .toEqual [ 2, 3 ]

    obj.key 2, 3
