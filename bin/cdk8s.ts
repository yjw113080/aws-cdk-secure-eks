#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { EksStack } from '../lib/eks-stack';

const app = new cdk.App();
new EksStack(app, 'EksStack');
