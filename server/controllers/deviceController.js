const uuid = require('uuid') // рандомні айді для зображень, щоб не було повторень
const path = require('path'); // путь для папки зображень, який є в node.js
const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError');

class DeviceController {
	async create(req, res, next) {
		try {
			let {name, price, brandId, typeId, info} = req.body
			const {img} = req.files 
			let filename = uuid.v4() + ".jpg"
			img.mv(path.resolve(__dirname, '..', 'static', filename))
			const device = await Device.create({name, price, brandId, typeId, img: filename})

			if (info) { // перевіряємо чи додано опис
				info = JSON.parse(info) // тому що передан через FormData у формі рядків парсимо у JSON-рядок на фронті
				info.forEach(i => // вертаємо в JS об'єкт
					DeviceInfo.create({
						title: i.title,
						description: i.description,
						deviceId: device.id
					})
				)
			}

			return res.json(device)
		} catch (e) {
			next(ApiError.badRequest(e.message))
		}
		
	}

	async getAll(req, res ) {
		let {brandId, typeId, limit, page} = req.query
		page = page || 1  
		limit = limit || 9 // задано ліміт відображень на сторінку
		let offset = page * limit - limit
		let devices;
		if(!brandId && !typeId) {
			devices = await Device.findAndCountAll({limit, offset})
		}
		if(brandId && !typeId) {
			devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
		}
		if(!brandId && typeId) {
			devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
		}
		if(brandId && typeId) {
			devices = await Device.findAndCountAll({where: {typeId, brandId}, limit, offset})
		}
		return res.json(devices)
	}
	
	async getOne(req, res ) {
		const {id} = req.params // беремо з device router (getOne)
		const device = await Device.findOne(
			{
				where: {id},
				include: [{model: DeviceInfo, as: 'info'}]
			},
		)
		return res.json(device)
	}
}

module.exports = new DeviceController()