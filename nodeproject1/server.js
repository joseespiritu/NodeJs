const { response, request } = require("express");
const express = require("express");

const app = express();

app.get("/", (req = request, res = response) => {
  req.token = 10 + parseInt("10");
  res.text = "Secret";
  res.send("Hello World");
});

app.listen(3000);
console.log("Server is running on port 3000");
