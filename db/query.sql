SELECT department.department_name AS department, role.title, employee.last_name FROM employee
JOIN role ON employee.role_id=role.id
ORDER BY department.department_name, role.title, employee.last_name;
LEFT JOIN employee ON manager_id=employee.id