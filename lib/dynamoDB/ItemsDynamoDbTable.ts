import { Attribute, AttributeType, Table } from "aws-cdk-lib/aws-dynamodb";
import { Aws, RemovalPolicy } from "aws-cdk-lib/core";
import { Construct } from "constructs";


export class ItemsDynamoDbTable extends Table {

    public static readonly TABLE_ID = 'Items';
    public static readonly PARTITION_KEY = 'id';

    constructor(scope: Construct) {
        super(scope, ItemsDynamoDbTable.TABLE_ID, {
            tableName: `${Aws.STACK_NAME}-Items`,
            partitionKey: {
                name: ItemsDynamoDbTable.PARTITION_KEY,
                type: AttributeType.STRING
            } as Attribute,
            removalPolicy: RemovalPolicy.DESTROY,
        });
    }
}

export default ItemsDynamoDbTable;