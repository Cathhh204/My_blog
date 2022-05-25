// Full Documentation - https://docs.turbo360.co
const express = require('express')
const router = express.Router()

router.post('/user', (req, res) => {
	const body = req.body // normally comes from a POST form

	res.json({
		confirmation: 'success',
		route: 'register',
		data: body
	})
})

module.exports = router