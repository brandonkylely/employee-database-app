
function viewDepartments() {
    db.query(`SELECT * FROM department`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result);
    });
}

function addDepartment(department) {
    db.query(`INSERT INTO department(name) VALUES (${department});`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result);
    });
}
    
module.exports = departments;