const express = require("express"); // Pega o express

const app = express(); // Cria o Express

app.use(express.json()) // Diz que estamos usando JSON

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