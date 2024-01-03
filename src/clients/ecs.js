import {
    CreateServiceCommand,
    RegisterTaskDefinitionCommand,
    ECSClient,
} from "@aws-sdk/client-ecs";

const ecsClient = new ECSClient({});

export const createTask = async () => {
    const response = await ecsClient.send(
        new RegisterTaskDefinitionCommand({
            family: `${process.env.APP_NAME}-${process.env.PROJECT_NAME}-task`,
            taskRoleArn: "ecsTaskExecutionRole",
            executionRoleArn: "ecsTaskExecutionRole",
            networkMode: "awsvpc",
            containerDefinitions: [
                {
                    name: `${process.env.APP_NAME}-${process.env.PROJECT_NAME}-container`,
                    image: `${process.env.ACCOUNT_ID}.dkr.ecr.${process.env.REGION}.amazonaws.com/${process.env.APP_NAME}-${process.env.PROJECT_NAME}-container:latest`,
                    cpu: 1,
                    memory: 3,
                    memoryReservation: 1,
                    portMappings: [
                        {
                            containerPort: process.env.APP_PORT,
                            protocol: "tcp",
                            name: `${process.env.APP_NAME}-${process.env.PROJECT_NAME}-container-${process.env.APP_PORT}-tcp`,
                            appProtocol: "http",
                        },
                    ],
                },
            ],
            requiresCompatibilities: ["FARGATE"],
            cpu: "1 vCPU",
            memory: "3 GB",
        })
    );
    return response;
};

export const createService = async (tgid) => {
    const response = await ecsClient.send(
        new CreateServiceCommand({
            cluster: `${process.env.PROJECT_NAME}-cluster`,
            serviceName: `${process.env.APP_NAME}-${process.env.PROJECT_NAME}-service`,
            taskDefinition: `${process.env.APP_NAME}-${process.env.PROJECT_NAME}-task:${last}`,
            loadBalancers: [
                {
                    targetGroupArn: `arn:aws:elasticloadbalancing:${process.env.REGION}:${process.env.ACCOUNT_ID}:targetgroup/${process.env.APP_NAME}-${process.env.PROJECT_NAME}-tg/${tgid}`,
                    loadBalancerName: `${process.env.PROJECT_NAME}-lb`,
                    containerName: `${process.env.APP_NAME}-${process.env.PROJECT_NAME}-container`,
                    containerPort: 443,
                },
            ],
            desiredCount: 1,
            launchType: "FARGATE",
            platformFamily: "LINUX",
            role: "",
            networkConfiguration: {
                awsvpcConfiguration: {
                    subnets: [
                        process.env.SUBNET_PRIVATE_1,
                        process.env.SUBNET_PRIVATE_2,
                    ],
                    securityGroups: [
                        process.env.SECURITY_GROUP_1,
                        process.env.SECURITY_GROUP_2,
                    ],
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
        })
    );
    return response;
};
