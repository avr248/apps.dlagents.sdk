import {
    CreateServiceCommand,
    RegisterTaskDefinitionCommand,
    ECSClient,
} from "@aws-sdk/client-ecs";
import {
    AddListenerCertificatesCommand,
    ElasticLoadBalancingV2Client,
    CreateTargetGroupCommand,
    CreateRuleCommand,
} from "@aws-sdk/client-elastic-load-balancing-v2";

import {
    ACMClient,
    RequestCertificateCommand,
    DescribeCertificateCommand,
} from "@aws-sdk/client-acm";
import catalogTaskInput from "./inputs/catalogTaskInput";
import catalogServiceInput from "./inputs/catalogServiceInput";
import catalogTargetGroupInput from "./inputs/catalogTargetGroupInput";
import catalogResourceRecordInput from "./inputs/catalogResourceRecordInput";
import catalogRequestCertificateInput from "./inputs/catalogRequestCertificateInput";
import catalogDescribeCertificateInput from "./inputs/catalogDescribeCertificateInput";
import catalogListenerCertificateInput from "./inputs/catalogListenerCertificateInput";
import catalogValidateCertificateInput from "./inputs/catalogValidateCertificateInput";
import catalogRouteTrafficToLBInput from "./inputs/catalogRouteTrafficToLBInput";
import catalogHostInput from "./inputs/catalogHostInput";
import catalogRuleInput from "./inputs/catalogRuleInput";

export const createTask = async () => {
    const taskCommand = new RegisterTaskDefinitionCommand(catalogTaskInput);
    const response = await ecsClient.send(taskCommand);
    return response;
};
export const createService = async () => {
    const serviceCommand = new CreateServiceCommand(catalogServiceInput);
    const response = await ecsClient.send(serviceCommand);
    return response;
};
export const createTargetGroup = async () => {
    const tgCommand = new CreateTargetGroupCommand(catalogTargetGroupInput);
    const response = await elbClient.send(tgCommand);
    return response;
};
export const createListenerCertificate = async () => {
    const lcCommand = new AddListenerCertificatesCommand(
        catalogListenerCertificateInput
    );
    const response = await elbClient.send(lcCommand);
    console.log(response);
    return response;
};

export const changeResourceRecord = async (input) => {
    const resResCommand = new ChangeResourceRecordSetsCommand(input);
    const response = await rooutClient.send(resResCommand);
    return response;
};
export const createRule = async (input) => {
    const response = await elbClient.send(new CreateRuleCommand(input));
    return response;
};
export const requestCertificate = async () => {
    const cerCommand = new RequestCertificateCommand(
        catalogRequestCertificateInput
    );
    const response = await acmClient.send(tgCommand);
    return response;
};
export const describeCertificate = async (input) => {
    const descCommand = new DescribeCertificateCommand(
        catalogDescribeCertificateInput
    );
    const response = await acmClient.send(descCommand);
    return response;
};
export const validateCertificate = async (input) => {
    const validateCommand = new ChangeResourceRecordSetsCommand(
        catalogValidateCertificateInput
    );
    const response = await rooutClient.send(validateCommand);
    return response;
};

import {
    Route53Client,
    CreateHostedZoneCommand,
    ChangeResourceRecordSetsCommand,
} from "@aws-sdk/client-route-53";
const rooutClient = new Route53Client({});
export const createRouterTrafficToLB = async () => {
    const trCommand = new ChangeResourceRecordSetsCommand(
        catalogRouteTrafficToLBInput
    );
    const response = await rooutClient.send(trCommand);
    return response;
};
export const createHost = async () => {
    const routeCommand = new CreateHostedZoneCommand(catalogHostInput);
    const response = await rooutClient.send(routeCommand);
    return response;
};
