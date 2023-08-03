const express = require("express")
const { v4: uuidv4 } = require("uuid") 

const app = express()

app.use(express.json())

const costumers = [];

// Middleware
function verifyIfExistsByCpf(req, res, next){
    const { cpf } = req.headers;

    const customer = costumers.find(costumer => costumer.cpf === cpf);

    if(!customer){
        return res.status(400).json({ error: "Costumer not founded" })
    }

    req.costumer = costumer; 

    return next()
}

app.post("/accounts", verifyIfExistsByCpf, (req, res) => {
    const { cpf, name } = req.body;

    const constumerAlreadyExists = costumers.some(costumer => costumer.cpf === cpf); // ! Verifica se há account com cpf =

    if(constumerAlreadyExists){
        return response.status(400).json({ error: "Costumer Already Exits" }) // ? Se existir, devolve esse erro
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

// ! app.use(verifyIfExistsByCpf)
// ? Como Parametro: Apenas Metodo usa | Com App.Use: Todos Abaixo usam
app.get("/statement", verifyIfExistsByCpf, (req, res) => { 
    const { costumer } = req;
    return res.json(costumer);
})


app.listen(3333)