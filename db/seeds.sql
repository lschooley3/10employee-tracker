INSERT INTO department (department_name)
VALUES ('Human Resources'),
       ('Sales'),
       ('Production');

INSERT INTO role (title, salary, department_id)
VALUES ('Representative', 10000, 1),
       ('Sales floor Rep', 20000, 2),
       ('Director of HR', 50000, 1),
       ('Lead', 5000, 3),
       ('Team Member', 2000000, 3);
       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, 3),
       ('Jane', 'Doe', 2, 3),
       ('Jim', 'Doe', 3, 3),
       ('Jill', 'Doe', 4, 3),
       ('Jack', 'Doe', 5, 3);