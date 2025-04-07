/*CREATE DATABASE company_db1;
USE company_db1;
CREATE TABLE employees1 (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    department VARCHAR(50),
    salary DECIMAL(10, 2),
    hire_date DATE,
    age INT,
    department_id INT,
    manager_id INT
);*/

/*CREATE TABLE departments1 (
    id INT PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(50)
);
INSERT INTO departments1 (department_name) VALUES ('HR'), ('IT'), ('Finance');

INSERT INTO employees1 (first_name, last_name, department, salary, hire_date, age, department_id, manager_id) 
VALUES 
('John', 'Doe', 'IT', 50000, '2021-06-15', 30, 2, NULL),
('Jane', 'Smith', 'HR', 60000, '2019-08-01', 45, 1, NULL),
('Alice', 'Brown', 'Finance', 70000, '2020-01-10', 38, 3, 1),
('Bob', 'White', 'IT', 55000, '2022-03-22', 28, 2, 1);*/
SELECT * FROM employees1;
SELECT DISTINCT department FROM employees1;
SELECT SUM(salary) AS total_salary FROM employees1;
UPDATE employees1 SET salary = 60000 WHERE id = 10;
SELECT MAX(salary) AS highest_salary FROM employees1;
SELECT * FROM employees1 WHERE hire_date > '2020-01-01';
SELECT department, COUNT(*) AS employee_count FROM employees1 GROUP BY department;
DELETE FROM employees1 WHERE age > 60;
SELECT first_name, last_name, department FROM employees1;
SELECT e.*, d.department_name FROM employees1 e 
JOIN departments1 d ON e.department_id = d.id;
SELECT * FROM employees1 WHERE salary > (SELECT AVG(salary) FROM employees1);
SELECT DISTINCT salary FROM employees1 ORDER BY salary DESC LIMIT 1 OFFSET 1;
SELECT * FROM employees1 WHERE first_name LIKE 'J%';
SELECT * FROM employees1 WHERE manager_id IS NULL;
UPDATE departments1 SET department_name = 'New Name' WHERE id = 5;
SELECT * FROM employees1 ORDER BY hire_date DESC;
SELECT * FROM employees1 WHERE department_id = 
(SELECT department_id FROM employees1 WHERE id = 15);
SELECT * FROM employees1 ORDER BY hire_date ASC;
SELECT department, AVG(salary) AS average_salary FROM employees1 GROUP BY department;
SELECT * FROM employees1 LIMIT 10;


