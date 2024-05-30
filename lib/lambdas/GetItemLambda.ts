import { Construct } from 'constructs';
import { ManagedPolicy, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Code, Function, LayerVersion } from 'aws-cdk-lib/aws-lambda';
import { defaultFunctionProps } from './DefaultFunctionProps';
import { resolve } from 'path';

export class GetItemLambda extends Function {
    public static readonly ID = 'GetItemLambda';

    constructor(scope: Construct, itemsTableName: string, layer: LayerVersion) {
        super(scope, GetItemLambda.ID, {
            ...defaultFunctionProps,
            code: Code.fromAsset(resolve(__dirname, `../../lambdas`)),
            handler: 'handlers/GetItemHandler.handler',
            layers: [layer],
            role: new Role(scope, `${GetItemLambda.ID}_role`, {
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