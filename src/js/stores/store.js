var EventEmitter = require('events').EventEmitter;
var Dispatcher   = require('../dispatcher/dispatcher');

var Store = function(dispatcher) {
  this.__changed = false;
  this.__changeEvent = 'change';
  this.__dispatcher = dispatcher;
  this.__emitter = new EventEmitter();
  this.__dispatchToken = dispatcher.register(function(action) {
    this.__invokeOnDispatch(action);
  }.bind(this));
};

Store.prototype = {

  __emitChange: function(lol) {
    this.__changed = true;
  },

  __onDispatch: function(action) {
    console.log('Store.__onDispatch must be overridden!');
  },

  __invokeOnDispatch: function(action) {
    this.__changed = false;

    var promise = this.__onDispatch(action);
    if (!promise) return;

    promise.then(function() {
      if (this.__changed) this.__emitter.emit(this.__changeEvent);
    }.bind(this));
  },

  // Public Methods;
  addListener: function(callback) {
    return this.__emitter.addListener(this.__changeEvent, callback);
  },

  removeListener: function(callback) {
    return this.__emitter.removeListener(this.__changeEvent, callback);
  },

  getDispatchToken: function(){
    return this.__dispatchToken;
  }
};

module.exports = Store;
