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
            VpcId: process.env.VPC_ID,
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
        new AddListenerCertificatesCommand({
            ListenerArn:
                "arn:aws:elasticloadbalancing:us-east-1:949013145064:listener/app/sbms-lb/74e5cb933b0587c9/542603f912e0ed6f",
            Certificates: [
                {
                    CertificateArn:
                        "arn:aws:acm:us-east-1:949013145064:certificate/3bbc6a98-5dbd-4456-8990-f8cee4a52c89",
                },
            ],
        })
    );
    return response;
};
export const createRule = async (input) => {
    const response = await elbClient.send(
        new CreateRuleCommand({
            Actions: [
                {
                    TargetGroupArn:
                        "arn:aws:elasticloadbalancing:us-east-1:949013145064:targetgroup/app-catalog-sbms-tg/fb897391f5564455",
                    Type: "forward",
                },
            ],
            Conditions: [
                {
                    Field: "host-header",
                    Values: ["catalog.sbms.io"],
                },
            ],
            ListenerArn:
                "arn:aws:elasticloadbalancing:us-east-1:949013145064:listener/app/sbms-lb/74e5cb933b0587c9/542603f912e0ed6f",
            Priority: 10,
        })
    );
    return response;
};
