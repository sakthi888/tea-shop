import { Construct } from 'constructs';
import { Code, LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import { resolve } from 'path';

export class NodeModulesLayer extends LayerVersion {
    public static readonly ID = 'LambdaNodeModulesLayer';
    constructor(scope: Construct) {
        super(scope, NodeModulesLayer.ID, {
            code: Code.fromAsset(resolve(__dirname, '../../node_modules_layer')),
            compatibleRuntimes: [Runtime.NODEJS_20_X], // Use the correct Runtime constant
            description: 'Node modules lambda layer',
        });
    }
}