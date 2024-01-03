"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTargetGroup = exports.createRule = exports.createListenerCertificate = void 0;
require("core-js/modules/es.promise.js");
var _clientElasticLoadBalancingV = require("@aws-sdk/client-elastic-load-balancing-v2");
const elbClient = new _clientElasticLoadBalancingV.ElasticLoadBalancingV2Client({});
const createTargetGroup = async () => {
  const response = await elbClient.send(new _clientElasticLoadBalancingV.CreateTargetGroupCommand({
    Name: "".concat(process.env.APP_NAME, "-").concat(process.env.PROJECT_NAME, "-tg"),
    Protocol: "HTTP",
    ProtocolVersion: "HTTP1",
    Port: 80,
    VpcId: process.env.VPC_ID,
    HealthCheckProtocol: "HTTP",
    HealthCheckPort: "80",
    HealthCheckEnabled: true || false,
    HealthCheckPath: "/",
    HealthCheckIntervalSeconds: 30,
    HealthCheckTimeoutSeconds: 5,
    HealthyThresholdCount: 5,
    UnhealthyThresholdCount: 2,
    Matcher: {
      HttpCode: "200"
    },
    TargetType: "ip",
    IpAddressType: "ipv4"
  }));
  return response;
};
exports.createTargetGroup = createTargetGroup;
const createListenerCertificate = async (listenerid, certid) => {
  const response = await elbClient.send(new _clientElasticLoadBalancingV.AddListenerCertificatesCommand({
    ListenerArn: "arn:aws:elasticloadbalancing:".concat(process.env.REGION, ":").concat(process.env.ACCOUNT_ID, ":listener/app/").concat(process.env.PROJECT_NAME, "-lb/").concat(process.env.LOAD_BALANCE_ID, "/").concat(listenerid),
    Certificates: [{
      CertificateArn: "arn:aws:acm:".concat(process.env.REGION, ":").concat(process.env.ACCOUNT_ID, ":certificate/").concat(certid)
    }]
  }));
  return response;
};
exports.createListenerCertificate = createListenerCertificate;
const createRule = async (tgid, listenerid) => {
  const response = await elbClient.send(new _clientElasticLoadBalancingV.CreateRuleCommand({
    Actions: [{
      TargetGroupArn: "arn:aws:elasticloadbalancing:".concat(process.env.REGION, ":").concat(process.env.ACCOUNT_ID, ":targetgroup/").concat(process.env.APP_NAME, "-").concat(process.env.PROJECT_NAME, "-tg/").concat(tgid),
      Type: "forward"
    }],
    Conditions: [{
      Field: "host-header",
      Values: ["".concat(process.env.APP_NAME, ".").concat(process.env.PROJECT_NAME, ".io")]
    }],
    ListenerArn: "arn:aws:elasticloadbalancing:".concat(process.env.REGION, ":").concat(process.env.ACCOUNT_ID, ":listener/app/").concat(process.env.PROJECT_NAME, "-lb/").concat(process.env.LOAD_BALANCE_ID, "/").concat(listenerid),
    Priority: 10
  }));
  return response;
};
exports.createRule = createRule;