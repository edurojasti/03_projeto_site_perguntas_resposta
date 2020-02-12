const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const db = require("./database/database")
const tbPerguntas = require("./database/tb_perguntas") //model table perguntas

//Configuração da conexão do banco de dados
function configBD(){
    db.authenticate().then(()=>{
        console.log("Conexão com o banco de dados com sucesso!")
    }).catch((msgError)=>{
        console.log(msgError)
    })
}

//Config EJS
function configEJS(){
    app.set("view engine", "ejs")
    app.use(express.static("public"))
}

//Recebe form
function receberFORM(){
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
}

//rotas
function rotas(){
    //Rota principal - renderizar as perguntas publicadas
    app.get('/', (req, res) => {
        tbPerguntas.findAll({raw: true, order:[
            ['id', 'DESC']
        ]}).then(perguntas =>{
            res.render("index", {
                perguntas : perguntas
            })
        })
    })

    app.get("/pergunta/:id" , (req, res)=>{
        let idPerg = req.params.id
        tbPerguntas.findOne({
            where: {id: idPerg}
        }).then(pergunta =>{
            if(pergunta != undefined){
                res.render('pergunta', {
                    pergunta: pergunta
                })
            }else{
                res.redirect('/')
            }
        })
    })

    //Rota formulário perguntar
    app.get('/perguntar', (req, res) => {
        res.render("formPergunta")
    })

    //Rota de envio da pergunta - recebendo via POST 
    app.post("/pergunta-registrada", (req, res) =>{
        //recebendo os dados do form
        tbPerguntas.create({
            titulo: req.body.tituloPergunta,
            descricao: req.body.descPregunta
        }).then(()=>{
            res.redirect("/")
        })
    })
}

// servidor
function servidor(){
    app.listen(5000, (error) =>{
        if(error)
            console.log("Erro ao rodar o servidor: " + error)
        else{
            console.log("Servidor rodando com sucesso!")
        }
    })
}

//Aplication running
configBD()
configEJS()
receberFORM()
rotas()
servidor()