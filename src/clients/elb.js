import {
    AddListenerCertificatesCommand,
    ElasticLoadBalancingV2Client,
    CreateTargetGroupCommand,
    CreateRuleCommand,
} from "@aws-sdk/client-elastic-load-balancing-v2";

const elbClient = new ElasticLoadBalancingV2Client({});

export const createTargetGroup = async (project, app) => {
    const response = await elbClient.send(
        new CreateTargetGroupCommand({
            Name: `${project}-${app}-tg`,
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
                HttpCode: "200",
            },
            TargetType: "ip",
            IpAddressType: "ipv4",
        })
    );
    return response;
};
export const createListenerCertificate = async (input) => {
    const response = await elbClient.send(
        new AddListenerCertificatesCommand(input)
    );
    return response;
};
export const createRule = async (input) => {
    const response = await elbClient.send(new CreateRuleCommand(input));
    return response;
};
