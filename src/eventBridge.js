const { EventBridgeClient, PutEventsCommand } = require("@aws-sdk/client-eventbridge");

const put = async (source, detailType, detail, eventBusName) => {
    try {
        const client = new EventBridgeClient({});
        const input = {
            Entries: [
                {
                    Source: source,
                    DetailType: detailType,
                    Detail: JSON.stringify(detail),
                    EventBusName: eventBusName,
                },
            ],
        };

        const command = new PutEventsCommand(input);
        const response = await client.send(command);
        return response;
    } catch (error) {
        throw error
    }
}

module.exports = { put }