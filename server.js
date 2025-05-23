require("dotenv").config(); // EXECUTA O DOTENV QUE É RESPONSÁVEL POR ATER AS CONEXÕES PRIVADAS EM UM ARQUIVO OMITIDO
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.CONNECTIONSTRING).then(() => {
  console.log("o banco de dados foi carregado com sucesso");
  app.emit("pronto"); // isso funciona como um evento, se ocorrer com sucesso, automaticamente ele enviara esse evento para o ouvidor (app.on) logo abaixo
});

const router = require("./routes");
const path = require("path");
const { middlewareGlobal } = require("./src/middlewares/middleware");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));
app.set("views", path.resolve(__dirname, "src", "views")); // set configura o express; e nesse ele configura a leitura dos viewres (onde acha-los)
app.set("view engine", "ejs"); // Nesse caso ele define a engine como ejs
app.use(router);
app.use(middlewareGlobal);

app.on("pronto", () => {
  app.listen(3000, () => {
    console.log("http://localhost:3000");
    console.log("servidor executando na porta 3000");
  });
});
