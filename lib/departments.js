function viewDepartments(db, startApplication) {
    db.query(`SELECT * FROM department`, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
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