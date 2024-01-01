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
    Route53Client,
    CreateHostedZoneCommand,
    ChangeResourceRecordSetsCommand,
} from "@aws-sdk/client-route-53";
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

const ecsClient = new ECSClient({});
const rooutClient = new Route53Client({});
const elbClient = new ElasticLoadBalancingV2Client({});
const acmClient = new ACMClient({});

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
export const createHost = async () => {
    const routeCommand = new CreateHostedZoneCommand(catalogHostInput);
    const response = await rooutClient.send(routeCommand);
    return response;
};
export const changeResourceRecord = async () => {
    const resResCommand = new ChangeResourceRecordSetsCommand(
        catalogResourceRecordInput
    );
    const response = await rooutClient.send(resResCommand);
    return response;
};
export const createRule = async () => {
    const tgCommand = new CreateRuleCommand(catalogRuleInput);
    const response = await elbClient.send(tgCommand);
    return response;
};
export const createCertificate = async () => {
    const cerCommand = new RequestCertificateCommand(
        catalogRequestCertificateInput
    );
    const response = await acmClient.send(tgCommand);
    return response;
};
export const describeCertificate = async () => {
    const descCommand = new DescribeCertificateCommand(
        catalogDescribeCertificateInput
    );
    const response = await acmClient.send(descCommand);
    return response;
};
export const validateCertificate = async () => {
    const validateCommand = new ChangeResourceRecordSetsCommand(
        catalogValidateCertificateInput
    );
    const response = await rooutClient.send(validateCommand);
    return response;
};
export const createRouterTrafficToLB = async () => {
    const trCommand = new ChangeResourceRecordSetsCommand(
        catalogRouteTrafficToLBInput
    );
    const response = await rooutClient.send(trCommand);
    return response;
};
