const Employee = require("./Employee.js")

class Manager extends Employee {
    constructor(officeNumber) {
        super(name, id, email)
        this.officeNumber = officeNumber
    }

    getRole() {
        return "Manager"
    }
}

module.exports = Manager;
