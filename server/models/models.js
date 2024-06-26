const sequelize = require('../db')
const {DataTypes} = require('sequelize')

// формування моделей
const User = sequelize.define('user', { 
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	email: {type: DataTypes.STRING, unique: true,},
	password: {type: DataTypes.STRING},
	role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Device = sequelize.define('device', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: DataTypes.STRING, unique: true, allowNull: false},
	price: {type: DataTypes.INTEGER, allowNull: false},
	img: {type: DataTypes.STRING, allowNull: false},
})

const Type = sequelize.define('type', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Brand = sequelize.define('brand', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const DeviceInfo = sequelize.define('device_info', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	title: {type: DataTypes.STRING, allowNull: false},
	description: {type: DataTypes.STRING, allowNull: false},
})

const TypeBrand = sequelize.define('type_brand', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, // проміжня таблиця для формування ManyToMany 
})

// формування зв'язку між моделями
Type.hasMany(Device)
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Device.hasMany(DeviceInfo, {as: 'info'});
DeviceInfo.belongsTo(Device)

Type.belongsToMany(Brand, {through: TypeBrand})
Brand.belongsToMany(Type, {through: TypeBrand})

// експорт моделей для використ. в інших файлах
module.exports = {
	User, 
	Device,
	Type,
	Brand,
	TypeBrand,
	DeviceInfo
}