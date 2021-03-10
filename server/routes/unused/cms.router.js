const express = require('express')
const router = express.Router()
const Question = require('../../schemas/unused/DailyQuestion.schema')
const Battle = require('../../schemas/Battle.schema')
const PersBattle = require('../../schemas/unused/PersBattle.schema')
const Market = require('../../schemas/unused/Market.schema')
const passport = require('../../modules/passport')
const { rejectUnauthenticated } = require('../../middleware/authentication-middleware')

function getDay() {
	let day = Math.floor(((Date.now() / 1000 - 1601406000) / 86400) + 1)
	return day
}

router.post('/login', passport.authenticate('local', { failureRedirect: '/ho' }), (req, res) => {
	res.sendStatus(201)
})

// router.get('/day', rejectUnauthenticated, async (req, res) => {
// 	let day = getDay();
// 	res.send(day);
// })

router.get('/day', rejectUnauthenticated, async (req, res) => {
	try {
		let day = JSON.stringify(getDay());
		console.log("day", day);

		res.send(day)
	} catch (error) {
		console.log(error);

		res.status(500).send('error retrieving info')
	}
})

router.get('/schedule', rejectUnauthenticated, async (req, res) => {
	try {
		let day = getDay()

		let battles = await Battle.find({ finished: false, day: { $gte: day } }).sort({ day: 1 })
		res.send(battles)
	} catch (error) {
		console.log(error);

		res.status(500).send('error retrieving info')
	}
})


router.post('/new-battle', rejectUnauthenticated, async (req, res) => {
	if (req.body.day <= getDay()) {
		res.sendStatus(403)
		return
	}
	try {
		let newBattle = new Battle({
			day: req.body.day,
			pool1: {
				name: req.body.pool1
			},
			pool2: {
				name: req.body.pool2
			},
			season: process.env.SEASON,
			usesPercentChange: true,
		})
		await newBattle.save()
		res.redirect('/cms/schedule')
	} catch (error) {
		console.log(error);
		res.status(500).send("server error")
	}
})

router.post('/delete-battle', rejectUnauthenticated, async (req, res) => {
	try {
		let day = getDay()
		await Battle.deleteOne({ _id: req.body.id, day: { $gte: day } })
		res.redirect('/cms/schedule')
	} catch (error) {
		console.log(error);
		res.sendStatus(500)
	}
})

// personality battles 

router.get('/pers-schedule', rejectUnauthenticated, async (req, res) => {
	try {
		let day = getDay()

		let battles = await PersBattle.find({ finished: false, day: { $gte: day } }).sort({ day: 1 })
		res.send(battles)
	} catch (error) {
		console.log(error);

		res.status(500).send('error retrieving info')
	}
})


router.post('/new-pers-battle', rejectUnauthenticated, async (req, res) => {
	if (req.body.day <= getDay()) {
		res.sendStatus(403)
		return
	}
	try {
		let newBattle = new PersBattle({
			day: req.body.day,
			pool1: {
				name: req.body.pool1
			},
			pool2: {
				name: req.body.pool2
			},
			season: process.env.SEASON,
		})
		await newBattle.save()
		res.redirect('/cms/pers-schedule')
	} catch (error) {
		console.log(error);
		res.status(500).send("server error")
	}
})

router.post('/delete-pers-battle', rejectUnauthenticated, async (req, res) => {
	try {
		let day = getDay()
		await PersBattle.deleteOne({ _id: req.body.id, day: { $gte: day } })
		res.redirect('/cms/pers-schedule')
	} catch (error) {
		console.log(error);
		res.sendStatus(500)
	}
})

// questions

router.get('/questions', rejectUnauthenticated, async (req, res) => {
	try {
		let day = getDay()

		let questions = await Question.find({ day: { $gte: day } })
		res.send(questions)
	} catch (error) {
		console.log(error);

		res.status(500).send('error retrieving info')
	}
})

router.get('/questionResults', rejectUnauthenticated, async (req, res) => {
	try {
		let day = getDay()

		let questions = await Question.find({ day: { $lte: day } })
		res.send(questions)
	} catch (error) {
		console.log(error);

		res.status(500).send('error retrieving info')
	}
})


router.post('/new-question', rejectUnauthenticated, async (req, res) => {
	try {
		let newQuestion = new Question({
			day: req.body.day,
			description: req.body.description,
			link: {
				text: req.body.linkText,
				url: req.body.linkURL
			},
			options: [
				{ name: 'yes' },
				{ name: 'no' }
			],
			season: 2,
		})
		await newQuestion.save()
		res.redirect('/cms/questions')
	} catch (error) {
		console.log(error);
		res.status(500).send("server error")
	}
})

router.post('/delete-question', rejectUnauthenticated, async (req, res) => {
	try {
		await Question.deleteOne({ _id: req.body.id })
		res.redirect('/cms/questions')
	} catch (error) {
		console.log(error);
		res.sendStatus(500)
	}
})

//markets

router.get('/markets-schedule', rejectUnauthenticated, async (req, res) => {
	try {
		let futureMarkets = await Market.find()
		res.send(futureMarkets)
	} catch (error) {
		console.log(error);

		res.status(500).send('error retrieving info')
	}
})


router.post('/new-market', rejectUnauthenticated, async (req, res) => {
	try {
		let newBattle = new Market({
			pool1: {
				name: req.body.pool1.name,
				graphic: req.body.pool1.graphic,
				icon: req.body.pool1.icon
			},
			pool2: {
				name: req.body.pool2.name,
				graphic: req.body.pool2.graphic,
				icon: req.body.pool2.icon
			},
			description: req.body.description,
			resolution: req.body.resolution,
			background: req.body.background,
			styles: req.body.styles,
			primary: req.body.primary,
			battleType: req.body.battleType,
			bettingStart: req.body.bettingStart,
			bettingEnd: req.body.bettingEnd,
			battleEnd: req.body.battleEnd,
		})
		await newBattle.save()
		res.redirect('/cms/markets-schedule')
	} catch (error) {
		console.log(error);
		res.status(500).send("server error")
	}
})

router.post('/delete-market', rejectUnauthenticated, async (req, res) => {
	try {
		await Market.deleteOne({ _id: req.body.id })
		res.redirect('/cms/markets-schedule')
	} catch (error) {
		console.log(error);
		res.sendStatus(500)
	}
})

module.exports = router