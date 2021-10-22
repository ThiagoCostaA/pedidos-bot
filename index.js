const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Olá Chatbot");
});

app.post('/webhook', (req, res) => {
    console.log("Cheguei no webhook");

    const mensagem = req.body.queryResult.queryText;
    const intencao = req.body.queryResult.displayName;

    if(req.body.queryResult.parameters && req.body.queryResult.parameters.nao_vendemos){
        const responder = "Puxa, nós não vendemos " + req.body.queryResult.parameters.nao_vendemos;
        console.log("responder", responder);
    }

    console.log("mensagem original", mensagem);
    console.log("intenção", intencao);

    const resposta  = {
        "fulfilmentText": "Resposta do Webhook",
        "fulfillmentMessages": [
            {
                "text": [
                    "Eu sou webhook, o que achou?"
                ],
            }
        ],
        "source": "",
    }

    res.send(resposta);
})

const porta = process.env.PORT || 3000;
const hostname = "127.0.0.1"


app.listen(porta, () => {
    console.log(`Servidor rodando em http://${hostname}:${porta}`);
})












/*

app.get('/pergunta', (req, res) => {
    msg = req.query.pergunta;
    res.send("Você perguntou: " + msg);
});

app.get('/mensagem/:tipo/:id', (req, res) => {
    msg = req.params.tipo
    cod = req.params.id;
    res.send("você quer editar o id #" + cod)
})

app.post('/pedido', (req, res) => {
    console.log(req);
    const produto = req.body.produto;
    const qtd = req.body.quantidade;
    const pagto = req.body.tipoPagamento;
    const bebida = req.body.bebida;
    
    const pedido = {
        produto,
        qtd,
        pagto,
        bebida
    }

    res.json(pedido);
})
*/