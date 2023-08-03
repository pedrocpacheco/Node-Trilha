const express = require("express")
const { v4: uuidv4 } = require("uuid") 

const app = express()

app.use(express.json())

const costumers = [];

function verifyCPF(req, res, next){
    const { cpf } = req.headers;
    console.log(cpf);
    const costumer = costumers.find(costumer => costumer.cpf === cpf);

    if(!costumer){
        return res.status(400).json({ error: "Costumer not founded" })
    }

    req.costumer = costumer; 

    return next();
}

function getBalance(statement){
    const balance = statement.reduce((acc, operation) =>{
        if(operation.type === "credit"){
            return acc + operation.amount;
        }else{
            return acc - operation.amount;
        }
    }, 0)
    return balance;
}

app.post("/acounts", (req, res) => {
    console.log(req.body);
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
    console.log(req.body);
    const { costumer } = req;
    return res.json(costumer.statement); 
})

app.post("/deposit", verifyCPF, (req, res) => {
    const { description, amount } = req.body;
    console.log(req.body);
    const costumer = costumers[0]

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit"
    }

    costumer.statement.push(statementOperation);

    res.status(201).send(statementOperation);
})

app.post("/withdraw", verifyCPF, (req, res) =>{
    const { amount } = req.body;
    const { costumer } = req;

    const balance = getBalance(costumer.statement);
    
    if(balance < amount){
        return res.status(400).send({ error: "Insufficient Funds!" })
    }

    const statementOperation = {
        amount, 
        created_at: new Date(),
        type: "debit"
    }

    costumer.statement.push(statementOperation);

    return res.status(201).send(statementOperation);
})  

app.get("/statement/:date", verifyCPF, (req, res) =>{
    const { date } = req.query;
    const { costumer } = req;

    const dateFormat = new Date(date + " 00:00");

    const statement = costumer.statement.filter((statement) => statement.created_at.toDateString() ===  new Date
    (dateFormat).toDateString());

    if(!statement){
        return res.status(400).send({ error: "Date not founded" })
    }

    return res.json(statement);
})

app.put("/acounts", verifyCPF, (req, res) =>{
    const { name } = req.body;
    const { costumer } = req;

    costumer.name = name;

    return res.status(201).send(costumer);
})

app.get("/acounts", verifyCPF, (req, res) =>{
    const { costumer } = req;

    return res.json(costumer);
})

app.delete("/acounts", verifyCPF, (req, res) =>{
    const { costumer } = req;

    costumers.splice(costumer, 1);

    return res.status(200).json(costumers);
})

app.get("/balance", verifyCPF, (req, res) =>{
    const { costumer } = req;

    const balance = getBalance(costumer.statement);

    return res.json(balance)
})

app.listen(3333)