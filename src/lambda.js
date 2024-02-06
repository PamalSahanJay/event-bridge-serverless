'use strict';
const { statusCode } = require('./statusCode');
const EventBridge = require('./eventBridge')
const EVENT_BUS_NAME = process.env.EventBusName
const SOURCE = "fuel-app"
const DETAIL_TYPE = "user-signup"

module.exports.handler = async (event) => {
    let body = JSON.parse(event.body)

  try {
    const response = await EventBridge.put(SOURCE,DETAIL_TYPE,body,EVENT_BUS_NAME)
    return statusCode(201, response)
  } catch (error) {
    return statusCode(500, error.message)
  }

};

module.exports.processMessages = async (event) => {
  let records = event.Records;
  let batchItemFailures = [];

  if(records.length) {
    for (const record of records) {
      try {
        const parseBody = JSON.parse(record.body)
        console.log(parseBody)
        console.log("processing vehicle details ..." + parseBody.detail.vehicleNo)
        console.log("success .." + record.messageId)

        if(typeof parseBody.detail.vehicleNo !== 'string') {
          throw new Error("invalid data")
        }

      } catch (error) {
        batchItemFailures.push({
          itemIdentifier: record.messageId
        })
      }
    }
  }
  return {batchItemFailures};
}