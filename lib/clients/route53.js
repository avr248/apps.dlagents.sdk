"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHostedZone = exports.changeResourceRecordNS = exports.changeResourceRecordCNAME = exports.changeResourceRecordAalias = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.to-string.js");
var _clientRoute = require("@aws-sdk/client-route-53");
const rout53Client = new _clientRoute.Route53Client({});
const createHostedZone = async domain => {
  const response = await rout53Client.send(new _clientRoute.CreateHostedZoneCommand({
    Name: domain,
    CallerReference: new Date().toString(),
    HostedZoneConfig: {
      PrivateZone: false
    }
  }));
  return response;
};
exports.createHostedZone = createHostedZone;
const changeResourceRecordNS = async _ref => {
  let {
    ns1,
    ns2,
    ns3,
    ns4
  } = _ref;
  const response = await rout53Client.send(new _clientRoute.ChangeResourceRecordSetsCommand({
    ChangeBatch: {
      Changes: [{
        Action: "UPSERT",
        ResourceRecordSet: {
          Name: "".concat(process.env.APP_NAME, ".").concat(process.env.PROJECT_NAME, ".io"),
          ResourceRecords: [{
            Value: ns1
          }, {
            Value: ns2
          }, {
            Value: ns3
          }, {
            Value: ns4
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
            DNSName: process.env.LOAD_BALANCE_DNS,
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