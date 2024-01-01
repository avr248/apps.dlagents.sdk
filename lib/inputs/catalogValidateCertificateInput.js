"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const catalogValidateCertificateInput = {
  ChangeBatch: {
    Changes: [{
      Action: "UPSERT",
      ResourceRecordSet: {
        Name: "_34d0948d735df923cbefd143541c2da7.catalog.sbms.io.",
        Type: "CNAME",
        TTL: 60 * 5,
        ResourceRecords: [{
          Value: "_520cc8bacd27a837696754460654ad1a.mhbtsbpdnt.acm-validations.aws."
        }]
      }
    }]
  },
  HostedZoneId: "Z05992253AO14QYJZAYNK"
};
var _default = exports.default = catalogValidateCertificateInput;