import {DocumentClient} from 'aws-sdk/clients/dynamodb';
import { ItemDto } from "../models/ItemDto";
import { v4 } from "uuid";
import { ItemUpdateDto } from "../models/ItemUpdateDto";
const documentClient = new DocumentClient();


export class ItemService {
    public async createItem(item : ItemUpdateDto): Promise<ItemDto>{

        const newItem = {
            id: v4(),
            ...item
        };
        const params = {
            TableName: process.env.ITEMS_TABLE || '',
            Item: newItem
        };
        await documentClient.put(params).promise().catch(e => {
            console.error('Create ITEM failed', e);
            throw new Error('Create ITEM failed');
        });
        
        return newItem;

    }

    
  public async getItems(): Promise<ItemDto[]> {
    const params = {
      TableName: process.env.ITEMS_TABLE || '',
    };
    const data = await documentClient.scan(params).promise();
    return data.Items as ItemDto[];
  }

  public async getItem(id: string): Promise<ItemDto> {
    const params = {
      TableName: process.env.ITEMS_TABLE || '',
      Key: {
        id,
      },
    };
    const data = await documentClient.get(params).promise();
    return data.Item as ItemDto;
  }

  public async updateItem(id: string, item: ItemUpdateDto): Promise<ItemDto> {
    const params = {
      TableName: process.env.ITEMS_TABLE || '',
      Key: {
        id,
      },
      UpdateExpression: 'set #name = :name, #quantity = :quantity',
      ExpressionAttributeNames: {
        '#name': 'name',
        '#quantity': 'quantity',
      },
      ExpressionAttributeValues: {
        ':name': item.name,
        ':quantity': item.quantity,
      },
      ReturnValues: 'ALL_NEW',
    };
    const data = await documentClient.update(params).promise();
    return data.Attributes as ItemDto;
  }

  public async deleteItem(id: string): Promise<void> {
    const params = {
      TableName: process.env.ITEMS_TABLE || '',
      Key: {
        id,
      },
    };
    await documentClient.delete(params).promise();
  }
  
}


export default new ItemService();