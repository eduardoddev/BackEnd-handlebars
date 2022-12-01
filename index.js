const express = require ("express");
const app = express();
const {engine} = require('express-handlebars');
const bodyParser = require ('body-parser');
const Post = require('./models/Post');
const Sequelize = require('sequelize');

//template engine
app.engine('handlebars', engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//BODY PARSER - config
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//ROTAS
app.get('/', function(req, res){
    res.render('home')
})
app.get('/cad', function(req, res){
    res.render('formulario')
})

//envia dados de formulario para o banco de dados
app.post('/add', function(req,res){
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then (function(){
        //res.send("Post criado com sucesso")
        res.redirect('/')

    }).catch(function(erro){
        res.send("Houve um erro: " + erro)

    })
})

app.listen(8090, function(){
    console.log("Servidor Rodando na url http:localhost:8090")
});

//não conseguimos acessar uma rota do tipo post pela url, dá erro
//só conseguimos acessar pela url as do tipo get
