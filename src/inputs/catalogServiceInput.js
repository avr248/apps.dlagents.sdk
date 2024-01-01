const catalogServiceInput = {
    cluster: "sbms-cluster",
    serviceName: "sbms-catalog-service",
    taskDefinition: "app-catalog-task:4",
    loadBalancers: [
        {
            targetGroupArn:
                "arn:aws:elasticloadbalancing:us-east-1:949013145064:targetgroup/app-catalog-sbms-tg/fb897391f5564455",
            loadBalancerName: "sbms-lb",
            containerName: "app-sbms",
            containerPort: 443,
        },
    ],
    desiredCount: 1,
    launchType: "FARGATE",
    platformFamily: "LINUX",
    role: "",
    networkConfiguration: {
        awsvpcConfiguration: {
            subnets: ["subnet-0ed009ba424c7bd32", "subnet-073eef19cdc0e5fa7"],
            securityGroups: ["sg-01ae3bc7f43f1dc30", "sg-01d56bc3c428c7995"],
            assignPublicIp: "ENABLED",
        },
    },
    healthCheckGracePeriodSeconds: 0,
    schedulingStrategy: "REPLICA",
    deploymentController: {
        type: "CODE_DEPLOY",
    },
    enableECSManagedTags: true,
    propagateTags: "SERVICE",
};
export default catalogServiceInput;
