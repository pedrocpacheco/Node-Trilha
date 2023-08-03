const express = require("express")
const { v4: uuidv4 } = require("uuid") 

const app = express()

app.use(express.json())

const costumers = [];

function verifyCPF(req, res, next){
    const { cpf } = req.headers;

    const costumer = costumers.find(costumer => costumer.cpf === cpf);

    if(!costumer){
        return res.status(400).json({ error: "Costumer not founded" })
    }

    req.costumer = costumer; 

    return next();
}

app.post("/acounts", (req, res) => {
    const { cpf, name } = req.body;

    const constumerAlreadyExists = costumers.some(costumer => costumer.cpf === cpf); // ! Verifica se há account com cpf =

    if(constumerAlreadyExists){
        return res.status(400).json({ error: "Costumer Already Exits" }) // ? Se existir, devolve esse erro
    }

    const costumer =  {
        cpf,
        name,
        id: uuidv4(),
        statement: []
    }

    costumers.push(costumer);
    return res.status(201).send(costumer);
})

// app.use(verifyCPF) -> Como Parametro: Apenas Metodo usa | Com App.Use: Todos Abaixo usam
app.get("/statement", verifyCPF, (req, res) => { 
    const { costumer } = req;
    return res.json(costumer); 
})

app.post("/deposit", verifyCPF, (req, res) => {
    const { description, amount } = req.body;
    const { costumer } = req;

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit"
    }

    costumer.statement.push(statementOperation);

    res.status(201).send(statementOperation);
})

app.listen(3333)