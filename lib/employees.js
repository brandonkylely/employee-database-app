const inquirer = require("inquirer");

function viewEmployees(db, startApplication) {
    db.query(`SELECT * FROM employee`, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
        startApplication();
      });
}

function addEmployee(db, startApplication) {
    db.query( "SELECT title AS name, id AS value FROM role", (err, result) => {
        // console.log(result);
      inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message:
            "What is this employee's first name?",
        },
        {
          type: "input",
          name: "lastName",
          message:
            "What is this employee's last name?",
        },
        {
          type: "list",
          name: "roleId",
          message:
            "What is this employee's role?",
          choices: result,
        },
      ])
      .then(({firstName, lastName, roleId}) => {
        db.query(`INSERT INTO employee (first_name, last_name, role_id) VALUES ('${firstName}', '${lastName}', '${roleId}');`,
            (err, result) => {
              if (err) {
                console.log(err);
              }
              // console.log(result);
              console.log(`${firstName} ${lastName} has been successfully added.`);
              viewEmployees(db, startApplication)
            }
            );
          })
    })
  };

  // CONCAT(firstName,' ',lastName)

  function assignManager(db, startApplication) {
    db.query(`
    SELECT CONCAT(first_name,' ',last_name) AS name, id AS value FROM employee;`, (err, result) => {
      inquirer
      .prompt([
        {
          type: "list",
          name: "employeeId",
          message:
            "Please choose the employee to assign a manager to.",
          choices: result,
        },
        {
          type: "list",
          name: "managerId",
          message:
            "Please choose the manager.",
          choices: result,
        }
      ])
      .then(({employeeId, managerId}) => {
        db.query(`
        UPDATE employee
        SET manager_id = ${managerId}
        WHERE id = ${employeeId};`,
            (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
        startApplication();
      });
      })
      
      });
  }

// CODE BELOW, adding managerId to prompt, after line 38?

    // .then(({firstName, lastName, roleId}))
    //   db.query( "SELECT first_name AS name, id AS value FROM employee", (err, result) => {
    //     // console.log(result);
    //     // result.push('N/a', null)
    //   inquirer.prompt([
    //     {
    //       type: "list",
    //       name: "managerID",
    //       message:
    //         "Who is this employee's manager?",
    //       choices: result,
    //     },
    //   ])
    //     .then(({db, firstName, lastName, roleId, managerId }) => {
    //         db.query(
    //             `INSERT INTO role (first_name, last_name, role_id, manager_id) VALUES ('${first_name}, ${last_name}, ${role_id}, ${manager_id}');`,
    //             (err, result) => {
    //               if (err) {
    //                 console.log(err);
    //               }
    //               console.log(`${firstName} ${lastName} has been successfully added.`);
    //               viewEmployees(db, startApplication);
    //               // console.log(result);
    //             }
    //           );
    //       })

// function employeeAction(db, first_name, last_name, role_id, manager_id) {
    // db.query(
    //     `INSERT INTO role (first_name, last_name, role_id, manager_id) VALUES ('${first_name}, ${last_name}, ${role_id}, ${manager_id}');`,
    //     (err, result) => {
    //       if (err) {
    //         console.log(err);
    //       }
    //       viewEmployees();
    //       // console.log(result);
    //     }
    //   );
// }


module.exports = {viewEmployees, addEmployee, assignManager};