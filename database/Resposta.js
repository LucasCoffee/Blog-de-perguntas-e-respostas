const { Model } = require("sequelize");
const Sequelize = require("sequelize");
const conection = require("./database");


const Resposta = conection.define("respostas", {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: null
    },
    perguntaID : {
        type : Sequelize.INTEGER,
        allowNull: null
    }
});

Resposta.sync({force: false})

module.exports = Resposta