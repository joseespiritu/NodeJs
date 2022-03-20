const { Router } = require("express");
const open = require("../config/config");

const router = Router();

router.get("/", (req = request, res) => {
  res.status(200).json({
    message: "Desde el servidor",
  });
});

router.get("/api/fromoracle", async (req, res) => {
  const personas = [];
  const sql = "select * from personas";

  const results = await open(sql, [], false);
  //   console.log(results.rows);
  results.rows.map((person) => {
    const userSchema = {
      ID: person[0],
      NOMBRE: person[1],
      APELLIDO: person[2],
      CORREO: person[3],
    };
    personas.push(userSchema);
  });

  res.json({ personas });
});

module.exports = router;
