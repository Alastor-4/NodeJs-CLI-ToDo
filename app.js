require("colors");

const { guardarInformacion, leerDb } = require("./db/guardarArchivo.js");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
} = require("./helpers/inquirer.js");
const Tareas = require("./models/tareas.js");

const main = async () => {
  let opt = "";
  const tareas = new Tareas();
  const tareasDB = leerDb();

  if (tareasDB) {
    //Establecer las tareas
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    //imprime el menú
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const descripcion = await leerInput("Descripción:");
        tareas.crearTarea(descripcion);
        break;
      case "2":
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.listarPendientesCompletadas(true);
        break;
      case "4":
        tareas.listarPendientesCompletadas(false);
        break;
      case "5":
        const ids = await mostrarListadoChecklist(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;
      case "6":
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== "0") {
          const ok = await confirmar("¿Está seguro?");
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada correctamente");
          }
        }
        break;
    }

    guardarInformacion(tareas.listadoArr);

    if (opt !== "0") await pausa();
  } while (opt !== "0");
};

main();
