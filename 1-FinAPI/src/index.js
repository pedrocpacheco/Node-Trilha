const express = require("express")
const { v4: uuidv4 } = require("uuid") 

const app = express()

app.use(express.json())

const costumers = [];

app.post("/accounts", (req, res) => {
    const { cpf, name } = req.body;

    const constumerAlreadyExists = costumers.some((costumer) => costumer.cpf === cpf); // ! Verifica se há account com cpf =

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


app.listen(3333)