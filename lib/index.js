"use strict";

require("core-js/modules/es.symbol.description.js");
var _acm = require("./clients/acm");
var _ecs = require("./clients/ecs");
var _elb = require("./clients/elb");
var _route = require("./clients/route53");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class App {
  constructor(app, ext) {
    _defineProperty(this, "project", void 0);
    _defineProperty(this, "app", void 0);
    this.project = process.env.PROJECT_NAME;
    this.app = app;
    this.project_extension = ext || process.env.PROJECT_EXTENSION;
  }
  getDomain() {
    return "".concat(this.app, ".").concat(this.project, ".").concat(this.project_extension);
  }
  createDomain() {
    (0, _route.createHostedZone)(this.getDomain());
  }
}