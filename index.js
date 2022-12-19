const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

// const departments = require('./lib/departments');
// const employees = require('./lib/employees');
// const roles = require('./lib/roles');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

function startApplication() {
  return inquirer.prompt([
    {
        type: 'list',
        name: 'action',
        message: "What would you like to do?",
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
        ]
    }
])
.then(({action}) => {
    switch(action) {
        case 'View all departments':
            viewDepartments();
            break;
        case 'View all roles':
            viewRoles();
            break;
        case 'View all employees':
            viewEmployees();
            break;
        case 'Add a department':
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'departmentName',
                    message: "What is the name of the department you would like to add?",
                }
            ]).then(({departmentName}) => {
                addDepartment(departmentName);
                console.log(`${departmentName} has been successfully added.`)
            });
            break;
        case 'Add a role':
            addRole();
            break;
        case 'Add an employee':
            addEmployee();
            break;
        default: 
            console.log('Something went wrong.');
    }
});
}


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });


startApplication()
