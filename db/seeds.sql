INSERT INTO department (department_name)
VALUES ('Human Resources'),
       ('Sales'),
       ('Production');

INSERT INTO role (department_name, title)
VALUES (1, 'Representative'),
       (2, 'Sales floor Rep'),
       (1, 'Director of HR'),
       (3, 'Lead'),
       (2, 'Sales floor Rep'),
       (1, 'Representative'),
       (3, 'Team Member');
       
INSERT INTO employee (title, first_name, last_name, role_id, manager_id)
VALUES (3, John, Smith, 1, NULL),
        (2, Jane, Doe, 2, 1),
        (1, Bob, Builder, 3, 1),
        (3, Sally, Smith, 4, 2),
        (2, Joe, Dirt, 5, 2),
        (1, Mary, Jones, 6, 3),
        (2, Susie, Homemaker, 7, 3),
        (2, Jack, Attack, 8, 4),
        (1, Jacob, Black, 9, 4),
        (3, Harry, Potter, 10, 5),
        (2, Ron, Weasley, 11, 5),
        (1, Hermione, Granger, 12, 6);