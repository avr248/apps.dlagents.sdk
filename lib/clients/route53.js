"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHostedZone = exports.changeResourceRecordNS = exports.changeResourceRecordCNAME = exports.changeResourceRecordAalias = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.to-string.js");
var _clientRoute = require("@aws-sdk/client-route-53");
const rout53Client = new _clientRoute.Route53Client({});
const createHostedZone = async () => {
  const response = await rout53Client.send(new _clientRoute.CreateHostedZoneCommand({
    Name: "".concat(process.env.APP_NAME, ".").concat(process.env.PROJECT_NAME, ".io"),
    CallerReference: new Date().toString(),
    HostedZoneConfig: {
      PrivateZone: false
    }
  }));
  return response;
};
exports.createHostedZone = createHostedZone;
const changeResourceRecordNS = async () => {
  const response = await rout53Client.send(new _clientRoute.ChangeResourceRecordSetsCommand({
    ChangeBatch: {
      Changes: [{
        Action: "UPSERT",
        ResourceRecordSet: {
          Name: "".concat(process.env.APP_NAME, ".").concat(process.env.PROJECT_NAME, ".io"),
          ResourceRecords: [{
            Value: process.env.NS1
          }, {
            Value: process.env.NS2
          }, {
            Value: process.env.NS3
          }, {
            Value: process.env.NS4
          }],
          TTL: 60,
          Type: "NS"
        }
      }],
      Comment: "NS for catalog.sbms.io"
    },
    HostedZoneId: process.env.HOSTED_ZONE_ID
  }));
  return response;
};
exports.changeResourceRecordNS = changeResourceRecordNS;
const changeResourceRecordCNAME = async (name, value) => {
  const response = await rout53Client.send(new _clientRoute.ChangeResourceRecordSetsCommand({
    ChangeBatch: {
      Changes: [{
        Action: "UPSERT",
        ResourceRecordSet: {
          Name: name,
          Type: "CNAME",
          TTL: 60 * 5,
          ResourceRecords: [{
            Value: value
          }]
        }
      }]
    },
    HostedZoneId: process.env.HOSTED_ZONE_ID
  }));
  return response;
};
exports.changeResourceRecordCNAME = changeResourceRecordCNAME;
const changeResourceRecordAalias = async recordHostedZone => {
  const response = await rout53Client.send(new _clientRoute.ChangeResourceRecordSetsCommand({
    ChangeBatch: {
      Changes: [{
        Action: "CREATE",
        ResourceRecordSet: {
          Name: "".concat(process.env.APP_NAME, ".").concat(process.env.PROJECT_NAME, ".io"),
          Type: "A",
          AliasTarget: {
            DNSName: process.env.LOAD_BALACER,
            EvaluateTargetHealth: false,
            HostedZoneId: recordHostedZone
          }
        }
      }],
      Comment: "LB distribution for catalog.sbms.io"
    },
    HostedZoneId: process.env.HOSTED_ZONE_ID
  }));
  return response;
};
exports.changeResourceRecordAalias = changeResourceRecordAalias;