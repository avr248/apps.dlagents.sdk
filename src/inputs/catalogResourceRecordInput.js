const catalogResourceRecordInput = {
    ChangeBatch: {
        Changes: [
            {
                Action: "UPSERT",
                ResourceRecordSet: {
                    Name: "catalog.sbms.io",
                    ResourceRecords: [
                        { Value: "ns-735.awsdns-27.net" },
                        { Value: "ns-1358.awsdns-41.org" },
                        { Value: "ns-186.awsdns-23.com" },
                        { Value: "ns-1724.awsdns-23.co.uk" },
                    ],
                    TTL: 60,
                    Type: "NS",
                },
            },
        ],
        Comment: "NS for catalog.sbms.io",
    },
    HostedZoneId: "Z084849137R7K8C83QFYF",
};
export default catalogResourceRecordInput;
