const fs = require("fs");
const colors = require("colors/safe");

const crearArchivo = async (base = 5, listar = false, limite = 5) => {
  /* return new Promise((resolve, reject) => {
  }); */

  try {
    let salida = "";
    let consola = "";

    for (let i = 1; i <= limite; i++) {
      salida += `${base} x ${i} = ${base * i}\n`;
      consola += `${base} ${colors.green("x")} ${i} ${colors.rainbow("=")} ${
        base * i
      }\n`;
    }

    if (listar) {
      console.log("==================".green);
      console.log(`   Tabla del ${colors.blue(base)}:`.green);
      console.log("==================".green);
      console.log(consola);
    }

    fs.writeFileSync(`./salida/tabla-${base}.txt`, salida);

    return `tabla-${base}.txt`;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  crearArchivo,
};
