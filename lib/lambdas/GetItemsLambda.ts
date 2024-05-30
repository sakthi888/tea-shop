import { Construct } from 'constructs';
import { ManagedPolicy, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Code, Function, LayerVersion } from 'aws-cdk-lib/aws-lambda';
import { defaultFunctionProps } from './DefaultFunctionProps';
import { resolve } from 'path';

export class GetItemsLambda extends Function {
    public static readonly ID = 'GetItemsLambda';

    constructor(scope: Construct, itemsTableName: string, layer: LayerVersion) {
        super(scope, GetItemsLambda.ID, {
            ...defaultFunctionProps,
            code: Code.fromAsset(resolve(__dirname, `../../lambdas`)),
            handler: 'handlers/GetItemsHandler.handler',
            layers: [layer],
            role: new Role(scope, `${GetItemsLambda.ID}_role`, {
                assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
                managedPolicies: [
                    ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
                ]
            }),
            
            environment:{
                ITEMS_TABLE: itemsTableName
            }
        });
    }
}