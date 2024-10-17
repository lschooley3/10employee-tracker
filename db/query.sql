SELECT department.department_name AS department, role.title, employee.last_name
FROM employee
LEFT JOIN department ON employee.department_id=department.id
JOIN role ON employee.role_id=role.id
ORDER BY department.department_name, role.title, employee.last_name;
