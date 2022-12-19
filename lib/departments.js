function viewDepartments(db, startApplication) {
    db.query(`SELECT * FROM department`, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      startApplication();
    });
  }
  
  function addDepartment(db, department) {
    db.query(
      `INSERT INTO department (name) VALUES ('${department}');`,
      (err, result) => {
        if (err) {
          console.log(err);
        }
        viewDepartments();
        // console.log(result);
      }
    );
  }

module.exports = {viewDepartments, addDepartment};