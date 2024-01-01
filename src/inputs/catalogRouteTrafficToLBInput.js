const catalogRouteTrafficToLBInput = {
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
export default catalogRouteTrafficToLBInput;
