const express = require("express");

const app = express();

app.get("/", (req, res) => {
    return res.send("Hello World!")
})

//localhost:3031
app.listen(3333)