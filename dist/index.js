import inquirer from "inquirer";
import { pool, connectToDb } from "./connections.js";
await connectToDb();
async function startMenu() {
    inquirer
        .prompt([
        {
            type: "list",
            name: "name",
            message: "Welcome to the employee tracker! Please select an action:",
            choices: [
                "View all employees",
                "View all roles",
                "View all departments",
                "Add an employee",
                "Add a role",
                "Add a department",
                "Update an employee role",
                "Exit",
            ],
        },
    ])
        .then((answers) => {
        switch (answers.name) {
            case "View all employees":
                console.log("View all employees");
                let employeeSQL = `SELECT * FROM employee`;
                pool.query(employeeSQL, (err, res) => {
                    if (err) {
                        console.log(err);
                    }
                    console.table(res.rows);
                    startMenu();
                });
                break;
            case "View all roles":
                console.log("View all roles");
                let roleSQL = `SELECT * FROM role`;
                pool.query(roleSQL, (err, res) => {
                    if (err) {
                        console.log(err);
                    }
                    console.table(res.rows);
                    startMenu();
                });
                break;
            case "View all departments":
                console.log("View all departments");
                let departmentSQL = `SELECT * FROM department`;
                pool.query(departmentSQL, (err, res) => {
                    if (err) {
                        console.log(err);
                    }
                    console.table(res.rows);
                    startMenu();
                });
                break;
            case "Add an employee":
                console.log("Add an employee");
                pool.query(`SELECT * FROM role`, (err, res) => {
                    if (err) {
                        console.log(err);
                    }
                    console.table(res.rows);
                    inquirer
                        .prompt([
                        {
                            type: "input",
                            name: "first_name",
                            message: "Enter the employee's first name:",
                        },
                        {
                            type: "input",
                            name: "last_name",
                            message: "Enter the employee's last name:",
                        },
                        {
                            type: "list",
                            name: "role_id",
                            message: "Choose the employee's role:",
                            choices: res.rows.map((role) => {
                                return { name: role.title, value: role.id };
                            }),
                        },
                        {
                            type: "input",
                            name: "manager_id",
                            message: "Enter the employee's manager ID:",
                        },
                    ])
                        .then((answers) => {
                        let employeeAddSQL = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`;
                        let employeeAddParams = [
                            answers.first_name,
                            answers.last_name,
                            answers.role_id,
                            answers.manager_id,
                        ];
                        pool.query(employeeAddSQL, employeeAddParams, (err) => {
                            if (err) {
                                console.log(err);
                            }
                            console.log("Employee added successfully!");
                            startMenu();
                        });
                    });
                });
                break;
            case "Add a role":
                console.log("Add a role");
                pool.query(`SELECT * FROM department`, (err, res) => {
                    if (err) {
                        console.log(err);
                    }
                    console.table(res.rows);
                    inquirer
                        .prompt([
                        {
                            type: "input",
                            name: "title",
                            message: "Enter the role's title:",
                        },
                        {
                            type: "input",
                            name: "salary",
                            message: "Enter the role's salary:",
                        },
                        {
                            type: "list",
                            name: "department_id",
                            message: "Select the department:",
                            choices: res.rows.map((department) => {
                                return { name: department.name, value: department.id };
                            }),
                        },
                    ])
                        .then((answers) => {
                        let roleAddSQL = `INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)`;
                        let roleAddParams = [
                            answers.title,
                            answers.salary,
                            answers.department_id,
                        ];
                        pool.query(roleAddSQL, roleAddParams, (err) => {
                            if (err) {
                                console.log(err);
                            }
                            console.log("Role added successfully!");
                            startMenu();
                        });
                    });
                });
                break;
            case "Add a department":
                console.log("Add a department");
                inquirer
                    .prompt([
                    {
                        type: "input",
                        name: "name",
                        message: "Enter the department's name:",
                    },
                ])
                    .then((answers) => {
                    let departmentAddSQL = `INSERT INTO department (name) VALUES ($1)`;
                    let departmentAddParams = [answers.name];
                    pool.query(departmentAddSQL, departmentAddParams, (err) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log("Department added successfully!");
                        startMenu();
                    });
                });
                break;
            case "Update an employee role":
                console.log("Update an employee role");
                pool.query(`SELECT * FROM employee`, (err, employeeRes) => {
                    if (err) {
                        console.log(err);
                    }
                    console.table(employeeRes.rows);
                    pool.query(`SELECT * FROM role`, (err, roleRes) => {
                        if (err) {
                            console.log(err);
                        }
                        console.table(roleRes.rows);
                        inquirer
                            .prompt([
                            {
                                type: "list",
                                name: "employee_id",
                                message: "Select the employee to update:",
                                choices: employeeRes.rows.map((employee) => {
                                    return {
                                        name: employee.first_name + " " + employee.last_name,
                                        value: employee.id,
                                    };
                                }),
                            },
                            {
                                type: "list",
                                name: "role_id",
                                message: "Select the employee's new role:",
                                choices: roleRes.rows.map((role) => {
                                    return { name: role.title, value: role.id };
                                }),
                            },
                        ])
                            .then((answers) => {
                            let employeeUpdateSQL = `UPDATE employee SET role_id = $1 WHERE id = $2`;
                            let employeeUpdateParams = [
                                answers.role_id,
                                answers.employee_id,
                            ];
                            pool.query(employeeUpdateSQL, employeeUpdateParams, (err) => {
                                if (err) {
                                    console.log(err);
                                }
                                console.log("Employee role updated successfully!");
                                startMenu();
                            });
                        });
                    });
                });
                break;
            case "Exit":
                console.log("Goodbye!");
                process.exit(0); //No need for a break as it won't run any code after this
            default:
                console.log("Invalid selection");
                break;
        }
    });
}
startMenu();
