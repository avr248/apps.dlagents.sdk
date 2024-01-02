import {
    CreateServiceCommand,
    RegisterTaskDefinitionCommand,
    ECSClient,
} from "@aws-sdk/client-ecs";

const ecsClient = new ECSClient({});

// catalogTaskInput
export const createTask = async (project, app, port) => {
    const response = await ecsClient.send(
        new RegisterTaskDefinitionCommand({
            family: `${project}-${app}-task`,
            taskRoleArn: "ecsTaskExecutionRole",
            executionRoleArn: "ecsTaskExecutionRole",
            networkMode: "awsvpc",
            containerDefinitions: [
                {
                    name: `${project}-${app}-container`,
                    image: `949013145064.dkr.ecr.us-east-1.amazonaws.com/${project}-${app}-container:latest`,
                    cpu: 1,
                    memory: 3,
                    memoryReservation: 1,
                    portMappings: [
                        {
                            containerPort: port,
                            protocol: "tcp",
                            name: `${project}-${app}-container-${port}-tcp`,
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

// catalogServiceInput
export const createService = async (project, app, tgid) => {
    const response = await ecsClient.send(
        new CreateServiceCommand({
            cluster: `${project}-cluster`,
            serviceName: `${project}-${app}-service`,
            taskDefinition: `${project}-${app}-task:${last}`,
            loadBalancers: [
                {
                    targetGroupArn: `arn:aws:elasticloadbalancing:us-east-1:949013145064:targetgroup/${project}-${app}-tg/${tgid}`,
                    loadBalancerName: `${project}-lb`,
                    containerName: `${project}-${app}-container`,
                    containerPort: 443,
                },
            ],
            desiredCount: 1,
            launchType: "FARGATE",
            platformFamily: "LINUX",
            role: "",
            networkConfiguration: {
                awsvpcConfiguration: {
                    // "subnet-0ed009ba424c7bd32", "subnet-073eef19cdc0e5fa7"
                    subnets: [
                        process.env.SUBNET_PRIVATE_1,
                        process.env.SUBNET_PRIVATE_2,
                    ],
                    // "sg-01ae3bc7f43f1dc30", "sg-01d56bc3c428c7995"
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

SUBNET_PRIVATE_1;
SUBNET_PRIVATE_2;
SECURITY_GROUP_1;
SECURITY_GROUP_2;
