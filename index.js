const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const {viewDepartments, addDepartment} = require('./lib/departments');
const {viewRoles, addRole} = require('./lib/roles');
const {viewEmployees, addEmployee, assignManager} = require('./lib/employees');



const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "root",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);

function startApplication() {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Assign a Manager",
        ],
      },
    ])
    .then(({ action }) => {
      switch (action) {
        case "View all departments":
          viewDepartments(db, startApplication);
          break;
        case "View all roles":
          viewRoles(db, startApplication);
          break;
        case "View all employees":
          viewEmployees(db, startApplication);
          break;
        case "Add a department":
          inquirer
            .prompt([
              {
                type: "input",
                name: "departmentName",
                message:
                  "What is the name of the department you would like to add?",
              },
            ])
            .then(({ departmentName }) => {
              addDepartment(db, departmentName, startApplication);
            });
          break;
        case "Add a role":
          addRole(db, startApplication);
          break;
        case "Add an employee":
          addEmployee(db, startApplication);
          break;
        case "Assign a Manager":
          assignManager(db, startApplication);
          break;
        default:
          console.log("Something went wrong.");
      }
    });
}

// TODO: ADD UPDATE AND DELETE FUNCTIONALITY


startApplication();
