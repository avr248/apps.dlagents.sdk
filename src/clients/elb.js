import {
    AddListenerCertificatesCommand,
    ElasticLoadBalancingV2Client,
    CreateTargetGroupCommand,
    CreateRuleCommand,
} from "@aws-sdk/client-elastic-load-balancing-v2";
const elbClient = new ElasticLoadBalancingV2Client({});
export const createTargetGroup = async () => {
    const response = await elbClient.send(
        new CreateTargetGroupCommand({
            Name: `${process.env.APP_NAME}-${process.env.PROJECT_NAME}-tg`,
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
export const createListenerCertificate = async (listenerid, certid) => {
    const response = await elbClient.send(
        new AddListenerCertificatesCommand({
            ListenerArn: `arn:aws:elasticloadbalancing:${process.env.REGION}:${process.env.ACCOUNT_ID}:listener/app/${process.env.PROJECT_NAME}-lb/${process.env.LOAD_BALANCE_ID}/${listenerid}`,
            Certificates: [
                {
                    CertificateArn: `arn:aws:acm:${process.env.REGION}:${process.env.ACCOUNT_ID}:certificate/${certid}`,
                },
            ],
        })
    );
    return response;
};
export const createRule = async (tgid, listenerid) => {
    const response = await elbClient.send(
        new CreateRuleCommand({
            Actions: [
                {
                    TargetGroupArn: `arn:aws:elasticloadbalancing:${process.env.REGION}:${process.env.ACCOUNT_ID}:targetgroup/${process.env.APP_NAME}-${process.env.PROJECT_NAME}-tg/${tgid}`,
                    Type: "forward",
                },
            ],
            Conditions: [
                {
                    Field: "host-header",
                    Values: [
                        `${process.env.APP_NAME}.${process.env.PROJECT_NAME}.io`,
                    ],
                },
            ],
            ListenerArn: `arn:aws:elasticloadbalancing:${process.env.REGION}:${process.env.ACCOUNT_ID}:listener/app/${process.env.PROJECT_NAME}-lb/${process.env.LOAD_BALANCE_ID}/${listenerid}`,
            Priority: 10,
        })
    );
    return response;
};
