import { Construct } from 'constructs';

import { NodeModulesLayer } from './NodeModuleLayer';
import { CreateItemLambda } from './CreateItemLambda';
import { IFunction } from 'aws-cdk-lib/aws-lambda';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { GetItemsLambda } from './GetItemsLambda';
import { GetItemLambda } from './GetItemLambda';
import { DeleteItemLambda } from './DeleteItemLambda';
import { UpdateItemLambda } from './UpdateItemLambda';



export class LambdaConstruct extends Construct {
    public static readonly ID = 'LambdaConstruct';

    public readonly createItemLambda: IFunction;
    public readonly getItemsLambda: IFunction;
    public readonly getItemLambda: IFunction;
    public readonly updateItemLambda: IFunction;
    public readonly deleteItemLambda: IFunction;



    constructor(scope: Construct, itemsDynamoDbTable: Table) {
        super(scope, LambdaConstruct.ID);
        const nodeModulesLayer = new NodeModulesLayer(this);

        this.createItemLambda = new CreateItemLambda(this, itemsDynamoDbTable.tableName, nodeModulesLayer);
        itemsDynamoDbTable.grantReadWriteData(this.createItemLambda);

        this.getItemsLambda = new GetItemsLambda(this, itemsDynamoDbTable.tableName, nodeModulesLayer);
        itemsDynamoDbTable.grantReadData(this.getItemsLambda);

        this.getItemLambda = new GetItemLambda(this, itemsDynamoDbTable.tableName, nodeModulesLayer);
        itemsDynamoDbTable.grantReadData(this.getItemLambda);

        this.updateItemLambda = new UpdateItemLambda(this, itemsDynamoDbTable.tableName, nodeModulesLayer);
        itemsDynamoDbTable.grantReadWriteData(this.updateItemLambda);

        this.deleteItemLambda = new DeleteItemLambda(this, itemsDynamoDbTable.tableName, nodeModulesLayer);
        itemsDynamoDbTable.grantReadWriteData(this.deleteItemLambda);

        
    }
}