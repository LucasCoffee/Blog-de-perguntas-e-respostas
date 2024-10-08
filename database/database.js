const  Sequelize = require("sequelize");

const conection = new Sequelize({
    host: "localhost",
    username: "root",
    password: "1234567",
    dialect: "mysql",
    database: "guiaPerguntas",
    dialectModulo: require("mysql2"),
    benchmark: true
})

module.exports = conection

