// Клас Employee для всіх працівників
class Employee {
    constructor(firstName, lastName, baseSalary, experience) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.baseSalary = baseSalary;
        this.experience = experience;
    }

    // Метод для обчислення зарплати
    countedSalary() {
        if (this.experience > 5) {
            return this.baseSalary * 1.2 + 500;
        } else if (this.experience > 2) {
            return this.baseSalary + 200;
        } else {
            return this.baseSalary;
        }
    }
}

// Підклас Developer, що розширює Employee
class Developer extends Employee {
    constructor(firstName, lastName, baseSalary, experience) {
        super(firstName, lastName, baseSalary, experience);
    }
}

// Підклас Designer, що розширює Employee
class Designer extends Employee {
    constructor(firstName, lastName, baseSalary, experience, effCoeff) {
        super(firstName, lastName, baseSalary, experience);
        this.effCoeff = effCoeff;
    }

    // Перевизначений метод для обчислення зарплати
    countedSalary() {
        const baseSalary = super.countedSalary();
        return baseSalary * this.effCoeff;
    }
}

// Підклас Manager, що розширює Employee
class Manager extends Employee {
    constructor(firstName, lastName, baseSalary, experience, team) {
        super(firstName, lastName, baseSalary, experience);
        this.team = team;
    }

    // Перевизначений метод для обчислення зарплати
    countedSalary() {
        const baseSalary = super.countedSalary();
        let bonus = 0;

        if (this.team.length > 10) {
            bonus += 300;
        } else if (this.team.length > 5) {
            bonus += 200;
        }

        const numDevelopers = this.team.filter(employee => employee instanceof Developer).length;
        if (numDevelopers > this.team.length / 2) {
            bonus += baseSalary * 0.1;
        }

        return baseSalary + bonus;
    }
}

// Клас Department, що містить список менеджерів
class Department {
    constructor(managers) {
        this.managers = managers;
    }

    // Метод для обчислення та виведення зарплат всіх працівників
    giveSalary() {
        this.managers.forEach(manager => {
            console.log(`${manager.firstName} ${manager.lastName} отримав ${manager.countedSalary()} шекелів.`);
            manager.team.forEach(employee => {
                console.log(` - ${employee.firstName} ${employee.lastName} отримав ${employee.countedSalary()} шекелів.`);
            });
        });
    }
}

// Створення працівників
const dev1 = new Developer("John", "Doe", 3000, 3);
const dev2 = new Developer("Jane", "Smith", 3500, 6);
const designer1 = new Designer("Emily", "Brown", 3200, 4, 0.8);
const designer2 = new Designer("Michael", "Johnson", 3500, 7, 0.7);

// Створення команд менеджерів
const team1 = [dev1, dev2, designer1];
const team2 = [designer2];

// Створення менеджерів
const manager1 = new Manager("Alice", "Williams", 5000, 8, team1);
const manager2 = new Manager("Bob", "Jones", 5500, 10, team2);

// Створення відділу з менеджерами
const managers = [manager1, manager2];
const department = new Department(managers);

// Виведення зарплат
department.giveSalary();
