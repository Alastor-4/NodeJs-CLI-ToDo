const Tarea = require("./tarea");

class Tareas {
  _listado = {}; //no es necesario en JavaScript

  get listadoArr() {
    const listado = [];
    //Object.keys retorna todas las llaves que tiene ese objeto, le pasas el objeto por parametro
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }

  constructor() {
    this._listado = {};
  }

  crearTarea(descripcion = "") {
    const tarea = new Tarea(descripcion);
    this._listado[tarea.id] = tarea; //crea una clave con el id de tarea y le asigna la tarea como valor
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea; //establece el id en el objeto como clave y luego la tarea como valor
    });
  }

  listadoCompleto() {
    console.log();
    this.listadoArr.forEach((tarea, index) => {
      //barre la lista y para cada tarea e index
      const id = `${index + 1}`.green; //crea un index
      const { descripcion, completadoEn } = tarea; //desestructura la descripcion y el completado
      const estado = completadoEn ? "Completada".green : "Pendiente".red;

      console.log(`${id} ${descripcion} :: ${estado}`);
    });
  }

  listarPendientesCompletadas(completadas = true) {
    console.log();
    let contador = 0;
    this.listadoArr.forEach((tarea) => {
      //barre la lista y para cada tarea e index
      const { descripcion, completadoEn } = tarea; //desestructura la descripcion y el completado
      const estado = completadoEn ? "Completada".green : "Pendiente".red;
      if (completadas) {
        if (completadoEn) {
          contador += 1;
          console.log(
            `${(contador + ".").green} ${descripcion} :: ${completadoEn.green}`
          );
        }
      } else {
        if (!completadoEn) {
          contador += 1;
          console.log(`${(contador + ".").green} ${descripcion} :: ${estado}`);
        }
      }
    });
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });
    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
