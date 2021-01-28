import * as cdk from '@aws-cdk/core';
import * as eks from '@aws-cdk/aws-eks';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as iam from '@aws-cdk/aws-iam';
import { EksProps } from './eks-stack';

export class Cdk8SStack extends cdk.Stack {

    constructor(scope: cdk.Construct, id: string, props: EksProps) {
        super(scope, id, props);
        const cluster = props.cluster;

        // metrics-server

        // cluster-autoscaler

        // Cloudwatch agent & FluentBit for Monitoring and Logging

        // gatekeeper
        props.cluster.addHelmChart('gatekeeper', {
            repository: 'https://open-policy-agent.github.io/gatekeeper/charts',
            chart: 'gatekeeper'
        })

    }
}


