const catalogRuleInput = {
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
export default catalogRuleInput;
