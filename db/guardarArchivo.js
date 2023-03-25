const fs = require("fs");
const archivo = "./db/data.json";

const guardarInformacion = (data) => {
  fs.writeFileSync(archivo, JSON.stringify(data));
};

//para cargar las opciones
const leerDb = () => {
  if (!fs.existsSync(archivo)) {
    //para verificar si existe el archivo sino retorna null
    return null;
  }
  const info = fs.readFileSync(archivo, { encoding: "utf-8" }); //la info la carga del archivo
  return JSON.parse(info); //hace falta parsear
};

module.exports = {
  guardarInformacion,
  leerDb,
};
