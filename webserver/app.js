const express = require("express");
const hbs = require("hbs");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

// Handlebars
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

const options = {
  extensions: ["html"],
};

// Servir contenido estatico
app.use(express.static("public", options));

app.get("/", function (req, res) {
  res.render("home", {
    nombre: "Jose Espiritu",
    titulo: "Curso de Node",
  });
});

// app.get("/hola-mundo", function (req, res) {
//   res.send("Hola mundo en su respectiva ruta");
// });

app.get("/generic", function (req, res) {
  // res.sendFile(__dirname + "/public/generic.html");
  res.render("generic", {
    nombre: "Jose Espiritu",
    titulo: "Curso de Node",
  });
});

app.get("/elements", function (req, res) {
  // res.sendFile(__dirname + "/public/elements.html");
  res.render("elements", {
    nombre: "Jose Espiritu",
    titulo: "Curso de Node",
  });
});

app.get("*", function (req, res) {
  // res.sendFile(__dirname + "/public/404.html");
  res.send("404", {
    nombre: "Jose Espiritu",
    titulo: "Curso de Node",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
