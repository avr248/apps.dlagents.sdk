"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateCertificate = exports.describeCertificate = exports.createTask = exports.createTargetGroup = exports.createService = exports.createRule = exports.createRouterTrafficToLB = exports.createListenerCertificate = exports.createHost = exports.createCertificate = exports.changeResourceRecord = void 0;
require("core-js/modules/es.promise.js");
var _clientEcs = require("@aws-sdk/client-ecs");
var _clientElasticLoadBalancingV = require("@aws-sdk/client-elastic-load-balancing-v2");
var _clientRoute = require("@aws-sdk/client-route-53");
var _clientAcm = require("@aws-sdk/client-acm");
var _catalogTaskInput = _interopRequireDefault(require("./inputs/catalogTaskInput"));
var _catalogServiceInput = _interopRequireDefault(require("./inputs/catalogServiceInput"));
var _catalogTargetGroupInput = _interopRequireDefault(require("./inputs/catalogTargetGroupInput"));
var _catalogResourceRecordInput = _interopRequireDefault(require("./inputs/catalogResourceRecordInput"));
var _catalogRequestCertificateInput = _interopRequireDefault(require("./inputs/catalogRequestCertificateInput"));
var _catalogDescribeCertificateInput = _interopRequireDefault(require("./inputs/catalogDescribeCertificateInput"));
var _catalogListenerCertificateInput = _interopRequireDefault(require("./inputs/catalogListenerCertificateInput"));
var _catalogValidateCertificateInput = _interopRequireDefault(require("./inputs/catalogValidateCertificateInput"));
var _catalogRouteTrafficToLBInput = _interopRequireDefault(require("./inputs/catalogRouteTrafficToLBInput"));
var _catalogHostInput = _interopRequireDefault(require("./inputs/catalogHostInput"));
var _catalogRuleInput = _interopRequireDefault(require("./inputs/catalogRuleInput"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ecsClient = new _clientEcs.ECSClient({});
const rooutClient = new _clientRoute.Route53Client({});
const elbClient = new _clientElasticLoadBalancingV.ElasticLoadBalancingV2Client({});
const acmClient = new _clientAcm.ACMClient({});
const createTask = async () => {
  const taskCommand = new _clientEcs.RegisterTaskDefinitionCommand(_catalogTaskInput.default);
  const response = await ecsClient.send(taskCommand);
  return response;
};
exports.createTask = createTask;
const createService = async () => {
  const serviceCommand = new _clientEcs.CreateServiceCommand(_catalogServiceInput.default);
  const response = await ecsClient.send(serviceCommand);
  return response;
};
exports.createService = createService;
const createTargetGroup = async () => {
  const tgCommand = new _clientElasticLoadBalancingV.CreateTargetGroupCommand(_catalogTargetGroupInput.default);
  const response = await elbClient.send(tgCommand);
  return response;
};
exports.createTargetGroup = createTargetGroup;
const createListenerCertificate = async () => {
  const lcCommand = new _clientElasticLoadBalancingV.AddListenerCertificatesCommand(_catalogListenerCertificateInput.default);
  const response = await elbClient.send(lcCommand);
  console.log(response);
  return response;
};
exports.createListenerCertificate = createListenerCertificate;
const createHost = async () => {
  const routeCommand = new _clientRoute.CreateHostedZoneCommand(_catalogHostInput.default);
  const response = await rooutClient.send(routeCommand);
  return response;
};
exports.createHost = createHost;
const changeResourceRecord = async () => {
  const resResCommand = new _clientRoute.ChangeResourceRecordSetsCommand(_catalogResourceRecordInput.default);
  const response = await rooutClient.send(resResCommand);
  return response;
};
exports.changeResourceRecord = changeResourceRecord;
const createRule = async () => {
  const tgCommand = new _clientElasticLoadBalancingV.CreateRuleCommand(_catalogRuleInput.default);
  const response = await elbClient.send(tgCommand);
  return response;
};
exports.createRule = createRule;
const createCertificate = async () => {
  const cerCommand = new _clientAcm.RequestCertificateCommand(_catalogRequestCertificateInput.default);
  const response = await acmClient.send(tgCommand);
  return response;
};
exports.createCertificate = createCertificate;
const describeCertificate = async () => {
  const descCommand = new _clientAcm.DescribeCertificateCommand(_catalogDescribeCertificateInput.default);
  const response = await acmClient.send(descCommand);
  return response;
};
exports.describeCertificate = describeCertificate;
const validateCertificate = async () => {
  const validateCommand = new _clientRoute.ChangeResourceRecordSetsCommand(_catalogValidateCertificateInput.default);
  const response = await rooutClient.send(validateCommand);
  return response;
};
exports.validateCertificate = validateCertificate;
const createRouterTrafficToLB = async () => {
  const trCommand = new _clientRoute.ChangeResourceRecordSetsCommand(_catalogRouteTrafficToLBInput.default);
  const response = await rooutClient.send(trCommand);
  return response;
};
exports.createRouterTrafficToLB = createRouterTrafficToLB;