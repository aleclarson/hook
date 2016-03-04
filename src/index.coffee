
require "lotus-require"

emptyFunction = require "emptyFunction"
steal = require "steal"

module.exports =

  before: (obj, key, hook) ->
    _addHook obj, key, (orig, args) ->
      hook.call this, args
      orig.apply this, args

  after: (obj, key, hook) ->
    _addHook obj, key, (orig, args) ->
      result = orig.apply this, args
      hook.call this, args, result

_addHook = (obj, key, hook) ->
  orig = steal obj, key, emptyFunction
  obj[key] = (args...) ->
    hook.call this, orig, args
  return
