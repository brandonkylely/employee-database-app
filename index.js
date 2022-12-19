const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

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
                },
            ]).then(({departmentName}) => {
                addDepartment(departmentName);
                console.log(`${departmentName} has been successfully added.`);
                startApplication()
            });
            break;
        case 'Add a role':
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'roleTitle',
                    message: "What is the title of the role you would like to add?",
                },
                {
                    type: 'input',
                    name: 'roleSalary',
                    message: "What is the salary of the role you would like to add?",
                },
                {
                    type: 'list',
                    name: 'roleDepartment',
                    message: "What department is this role associated with?",
                    choices: [

                    ]
                },
            ]).then(({roleTitle, roleSalary, roleDepartment}) => {
                addRole(roleTitle, roleSalary, roleDepartment);
                console.log(`${roleTitle} has been successfully added.`);
                startApplication()
            });
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

function viewDepartments() {
    db.query(`SELECT * FROM department`, (err, result) => {
        if (err) {
            console.log(err);
        }
        // console.log(result);
    });
}

function addDepartment(department) {
    db.query(`INSERT INTO department (name) VALUES ('${department}');`, (err, result) => {
        if (err) {
            console.log(err);
        }
        // console.log(result);
    });
}

function viewRoles() {
    db.query(`SELECT * FROM role`, (err, result) => {
        if (err) {
            console.log(err);
        }
        // console.log(result);
    });
}

function addRole(roleTitle, roleSalary, roleDepartment) {
    db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${roleTitle}' '${roleSalary}' '${roleDepartment}');`, (err, result) => {
        if (err) {
            console.log(err);
        }
        // console.log(result);
    });
}

function grabDepartmentNames() {
    // select department names and return a new array with every department name
}

function viewEmployees() {
    db.query(`SELECT * FROM employees`, (err, result) => {
        if (err) {
            console.log(err);
        }
        // console.log(result);
    });
}

function addEmployee(employee) {
    db.query(`INSERT INTO employees (name) VALUES ('${employee}');`, (err, result) => {
        if (err) {
            console.log(err);
        }
        // console.log(result);
    });
}

startApplication()
