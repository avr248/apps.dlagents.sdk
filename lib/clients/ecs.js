"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTask = exports.createService = void 0;
require("core-js/modules/es.promise.js");
var _clientEcs = require("@aws-sdk/client-ecs");
const ecsClient = new _clientEcs.ECSClient({});
const createTask = async () => {
  const response = await ecsClient.send(new _clientEcs.RegisterTaskDefinitionCommand({
    family: "".concat(process.env.APP_NAME, "-").concat(process.env.PROJECT_NAME, "-task"),
    taskRoleArn: "ecsTaskExecutionRole",
    executionRoleArn: "ecsTaskExecutionRole",
    networkMode: "awsvpc",
    containerDefinitions: [{
      name: "".concat(process.env.APP_NAME, "-").concat(process.env.PROJECT_NAME, "-container"),
      image: "".concat(process.env.ACCOUNT_ID, ".dkr.ecr.").concat(process.env.REGION, ".amazonaws.com/").concat(process.env.APP_NAME, "-").concat(process.env.PROJECT_NAME, "-container:latest"),
      cpu: 1,
      memory: 3,
      memoryReservation: 1,
      portMappings: [{
        containerPort: process.env.APP_PORT,
        protocol: "tcp",
        name: "".concat(process.env.APP_NAME, "-").concat(process.env.PROJECT_NAME, "-container-").concat(process.env.APP_PORT, "-tcp"),
        appProtocol: "http"
      }]
    }],
    requiresCompatibilities: ["FARGATE"],
    cpu: "1 vCPU",
    memory: "3 GB"
  }));
  return response;
};
exports.createTask = createTask;
const createService = async tgid => {
  const response = await ecsClient.send(new _clientEcs.CreateServiceCommand({
    cluster: "".concat(process.env.PROJECT_NAME, "-cluster"),
    serviceName: "".concat(process.env.APP_NAME, "-").concat(process.env.PROJECT_NAME, "-service"),
    taskDefinition: "".concat(process.env.APP_NAME, "-").concat(process.env.PROJECT_NAME, "-task:").concat(last),
    loadBalancers: [{
      targetGroupArn: "arn:aws:elasticloadbalancing:".concat(process.env.REGION, ":").concat(process.env.ACCOUNT_ID, ":targetgroup/").concat(process.env.APP_NAME, "-").concat(process.env.PROJECT_NAME, "-tg/").concat(tgid),
      loadBalancerName: "".concat(process.env.PROJECT_NAME, "-lb"),
      containerName: "".concat(process.env.APP_NAME, "-").concat(process.env.PROJECT_NAME, "-container"),
      containerPort: 443
    }],
    desiredCount: 1,
    launchType: "FARGATE",
    platformFamily: "LINUX",
    role: "",
    networkConfiguration: {
      awsvpcConfiguration: {
        subnets: [process.env.SUBNET_PRIVATE_1, process.env.SUBNET_PRIVATE_2],
        securityGroups: [process.env.SECURITY_GROUP_1, process.env.SECURITY_GROUP_2],
        assignPublicIp: "ENABLED"
      }
    },
    healthCheckGracePeriodSeconds: 0,
    schedulingStrategy: "REPLICA",
    deploymentController: {
      type: "CODE_DEPLOY"
    },
    enableECSManagedTags: true,
    propagateTags: "SERVICE"
  }));
  return response;
};
exports.createService = createService;