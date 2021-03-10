const express = require('express')
const router = express.Router()
const Market = require('../../schemas/unused/Market.schema')

function getDay() {
	let day = Math.floor(((Date.now() / 1000 - 1601406000) / 86400) + 1)
	return day
}

router.get('/get-markets', async (req, res) => {
	try {
		let activeMarkets = await Market.find()
		let pastMarkets = await Market.find({ battleEnd: { $lt: Date.now() / 1000 } })
		let futureMarkets = await Market.find({ bettingStart: { $gt: Date.now() / 1000 } })
		res.send({
			activeMarkets,
			pastMarkets,
			futureMarkets
		})
	} catch (error) {
		console.log(error);
		res.sendStatus(500)
	}
})

router.post('/get-market', async (req, res) => {
	try {
		if (req.body.id.length !== 24) {
			res.sendStatus(500)
			return
		}
		let market = await Market.findOne({ _id: req.body.id })
		res.send(market)
	} catch (error) {
		console.log(error);
		res.sendStatus(500)
	}
})

module.exports = router