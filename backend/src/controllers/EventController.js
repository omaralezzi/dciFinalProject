//TODO: chance and put jwt secret in env file before pushing to heroku 

const Event = require('../models/Event')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

module.exports = {
	createEvent(req, res) {
		jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
			if (err) {
				res.statusCode(401)
			} else {
				const { title, description, price, category, date } = req.body
				const { location } = req.file

				const user = await User.findById(authData.user._id)

				if (!user) {
					return res.status(400).json({ message: 'User does not exist!' })
				}

				try {
					const event = await Event.create({
						title,
						description,
						category,
						price: parseFloat(price),
						user: authData.user._id,
						thumbnail: location,
						date
					})

					return res.json(event)
				} catch (error) {
					return res.status(400).json({ message: error })
				}
			}
		})

	},

	delete(req, res) {
		jwt.verify(req.token, process.env.JWT_SECRET, async (err) => {
			if (err) {
				res.statusCode(401)
			} else {
				const { eventId } = req.params
				try {
					await Event.findByIdAndDelete(eventId)
					return res.status(204).send()

				} catch (error) {
					return res.status(400).json({ message: 'We do have any event with the ID' })
				}
			}
		})
	}
}