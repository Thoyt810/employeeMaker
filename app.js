const Manager = require("./Manager.js");
const Engineer = require("./Engineer.js");
const Intern = require("./Intern.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./htmlRenderer");
const Employee = require("./Employee.js");

let employee = {
    name: "",
    id: "",
    email: "",
    role: ""
}

const employeeArray = [];

function makingEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your id number?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your email address?"
        },
        {
            type: "rawlist",
            name: "role",
            message: "What position are you?",
            choices: ["Manager", "Engineer", "Intern"]
        },
    ]).then(function (answers) {
        const position = answers.role
        if (position === "Manager") {
            let employee = new Manager(answers.name, answers.id, answers.email)
            function managerQuestion() {
                inquirer.prompt([
                    {
                        type: "input",
                        name: "officeNumber",
                        message: "What is your office number?",
                    }
                ]).then(function (answers2) {
                    employee ["officeNumber"] = answers2.officeNumber;
                    employeeArray.push(employee);
                    render(employeeArray)
                    anotherEmployee()
                })
            }
            managerQuestion();

        } else if (position === "Engineer") {
            let employee = new Engineer (answers.name, answers.id, answers.email)
            function engineerQuestion() {
                return inquirer.prompt([
                    {
                        type: "input",
                        name: "github",
                        message: "What is your Github username?",
                    },
                ]).then(function (answers2) {
                    employee["github"] = answers2.github
                    employeeArray.push(employee);
                    render(employeeArray)
                    anotherEmployee()  
                })
            }
            engineerQuestion()
        } else if (position === "Intern") {
            let employee = new Intern(answers.name, answers.id, answers.email);
            function internQuestion() {
                return inquirer.prompt([
                    {
                        type: "input",
                        name: "school",
                        message: "What is your school name?",
                    }
                ]).then(function (answers2) {
                    employee ["school"] = answers2.school
                    employeeArray.push(employee);
                    render(employeeArray)
                    anotherEmployee()
                })
            }
            internQuestion()
        }
    })

}

function anotherEmployee() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "confirm",
            message: "Do you want to make a team member?",
            properties: []
        }
    ]).then(function (answers) {
        if (answers.confirm === true) {
            makingEmployee()
        } else {
        }
    })
}

anotherEmployee();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
