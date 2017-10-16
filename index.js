'use strict';

var wrappers = require('pouchdb-wrappers');

var globalOptions = {};
var wrapper = function (original, args) {
  Object.assign(args.options, globalOptions);
  return original();
};

var wrapperApi = {};
wrapperApi.destroy = wrapper;
wrapperApi.put = wrapper;
wrapperApi.post = wrapper;
wrapperApi.get = wrapper;
wrapperApi.remove = wrapper;
wrapperApi.bulkDocs = wrapper;
wrapperApi.allDocs = wrapper;
wrapperApi.changes = wrapper;
wrapperApi.sync = wrapper;
wrapperApi["replicate.from"] = wrapper;
wrapperApi["replicate.to"] = wrapper;
wrapperApi.putAttachment = wrapper;
wrapperApi.getAttachment = wrapper;
wrapperApi.removeAttachment = wrapper;
wrapperApi.query = wrapper;
wrapperApi.viewCleanup = wrapper;
wrapperApi.info = wrapper;
wrapperApi.compact = wrapper;
wrapperApi.revsDiff = wrapper;

exports.setGlobalOptions = function (options) {
  globalOptions = Object.assign({}, options);
};

exports.installGlobalOptionsMethods = function () {
  try {
    wrappers.installWrapperMethods(this, wrapperApi);
  } catch (err) {
    throw new Error("Global options methods already installed.");
  }
};

exports.uninstallGlobalOptionsMethods = function () {
  try {
    wrappers.uninstallWrapperMethods(this, wrapperApi);
  } catch (err) {
    throw new Error("Global options methods not installed.");
  }
};
