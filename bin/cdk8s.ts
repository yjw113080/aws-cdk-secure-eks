#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Cdk8SStack } from '../lib/cdk8s-stack';

const app = new cdk.App();
new Cdk8SStack(app, 'Cdk8SStack');
