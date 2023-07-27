const express = require("express");

const app = express();

app.use(express.json()) // Diz que estamos usando JSON

/**
 * BAIXANDO DEPENDENCIAS:
 * Elas ficam salvas no package.json
 * 
 * Express: npm i express
 * Nodemon: npm i nodemon --dev
 * 
 * Depois de baixar um nodemon, precisa criar um script no package.json
 * "scripts": {
    "dev": "nodemon src/index.js"
  }
 */

/**
 * METODOS HTTP: 
 * GET - Buscar uma informação dentro do servidor
 * POST - Inserir uma informação no servidor
 * PUT - Alterar uma informação no servidor
 * PATCH - Alterar uma informação especifica
 * DELETE - Deletar uma informação do servidor
 */

/**
 * TIPOS DE PARAMETRO:
 * 
 * Route Params => Servem para identificar um recurso, edita-lo ou deleta-lo
 *  Eles estão encapsulados na rota, no barra.
 *  - :id
 *
 * Query Params => Paginação / Filtro
 *  São usados para paginação
 *  - page
 *  - size
 *  - order
 * 
 * Body Params => Os objetos para inserção/alteração
 */

app.get("/courses", (req, res) => {
    const query = req.query;
    console.log(query);
    return res.json(["Curso 1", "Curso 2", "Curso 3"]);
});

app.post("/courses", (req, res) => {
    const body = req.body;
    console.log(body);
    return res.json(["Curso 1", "Curso 2", "Curso 3", "Curso 4"]);
})

app.put("/courses/:id", (req, res) => {
    const { id } = req.params
    console.log(id);
    return res.json(["Curso 6", "Curso 2", "Curso 3", "Curso 4"]);
})

app.patch("/courses/:id", (req, res) => {
    const { id } = req.params
    console.log(id);
    return res.json(["Curso 6", "Curso 5", "Curso 3", "Curso 4"]);
})

app.delete("/courses/:id", (req, res) => {
    const { id } = req.params
    console.log(id);
    return res.json(["Curso 6", "Curso 3", "Curso 4"]);
})

//localhost:3333
app.listen(3333)