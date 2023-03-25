const inquirer = require("inquirer"); //hay que instalar la version 8.0.0
require("colors");

const menuOpts = [
  {
    type: "list",
    name: "opcion",
    message: "¿Que desea hacer?",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Crear tarea`,
      },
      {
        value: "2",
        name: `${"2.".green} Listar tareas`,
      },
      {
        value: "3",
        name: `${"3.".green} Listar tareas completadas`,
      },
      {
        value: "4",
        name: `${"4.".green} Listar tareas pendientes`,
      },
      {
        value: "5",
        name: `${"5.".green} Completar tarea(s)`,
      },
      {
        value: "6",
        name: `${"6.".green} Borrar tarea`,
      },
      {
        value: "0",
        name: `${"0.".green} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("===========================".green);
  console.log("  Seleccione una opción ".white);
  console.log("===========================\n".green);

  const { opcion } = await inquirer.prompt(menuOpts); //se le pasan las opciones como parámetro
  return opcion;
};

const pausa = async () => {
  const question = [
    {
      type: "input",
      name: "enter", //lo que retorna
      message: `Presione ${"enter".green} para continuar`, //mensaje mostrado
    },
  ];
  console.log("\n");
  await inquirer.prompt(question);
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input", //tipo input
      name: "descripcion", //lo que se recibe
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];

  const { descripcion } = await inquirer.prompt(question);
  return descripcion;
};

const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, index) => {
    const id = `${index + 1}.`.green;
    return {
      value: tarea.id,
      name: `${id} ${tarea.descripcion}`,
    };
  });

  choices.unshift({
    value: 0,
    name: `${"0.".green} Cancelar`,
  });

  const preguntas = [
    {
      type: "list",
      name: "id",
      message: `Seleccione la tarea a ${"eliminar".red}`,
      choices,
    },
  ];
  const { id } = await inquirer.prompt(preguntas);
  return id;
};

const confirmar = async (message) => {
  const question = [
    {
      type: "confirm", // ver documentacion
      name: "ok", //lo que se recibe
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, index) => {
    const id = `${index + 1}.`.green;
    return {
      value: tarea.id,
      name: `${id} ${tarea.descripcion}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const pregunta = [
    {
      type: "checkbox",
      name: "ids",
      message: `Selecciones`,
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(pregunta);
  return ids;
};

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
};
