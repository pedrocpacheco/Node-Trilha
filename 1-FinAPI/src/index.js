const express = require("express")
const { v4: uuidv4 } = require("uuid") 

const app = express()

app.use(express.json())

const costumers = [];

/**
 * CONTA:
 * CPF - String
 * Name - String
 * ID - uuid
 * statement []
 */
app.post("/accounts", (req, res) => {
    const { cpf, name } = req.body;

    const id = uuidv4();

    const costumer =  {
        cpf,
        name,
        id,
        statement: []
    }

    costumers.push(costumer);
    return res.status(201).send(costumer);
})

app.listen(3333)