const Batch = require("../schemas/Batch.schema");

const ADMIN_ACCOUNTS = [
  "0xc894929862b974a616D35953c8C3E479A38D339a"
]

// const getDaysElapsed = (startTime) => Math.floor(((Date.now() / 1000 - startTime / 1000) / 86400 ) + 1)
// const BATCH_LENGTH = 14 // Number of Days passed

const getBatchNumber = async () => {
  try {
    let batch = await Batch.find().sort({ batchId: -1 }).limit(1);
    // if (!batch || !batch.length || getDaysElapsed(batch[0].startTime) > BATCH_LENGTH) {
    if (!batch || !batch.length) {
      console.log("Creating new batch ! ! !", console.log(batch), batch[0])
      const batchId = batch[0] ? batch[0].batchId + 1 : 1
      const newBatch = new Batch({ batchId, startTime: Date.now() })
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