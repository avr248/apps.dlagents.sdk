"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const catalogTargetGroupInput = {
  Name: "app-catalog-sbms-tg",
  Protocol: "HTTP",
  ProtocolVersion: "HTTP1",
  Port: 80,
  VpcId: "vpc-0a7f48f9527ca10ab",
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
};
var _default = exports.default = catalogTargetGroupInput;