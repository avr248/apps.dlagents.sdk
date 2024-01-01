"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.regexp.to-string.js");
const catalogHostInput = {
  Name: "catalog.sbms.io",
  CallerReference: new Date().toString(),
  HostedZoneConfig: {
    PrivateZone: false
  }
};
var _default = exports.default = catalogHostInput;