const Sequelize = require("sequelize")
const connectBD = new Sequelize('bd_perguntas', 'root', '1010', {
    host: 'localhost',
    dialect: 'mysql'
})
module.exports = connectBD