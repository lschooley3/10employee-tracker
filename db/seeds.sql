INSERT INTO department (department_name)
VALUES ('Human Resources'),
       ('Sales'),
       ('Production');

INSERT INTO roles (department_name, title)
VALUES (1, 'Representative'),
       (2, 'Sales floor Rep'),
       (1, 'Director of HR'),
       (3, 'Lead'),
       (2, 'Sales floor Rep'),
       (1, 'Representative'),
       (3, 'Team Member');
       
INSERT INTO employee (title, first_name, last_name)
VALUES (John, Smith),
        (Mary, Jones),
        (Susie, Homemaker),
        (Jack, Attack),
        (Jacob, Black),
        (Harry, Potter),
        (Ron, Weasley),
        (Hermione, Granger)