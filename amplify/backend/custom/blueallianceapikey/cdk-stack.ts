import * as cdk from '@aws-cdk/core';
import * as secretsmanager from '@aws-cdk/aws-secretsmanager'
import * as iam from '@aws-cdk/aws-iam'
import * as AmplifyHelpers from '@aws-amplify/cli-extensibility-helper';
//import { AmplifyDependentResourcesAttributes } from '../../types/amplify-dependent-resources-ref';
//import * as iam from '@aws-cdk/aws-iam';
//import * as sns from '@aws-cdk/aws-sns';
//import * as subs from '@aws-cdk/aws-sns-subscriptions';
//import * as sqs from '@aws-cdk/aws-sqs';

export class cdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps, amplifyResourceProps?: AmplifyHelpers.AmplifyResourceProps) {
    super(scope, id, props);
    /* Do not remove - Amplify CLI automatically injects the current deployment environment in this input parameter */
    new cdk.CfnParameter(this, 'env', {
      type: 'String',
      description: 'Current Amplify CLI env name',
    });
    /* AWS CDK code goes here - learn more: https://docs.aws.amazon.com/cdk/latest/guide/home.html */
    //const dependencies: AmplifyDependentResourcesAttributes = AmplifyHelpers.addResourceDependency(this,
    //  amplifyResourceProps.category,
    //  amplifyResourceProps.resourceName,
    //  [{
    //    category: "auth", // api, auth, storage, function, etc.
    //    resourceName: "scoutingapp202345f469a1" // find the resource at "amplify/backend/<category>/<resourceName>"
    //  } /* add more dependencies as needed */] 
    //);
    const env = AmplifyHelpers.getProjectInfo().envName
    let authRole : iam.IRole
    if(env === 'prod') {
      authRole = iam.Role.fromRoleArn(this, "role-prod", "arn:aws:iam::187619627858:role/amplify-scoutingapp2023-main-102414-authRole")

    }
    else {
      authRole = iam.Role.fromRoleArn(this, "role-dev", "arn:aws:iam::187619627858:role/amplify-scoutingapp2023-dev-171957-authRole")
    }
    const secret = new secretsmanager.Secret(this, 'blueallianceapi', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      secretName: `bluealliance-apikey-${cdk.Fn.ref('env')}`
    }) 
    secret.grantRead(authRole)

    // Example 1: Set up an SQS queue with an SNS topic 

    /*
    const amplifyProjectInfo = AmplifyHelpers.getProjectInfo();
    const sqsQueueResourceNamePrefix = `sqs-queue-${amplifyProjectInfo.projectName}`;
    const queue = new sqs.Queue(this, 'sqs-queue', {
      queueName: `${sqsQueueResourceNamePrefix}-${cdk.Fn.ref('env')}`
    });
    // 👇create sns topic

    const snsTopicResourceNamePrefix = `sns-topic-${amplifyProjectInfo.projectName}`;
    const topic = new sns.Topic(this, 'sns-topic', {
      topicName: `${snsTopicResourceNamePrefix}-${cdk.Fn.ref('env')}`
    });
    // 👇 subscribe queue to topic
    topic.addSubscription(new subs.SqsSubscription(queue));
    new cdk.CfnOutput(this, 'snsTopicArn', {
      value: topic.topicArn,
      description: 'The arn of the SNS topic',
    });
    */

    // Example 2: Adding IAM role to the custom stack 
    /*
    const roleResourceNamePrefix = `CustomRole-${amplifyProjectInfo.projectName}`;
    
    const role = new iam.Role(this, 'CustomRole', {
      assumedBy: new iam.AccountRootPrincipal(),
      roleName: `${roleResourceNamePrefix}-${cdk.Fn.ref('env')}`
    }); 
    */

    // Example 3: Adding policy to the IAM role
    /*
    role.addToPolicy(
      new iam.PolicyStatement({
        actions: ['*'],
        resources: [topic.topicArn],
      }),
    );
    */

    // Access other Amplify Resources 
    /*
    const retVal:AmplifyDependentResourcesAttributes = AmplifyHelpers.addResourceDependency(this, 
      amplifyResourceProps.category, 
      amplifyResourceProps.resourceName, 
      [
        {category: <insert-amplify-category>, resourceName: <insert-amplify-resourcename>},
      ]
    );
    */
  }
}