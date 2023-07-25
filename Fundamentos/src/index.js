const express = require("express");

const app = express();

/**
 * METODOS HTTP: 
 * GET - Buscar uma informação dentro do servidor
 * POST - Inserir uma informação no servidor
 * PUT - Alterar uma informação no servidor
 * PATCH - Alterar uma informação especifica
 * DELETE - Deletar uma informação do servidor
 */

/**
 * Tipos de Parametro:
 * 
 * Route Params => Identificar um recurso /
 */

app.get("/courses", (req, res) => {
    return res.json(["Curso 1", "Curso 2", "Curso 3"]);
});

app.post("/courses", (req, res) => {
    return res.json(["Curso 1", "Curso 2", "Curso 3", "Curso 4"]);
})

app.put("/courses/:id", (req, res) => {
    return res.json(["Curso 6", "Curso 2", "Curso 3", "Curso 4"]);
})

app.patch("/courses/:id", (req, res) => {
    return res.json(["Curso 6", "Curso 5", "Curso 3", "Curso 4"]);
})

app.delete("/courses/:id", (req, res) => {
    return res.json(["Curso 6", "Curso 3", "Curso 4"]);
})

//localhost:3031
app.listen(3333)