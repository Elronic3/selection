const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')

const generateJwt = (id, email, role) => {
	return jwt.sign(
		{id, email, role},
		process.env.SECRET_KEY,
		{expiresIn: '1m'}
	)
}

class UserController {
	async registration(req, res, next) {
		const {email, password, role} = req.body
		if (!email || !password) {
			return next(ApiError.badRequest('Вказано неправильний email або пароль'))
		}
		const candidate = await User.findOne({where: {email}})
		if (candidate) {
			return next(ApiError.badRequest('Користувач з таким email вже існує'))
		}
		const hashPassword = await bcrypt.hash(password, 5)
		const user = await User.create({email, role, password: hashPassword})
		const basket = await Basket.create({userId: user.id})
		const token = generateJwt(user.id, user.email, user.role)
		return res.json({token})
	}

	async login(req, res, next) {
		const {email, password} = req.body
		const user = await User.findOne({where: {email}})
		if (!user) {
			return next(ApiError.internal('Користувач з таким емейлом не знайдено'))
		}
		let comparePassword = bcrypt.compareSync(password, user.password)
		if (!comparePassword) {
			return next(ApiError.internal('Вказано неправильний пароль'))
		}
		const token = generateJwt(user.id, user.email, user.role)
		return res.json({token})
	}

	async check(req, res) {
		const token = generateJwt(req.user.id, req.user.email, req.user.role) // якщо користувач постійно використовує свій обліковий запис, то токен буде перезаписуватись
		return res.json({token})
	}
}

module.exports = new UserController()