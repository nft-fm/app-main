const Batch = require("../schemas/Batch.schema");
const ADMIN_ACCOUNTS = ["0xc894929862b974a616D35953c8C3E479A38D339a"];
const moment = require('moment');

// const getDaysElapsed = (startTime) => Math.floor(((Date.now() / 1000 - startTime / 1000) / 86400 ) + 1)
// const BATCH_LENGTH = 14 // Number of Days passed

const getBatchNumber = async () => {
  try {
    let batch = await Batch.find().sort({ batchId: -1 }).limit(1);
    // if (!batch || !batch.length || getDaysElapsed(batch[0].startTime) > BATCH_LENGTH) {
      console.log("getting batch num", moment().unix(), batch[0], moment().unix() > batch.endTime);
      if (!batch || !batch.length || moment().unix() > batch[0].endTime) {
      console.log("Creating new batch ! ! !", console.log(batch), batch[0])
      const batchId = batch[0] ? batch[0].batchId + 1 : 1
      const newBatch = new Batch({ batchId, startTime: moment().startOf('month').unix(), endTime: moment().startOf('month').add(1, 'M').unix()})
      await newBatch.save()
      return newBatch.batchId
    }
    return batch[0].batchId
  } catch (error) {
    throw(error)
  }
}

module.exports = {
  ADMIN_ACCOUNTS,
  getBatchNumber
}