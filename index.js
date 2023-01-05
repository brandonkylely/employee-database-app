const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const {viewDepartments, addDepartment} = require('./lib/departments');
const {viewRoles, addRole} = require('./lib/roles');
const {viewEmployees, addEmployee} = require('./lib/employees');

// const departments = require('./lib/departments');
// const employees = require('./lib/employees');
// const roles = require('./lib/roles');

// var departmentArray = [];
// var roleArray = [];

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
        default:
          console.log("Something went wrong.");
      }
    });
}

// TODO: FINISH EMPLOYEE FUNCTION, MODULARIZE, ADD UPDATE AND DELETE FUNCTIONALITY

// function viewRoles() {
//   db.query(`SELECT * FROM role`, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result);
//     startApplication();
//   });
// }

// function addRole() {
//   db.query("SELECT name, id AS value FROM department", (err, result) => {
//     console.log(result);
//     inquirer
//       .prompt([
//         {
//           type: "input",
//           name: "roleTitle",
//           message: "What is the title of the role you would like to add?",
//         },
//         {
//           type: "input",
//           name: "roleSalary",
//           message: "What is the salary of the role you would like to add?",
//         },
//         {
//           type: "list",
//           name: "roleDepartment",
//           message: "What department is this role associated with?",
//           choices: result,
//         },
//       ])
//       .then(({ roleTitle, roleSalary, roleDepartment }) => {
//         roleAction(roleTitle, roleSalary, roleDepartment);
//         console.log(`${roleTitle} has been successfully added.`);
//       });
//   });
// }

// function roleAction(roleTitle, roleSalary, roleDepartment) {
//   db.query(
//     `
//         INSERT INTO role (title, salary, department_id) VALUES ('${roleTitle}', '${roleSalary}', '${roleDepartment}');
//         `,
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       }
//       viewRoles();
//       // console.log(result);
//     }
//   );
// }

// function grabDepartmentNames() {
//   // select departments
//   // [{value: `${id}`, name: `{name}`]

//   db.query(`SELECT * FROM department`, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     // console.log(result)

//     for (let i = 0; i < result.length; i++) {
//       arr.push({
//         value: `${id}`,
//         name: `${name}`,
//       });
//     }
//   });
// }

// function viewEmployees() {
//   db.query(`SELECT * FROM employee`, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result);
//     startApplication();
//   });
// }

// function addEmployee(employee) {
//   db.query(
//     `INSERT INTO employee (name) VALUES ('${employee}');`,
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       }
//       viewEmployees();
//       // console.log(result);
//     }
//   );
// }

startApplication();
