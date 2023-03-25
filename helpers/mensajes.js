require("colors");

const menuItems = () => {
  return new Promise((resolve) => {
    console.clear();

    //Menu a palo
    console.log("===========================".green);
    console.log("  Seleccione una opción ".green);
    console.log("===========================\n".green);
    console.log(`${"1.".green} Crear tarea`);
    console.log(`${"2.".green} Listar tareas`);
    console.log(`${"3.".green} Listar tareas completadas`);
    console.log(`${"4.".green} Listar tareas pendientes`);
    console.log(`${"5.".green} Completar tarea(s)`);
    console.log(`${"6.".green} Borrar tarea`);
    console.log(`${"7.".green} Salir\n`);

    const readline = require("readline").createInterface({
      input: process.stdin, //pausa la aplicacion para recibir datos
      output: process.stdout, //para pintar en consola cuando pide algo al usuario
    });

    readline.question("Seleccione una opción: ", (opt) => {
      readline.close();
      resolve(opt); //termina la promesa y devuelve la opt
    });
  });
};

const pausa = () => {
  return new Promise((resolve) => {
    //detiene la aplicación
    const readline = require("readline").createInterface({
      input: process.stdin, //pausa la aplicacion para recibir datos
      output: process.stdout, //para pintar en consola cuando pide algo al usuario
    });

    //usa el stdout para poner una pregunta
    readline.question(`\nPresione ${"ENTER".green} para continuar\n`, (opt) => {
      //callback cuando se tiene la respuesta
      readline.close();
      resolve(); //aqui termina la promesa
    });
  });
};

module.exports = {
  menuItems,
  pausa,
};
