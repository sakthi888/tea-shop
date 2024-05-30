import { APIGatewayEvent } from 'aws-lambda';
import { constants } from 'http2';
import itemService from '../services/ItemService';
import { extractItemId } from '../utils/PathParametersUtil';


export const handler = async (event: APIGatewayEvent) => {
    const itemId = extractItemId(event); // Add this line to destructure the 'id' from the event object
    const getItem = await itemService.getItem(itemId);
    return {
        statusCode: constants.HTTP_STATUS_OK,
        body: JSON.stringify(getItem)
    };
};