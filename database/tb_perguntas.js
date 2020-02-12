const Sequelize = require("sequelize")  //importa ORM Sequelize para configurar a conexão com DB
const dbConnect = require("./database") //importa a conexão com o banco de dados

//Criando a tabela tbPerguntas
const tbPerguntas = dbConnect.define('tbPerguntas', {
    titulo : {
        type: Sequelize.STRING,
        allowNull: false
    },

    descricao : {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

//força a criação da tabela no banco
tbPerguntas.sync({force: false}).then(()=>{
    console.log('Tabela criada!')
})
module.exports = tbPerguntas