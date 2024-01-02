const listenerCertificate = {
    ListenerArn:
        "arn:aws:elasticloadbalancing:us-east-1:949013145064:listener/app/sbms-lb/74e5cb933b0587c9/542603f912e0ed6f",
    Certificates: [
        {
            CertificateArn:
                "arn:aws:acm:us-east-1:949013145064:certificate/3bbc6a98-5dbd-4456-8990-f8cee4a52c89",
        },
    ],
};

export const rule = {
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
};

export const targertGroup = ;
