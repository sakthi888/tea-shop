import { APIGatewayEvent } from 'aws-lambda';
import { constants } from 'http2';
import itemService from '../services/ItemService';


export const handler = async (event: APIGatewayEvent) => {
    const allItems = await itemService.getItems();
    return {
        statusCode: constants.HTTP_STATUS_OK,
        body: JSON.stringify(allItems)
    };
};