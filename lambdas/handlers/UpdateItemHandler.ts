import { APIGatewayEvent } from 'aws-lambda';
import { constants } from 'http2';
import itemService from '../services/ItemService';
import { extractItemId } from '../utils/PathParametersUtil';
import { JSONParse } from '../utils/JSONParse';
import { ItemUpdateDto } from '../models/ItemUpdateDto';

export const handler = async (event: APIGatewayEvent) => {
    const itemId = extractItemId(event); // Add this line to destructure the 'id' from the event object
    const itemInputDto = JSONParse<ItemUpdateDto>(event.body);
    const updatedItem = await itemService.updateItem(itemId, itemInputDto); // Call the updateItem method with the itemId and the updated item data
    return {
        statusCode: constants.HTTP_STATUS_OK,
        body: JSON.stringify(updatedItem)
    };
};
