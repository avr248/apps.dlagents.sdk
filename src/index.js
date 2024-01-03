export { requestCertificate, describeCertificate } from "./clients/acm";
export { createTask, createService } from "./clients/ecs";
export {
    createRule,
    createTargetGroup,
    createListenerCertificate,
} from "./clients/elb";
export {
    createHostedZone,
    changeResourceRecordNS,
    changeResourceRecordCNAME,
    changeResourceRecordAalias,
} from "./clients/route53";
