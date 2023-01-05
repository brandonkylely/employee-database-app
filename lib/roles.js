const inquirer = require("inquirer");

function viewRoles(db, startApplication) {
    db.query(`SELECT * FROM role`, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
        startApplication();
      });
}


function addRole(db, startApplication) {
    db.query("SELECT name, id AS value FROM department", (err, result) => {
    //   console.log(result);
      inquirer
        .prompt([
          {
            type: "input",
            name: "roleTitle",
            message: "What is the title of the role you would like to add?",
          },
          {
            type: "input",
            name: "roleSalary",
            message: "What is the salary of the role you would like to add?",
          },
          {
            type: "list",
            name: "roleDepartment",
            message: "What department is this role associated with?",
            choices: result,
          },
        ])
        .then(({roleTitle, roleSalary, roleDepartment }) => {
        db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${roleTitle}', '${roleSalary}', '${roleDepartment}');`,
            (err, result) => {
              if (err) {
                console.log(err);
              }
              // console.log(result);
              console.log(`${roleTitle} has successfully been added.`);
              viewRoles(db, startApplication)
          }
          );
        });
    });
  }




module.exports = {viewRoles, addRole};