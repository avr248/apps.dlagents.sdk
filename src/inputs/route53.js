export const AAlias = {
    ChangeBatch: {
        Changes: [
            {
                Action: "CREATE",
                ResourceRecordSet: {
                    Name: "catalog.sbms.io",
                    Type: "A",
                    AliasTarget: {
                        DNSName:
                            "dualstack.sbms-lb-302113835.us-east-1.elb.amazonaws.com",
                        EvaluateTargetHealth: false,
                        HostedZoneId: "Z35SXDOTRQ7X7K",
                    },
                },
            },
        ],
        Comment: "LB distribution for catalog.sbms.io",
    },
    HostedZoneId: "Z05992253AO14QYJZAYNK",
};

export const cname = {
    ChangeBatch: {
        Changes: [
            {
                Action: "UPSERT",
                ResourceRecordSet: {
                    Name: "_34d0948d735df923cbefd143541c2da7.catalog.sbms.io.",
                    Type: "CNAME",
                    TTL: 60 * 5,
                    ResourceRecords: [
                        {
                            Value: "_520cc8bacd27a837696754460654ad1a.mhbtsbpdnt.acm-validations.aws.",
                        },
                    ],
                },
            },
        ],
    },
    HostedZoneId: "Z05992253AO14QYJZAYNK",
};
