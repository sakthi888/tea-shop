import {APIGatewayEvent} from 'aws-lambda';
import {constants} from 'http2';

import itemService from '../services/ItemService';
import { ItemDto } from '../models/ItemDto';
import { JSONParse } from '../utils/JSONParse';

export const handler = async (event: APIGatewayEvent) => {
    const itemInputDto = JSONParse<ItemDto>(event.body);
    const createdItem = await itemService.createItem(itemInputDto);
    return {
        statusCode: constants.HTTP_STATUS_CREATED,
        body: JSON.stringify(createdItem)
    };
};