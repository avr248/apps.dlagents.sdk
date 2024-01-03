import {
    Route53Client,
    CreateHostedZoneCommand,
    ChangeResourceRecordSetsCommand,
} from "@aws-sdk/client-route-53";

const rout53Client = new Route53Client({});

export const createHostedZone = async () => {
    const response = await rout53Client.send(
        new CreateHostedZoneCommand({
            Name: `${process.env.APP_NAME}.${process.env.PROJECT_NAME}.io`,
            CallerReference: new Date().toString(),
            HostedZoneConfig: {
                PrivateZone: false,
            },
        })
    );
    return response;
};

export const changeResourceRecordNS = async ({ ns1, ns2, ns3, ns4 }) => {
    const response = await rout53Client.send(
        new ChangeResourceRecordSetsCommand({
            ChangeBatch: {
                Changes: [
                    {
                        Action: "UPSERT",
                        ResourceRecordSet: {
                            Name: `${process.env.APP_NAME}.${process.env.PROJECT_NAME}.io`,
                            ResourceRecords: [
                                { Value: ns1 },
                                { Value: ns2 },
                                { Value: ns3 },
                                { Value: ns4 },
                            ],
                            TTL: 60,
                            Type: "NS",
                        },
                    },
                ],
                Comment: "NS for catalog.sbms.io",
            },
            HostedZoneId: process.env.HOSTED_ZONE_ID,
        })
    );
    return response;
};

export const changeResourceRecordCNAME = async (name, value) => {
    const response = await rout53Client.send(
        new ChangeResourceRecordSetsCommand({
            ChangeBatch: {
                Changes: [
                    {
                        Action: "UPSERT",
                        ResourceRecordSet: {
                            Name: name,
                            Type: "CNAME",
                            TTL: 60 * 5,
                            ResourceRecords: [
                                {
                                    Value: value,
                                },
                            ],
                        },
                    },
                ],
            },
            HostedZoneId: process.env.HOSTED_ZONE_ID,
        })
    );
    return response;
};

export const changeResourceRecordAalias = async (recordHostedZone) => {
    const response = await rout53Client.send(
        new ChangeResourceRecordSetsCommand({
            ChangeBatch: {
                Changes: [
                    {
                        Action: "CREATE",
                        ResourceRecordSet: {
                            Name: `${process.env.APP_NAME}.${process.env.PROJECT_NAME}.io`,
                            Type: "A",
                            AliasTarget: {
                                DNSName: process.env.LOAD_BALANCE_DNS,
                                EvaluateTargetHealth: false,
                                HostedZoneId: recordHostedZone,
                            },
                        },
                    },
                ],
                Comment: "LB distribution for catalog.sbms.io",
            },
            HostedZoneId: process.env.HOSTED_ZONE_ID,
        })
    );
    return response;
};
