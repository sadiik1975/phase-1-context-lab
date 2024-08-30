// Create an employee record from an array of details
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Create multiple employee records from an array of arrays
function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
}

// Add a TimeIn event to the employee record
function createTimeInEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    });

    return this;
}

// Add a TimeOut event to the employee record
function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    });

    return this;
}

// Calculate the number of hours worked on a specific date
function hoursWorkedOnDate(date) {
    let inEvent = this.timeInEvents.find(e => e.date === date);
    let outEvent = this.timeOutEvents.find(e => e.date === date);

    return (outEvent.hour - inEvent.hour) / 100;
}

// Calculate the wages earned on a specific date
function wagesEarnedOnDate(date) {
    let hours = hoursWorkedOnDate.call(this, date);
    return hours * this.payPerHour;
}

// Calculate the total wages earned for all dates
const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date;
    });

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this), 0); // Ensures 'this' in reduce function is bound correctly

    return payable;
};

// Find an employee by their first name
function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName);
}

// Calculate the total payroll for all employees
function calculatePayroll(records) {
    return records.reduce((memo, record) => {
        return memo + allWagesFor.call(record);
    }, 0);
}

// Example usage
let employeeData = [
    ["John", "Doe", "Developer", 30],
    ["Jane", "Smith", "Manager", 50]
];

let employees = createEmployeeRecords(employeeData);

let employee = employees[0];
createTimeInEvent.call(employee, "2023-08-29 0900");
createTimeOutEvent.call(employee, "2023-08-29 1700");

console.log(wagesEarnedOnDate.call(employee, "2023-08-29")); // Outputs wages earned for that day
console.log(allWagesFor.call(employee)); // Outputs total wages for that employee
console.log(calculatePayroll(employees)); // Outputs total payroll for all employees

