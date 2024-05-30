import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LambdaConstruct } from './lambdas/LambdaConstruct';
import { ApiGatewayConstruct } from './apiGateway/ApiGatewayConstruct';
import ItemsDynamoDbTable from './dynamoDB/ItemsDynamoDbTable';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class TeaShopStack extends cdk.Stack {
  
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const itemsDynamoDbTable = new ItemsDynamoDbTable(this);
    const lambdaConstruct = new LambdaConstruct(this,itemsDynamoDbTable);
    new ApiGatewayConstruct(this, lambdaConstruct);

  }
}
