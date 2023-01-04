USE employees_db;

INSERT INTO department (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Management');

INSERT INTO role (title, salary, department_id)
VALUES ('Engineer', 500000, 2),
       ('Manager', 300000, 3),
       ('Market Analyst', 200000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Jiang', 2, 0),
       ('Edward', 'Brock', 2, 0),
       ('Wendy', 'Abrams', 3, 1),
       ('Maddy', 'Smith', 1, 2),
       ('Ron', 'Fuzuki', 1, 1);