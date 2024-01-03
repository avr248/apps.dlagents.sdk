import { requestCertificate, describeCertificate } from "./clients/acm";
import { createTask, createService } from "./clients/ecs";
import {
    createRule,
    createTargetGroup,
    createListenerCertificate,
} from "./clients/elb";
import {
    createHostedZone,
    changeResourceRecordNS,
    changeResourceRecordCNAME,
    changeResourceRecordAalias,
} from "./clients/route53";

export default {
    changeResourceRecordNS,
    changeResourceRecordCNAME,
    changeResourceRecordAalias,
    describeCertificate,
    createTask,
    createService,
    createRule,
    createTargetGroup,
    createListenerCertificate,
    createHostedZone,
    requestCertificate,
};
