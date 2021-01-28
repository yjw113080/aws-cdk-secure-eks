import * as cdk from '@aws-cdk/core';
import * as eks from '@aws-cdk/aws-eks';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as iam from '@aws-cdk/aws-iam';

export class EksStack extends cdk.Stack {
  public readonly cluster: eks.Cluster

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const role = new iam.Role(this, 'admin-role', {
      assumedBy: new iam.AccountRootPrincipal()
    })

    const vpc = new ec2.Vpc(this, 'Vpc');
    vpc.addFlowLog('eks-flow-log');

    const host = new ec2.BastionHostLinux(this, 'BastionHost', { vpc });

    const cluster = new eks.Cluster(this, 'secure-eks', {
      version: eks.KubernetesVersion.V1_18,
      vpc,
      vpcSubnets: [{ subnetType: ec2.SubnetType.PRIVATE }],
      endpointAccess: eks.EndpointAccess.PRIVATE,
      mastersRole: role
    });
    this.cluster = cluster;

    cluster.addNodegroupCapacity('extra-ng-spot', {
      minSize: 3,
      capacityType: eks.CapacityType.SPOT,
    });

    cluster.addFargateProfile('MyProfile', {
      selectors: [ { namespace: 'fargate' } ]
    });
    

  }
}

export interface EksProps extends cdk.StackProps {
  cluster: eks.Cluster
}