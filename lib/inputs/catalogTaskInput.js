"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const catalogTaskInput = {
  family: "app-catalog-task",
  taskRoleArn: "ecsTaskExecutionRole",
  executionRoleArn: "ecsTaskExecutionRole",
  networkMode: "awsvpc",
  containerDefinitions: [{
    name: "app-sbms",
    image: "949013145064.dkr.ecr.us-east-1.amazonaws.com/app-sbms:f635c28",
    cpu: 1,
    memory: 3,
    memoryReservation: 1,
    portMappings: [{
      containerPort: 3000,
      protocol: "tcp",
      name: "app-sbms-3000-tcp",
      appProtocol: "http"
    }]
  }],
  requiresCompatibilities: ["FARGATE"],
  cpu: "1 vCPU",
  memory: "3 GB"
};
var _default = exports.default = catalogTaskInput;