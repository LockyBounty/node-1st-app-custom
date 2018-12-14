var express     = require('express');
var app         = express();

var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var jwt     = require('jsonwebtoken'); //pacote usado para criar e verificar os tokens
var config  = require('./config'); //aqui estamos retornando a configuração criada nesse arquivo relacionado ao bd
//estamos retornando a classe de modelo 'Usuario'


var port = process.env.PORT || 8000; //aqui estamos configurando a porta da nossa api. Onde irá: criar e verificar os tokens tbm
mongoose.connect(config.database); //aqui iremos conectar a base de dados
app.set('superNode-auth', config.configName); //variável que criamos no arquivo 'config'

//Aqui estamos usando o 'body-parser' para obter as informações das requisições via POST (parâmetros)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//aqui estamos usando o 'morgan' para criar um log de requisições através do console de qualquer alteração que tivermos em nossa api:
app.use(morgan('dev'));

//Rota Padrão da API:
app.get('/', function(req, res) {
    res.send('Seja Bem-Vindo a API: http://localhost:' + port + '/api');
});

//Aqui estamos obtendo a instância do router para as rotas das APIs:
app.listen(port);
console.log("ok");
