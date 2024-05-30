import { APIGatewayEvent } from "aws-lambda";


export const extractItemId = (event: APIGatewayEvent) => {
    if (event && event.pathParameters && event.pathParameters.itemId) {
        return event.pathParameters.itemId;
    }
    throw new Error('Missing itemId path param');
};

export default {
    extractItemId
};