import {
    Route53Client,
    CreateHostedZoneCommand,
    ChangeResourceRecordSetsCommand,
} from "@aws-sdk/client-route-53";

const rout53Client = new Route53Client({});

export const createHostedZone = async (subDomain) => {
    const response = await rout53Client.send(
        new CreateHostedZoneCommand({
            Name: `${subDomain}.${process.env.BASE_DOMAIN}`,
            CallerReference: new Date().toString(),
            HostedZoneConfig: {
                PrivateZone: false,
            },
        })
    );
    return response;
};

export const changeResourceRecordToNS = async (
    domain,
    ns1,
    ns2,
    ns3,
    ns4,
    hzid
) => {
    const response = await rout53Client.send(
        new ChangeResourceRecordSetsCommand({
            ChangeBatch: {
                Changes: [
                    {
                        Action: "UPSERT",
                        ResourceRecordSet: {
                            Name: domain,
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
            HostedZoneId: hzid,
        })
    );
    return response;
};

// catalogResourceRecordInput
export const changeResourceRecord = async (input) => {
    const response = await rout53Client.send(
        new ChangeResourceRecordSetsCommand(input)
    );
    return response;
};

// catalogValidateCertificateInput
export const validateCertificate = async (input) => {
    const response = await rout53Client.send(
        new ChangeResourceRecordSetsCommand(input)
    );
    return response;
};
