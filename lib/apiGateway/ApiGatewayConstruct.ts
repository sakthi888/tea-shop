

import { Construct } from "constructs";
import {LambdaConstruct} from "../lambdas/LambdaConstruct";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";

export class ApiGatewayConstruct extends Construct {
    public static readonly ID = 'ItemsManagerApiGateway';

    constructor(scope: Construct, lambdas: LambdaConstruct) {
        super(scope, ApiGatewayConstruct.ID);
        const api = new RestApi(this, ApiGatewayConstruct.ID, {
            restApiName: 'tea-shop Manager API'
        })



        const itemsResource = api.root.addResource('items');
        itemsResource.addMethod('POST', new LambdaIntegration(lambdas.createItemLambda));
        itemsResource.addMethod('GET', new LambdaIntegration(lambdas.getItemsLambda));
        const itemResource = itemsResource.addResource('{itemId}');
        itemResource.addMethod('GET', new LambdaIntegration(lambdas.getItemLambda));
        itemResource.addMethod('PUT', new LambdaIntegration(lambdas.updateItemLambda));
        itemResource.addMethod('DELETE', new LambdaIntegration(lambdas.deleteItemLambda));

  
    }
}