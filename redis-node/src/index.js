const express = require("express");
const axios = require("axios");
const responseTime = require("response-time");
const { createClient } = require("redis");

const client = createClient({
  host: "localhost",
  port: 6379,
});

const app = express();

app.use(responseTime());

app.get("/character", async (req, res) => {
  try {
    // Response from cache
    const reply = await client.get("characters");

    if (reply) {
      return res.json(JSON.parse(reply));
    }

    const response = await axios.get(
      "https://rickandmortyapi.com/api/character"
    );
    await client.set("characters", JSON.stringify(response.data));

    return res.json(response.data);
  } catch (error) {
    console.log(error);
  }
});

app.get("/character/:id", async (req, res) => {
  console.log(req.originalUrl);
  try {
    const reply = await client.get(req.params.id);
    if (reply) return res.json(JSON.parse(reply));

    const response = await axios.get(
      "https://rickandmortyapi.com/api/character/" + req.params.id
    );
    await client.set(req.params.id, JSON.stringify(response.data));
    return res.json(response.data);
  } catch (error) {
    return res.status(error.response.status).json({ message: error.message });
  }
});

async function main() {
  await client.connect();
  app.listen(3000);
  console.log("server listen on port 3000");
}

main();
