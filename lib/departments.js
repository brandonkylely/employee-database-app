function viewDepartments(db, startApplication) {
    db.query(`SELECT department.id AS department_id, department.name AS department_name FROM department ORDER BY department_id ASC`, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.table(result);
      startApplication();
    });
  }
  
  function addDepartment(db, departmentName, startApplication) {
    db.query( `INSERT INTO department (name) VALUES ('${departmentName}');`, (err, result) => {
        if (err) {
          console.log(err);
        }
        // console.log(result);
        console.log(`${departmentName} has successfully been added.`)
      }
    );
    viewDepartments(db, startApplication)
  }

module.exports = {viewDepartments, addDepartment};