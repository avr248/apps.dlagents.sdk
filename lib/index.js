"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _acm = require("./clients/acm");
var _ecs = require("./clients/ecs");
var _elb = require("./clients/elb");
var _route = require("./clients/route53");
var _default = exports.default = {
  changeResourceRecordNS: _route.changeResourceRecordNS,
  changeResourceRecordCNAME: _route.changeResourceRecordCNAME,
  changeResourceRecordAalias: _route.changeResourceRecordAalias,
  describeCertificate: _acm.describeCertificate,
  createTask: _ecs.createTask,
  createService: _ecs.createService,
  createRule: _elb.createRule,
  createTargetGroup: _elb.createTargetGroup,
  createListenerCertificate: _elb.createListenerCertificate,
  createHostedZone: _route.createHostedZone,
  requestCertificate: _acm.requestCertificate
};