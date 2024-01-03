"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestCertificate = exports.describeCertificate = void 0;
require("core-js/modules/es.promise.js");
var _clientAcm = require("@aws-sdk/client-acm");
const acmClient = new _clientAcm.ACMClient({});
const requestCertificate = async () => {
  const response = await acmClient.send(new _clientAcm.RequestCertificateCommand({
    DomainName: "".concat(process.env.APP_NAME, ".").concat(process.env.PROJECT_NAME, ".io"),
    ValidationMethod: "DNS",
    KeyAlgorithm: "RSA_2048"
  }));
  return response;
};
exports.requestCertificate = requestCertificate;
const describeCertificate = async certid => {
  const response = await acmClient.send(new _clientAcm.DescribeCertificateCommand({
    CertificateArn: "arn:aws:acm:".concat(process.env.REGION, ":").concat(process.env.ACCOUNT_ID, ":certificate/").concat(certid)
  }));
  return response;
};
exports.describeCertificate = describeCertificate;