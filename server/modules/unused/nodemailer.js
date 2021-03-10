const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		type: "login",
		user: process.env.NODE_MAILER_USERNAME,
		pass: process.env.NODE_MAILER_PASSWORD
	}
})

const addClientToProject = (data) => {
	transporter.sendMail({
		from: process.env.NODE_MAILER_USERNAME,
		to: 'treebeard2121@pm.me',
		subject: `Todays Votes`,
		text: JSON.stringify(data)
	})
	// transporter.sendMail({
	// 	from: process.env.NODE_MAILER_USERNAME,
	// 	to: 'ezynell@gmail.com',
	// 	subject: `Todays Votes`,
	// 	text: JSON.stringify(data)
	// })
}

module.exports = addClientToProject