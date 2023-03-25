const { v4: uuidv4 } = require("uuid");

class Tarea {
  id = ""; //no hace falta declarar los atributos se puede hacer directamente en el constructor
  descripcion = "";
  completadoEn = null;

  constructor(descripcion) {
    this.id = uuidv4();
    this.descripcion = descripcion;
    this.completadoEn = null;
  }
}

module.exports = Tarea;
