USE employees_db;

INSERT INTO department (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Management');

INSERT INTO role (title, salary, department_id)
VALUES ('Engineer', 100000, 2),
       ('Manager', 100000, 3),
       ('Market Analyst', 1000000, 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('John', 'Jiang', 2),
       ('Wendy', 'Abrams', 3),
       ('Maddy', 'Smith', 1),
       ('Ron', 'Fuzuki', 1);