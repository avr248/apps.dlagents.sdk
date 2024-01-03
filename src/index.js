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

export class App {
    project;
    app;

    constructor(app, ext) {
        this.project = process.env.PROJECT_NAME;
        this.app = app;
        this.project_extension = ext || process.env.PROJECT_EXTENSION;
    }

    getDomain() {
        return `${this.app}.${this.project}.${this.project_extension}`;
    }

    createDomain() {
        createHostedZone(this.getDomain());
    }
}
