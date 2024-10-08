
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const conection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

conection
    .authenticate()
    .then(() =>{
        console.log("Conexão com banco de dados")
    })
    .catch((msgErro) => {
        console.log(msgErro)
        return true
    })


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.set("view engine", "ejs");
app.use(express.static("public"))

app.get("/", (req, res) =>{

    Pergunta.findAll({raw: true, order:[
        ["id","DESC"]
    ]}).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        })
    })

});

app.get("/perguntar", (req, res) =>{
   
    res.render("perguntar");

}); 

app.post("/salvarpergunta", (req, res) =>{

    let titulo = req.body.titulo;
    let descricao = req.body.descricao;

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {

        res.redirect("/")

    })

});

app.get("/pergunta/:id",(req, res) =>{
    
    let id = req.params.id;

    Pergunta.findOne({
        where: {id : id}
    }).then(pergunta => {
        if(pergunta != undefined){

            Resposta.findAll({
                where: {perguntaID : pergunta.id}
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta : pergunta,
                    respostas: respostas
                });
            });
        }else{
            res.redirect("/")
        }
    });

})

app.post("/responder", (req, res) => {
    let corpo = req.body.corpo;
    let perguntaId = req.body.pergunta

    Resposta.create({
        corpo : corpo,
        perguntaID: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId);
    })

});

app.listen(8080, () => {
    console.log("app rodando");
});



