
require "lotus-require"

emptyFunction = require "emptyFunction"

shift = Array::shift
unshift = Array::unshift

hook = (obj, key, newValue) ->
  oldValue = obj[key] or emptyFunction
  obj[key] = ->
    unshift.call arguments, oldValue
    newValue.apply this, arguments

hook.before = (obj, key, newValue) ->
  hook obj, key, ->
    oldValue = shift.call arguments
    newValue.apply this, arguments
    oldValue.apply this, arguments

hook.after = (obj, key, newValue) ->
  hook obj, key, ->
    unshift.call arguments, (shift.call arguments).apply this, arguments
    newValue.apply this, arguments

module.exports = hook
