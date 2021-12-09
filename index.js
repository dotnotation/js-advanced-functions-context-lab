function createEmployeeRecord(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(array){
    return array.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(timeStamp){
    const timeIn = {
        type: "TimeIn",
        hour: parseInt(timeStamp.split(" ")[1]),
        date: timeStamp.split(" ")[0]
    }
    this.timeInEvents.push(timeIn)
    return this
}

function createTimeOutEvent(timeStamp){
    const timeOut = {
        type: "TimeOut",
        hour: parseInt(timeStamp.split(" ")[1]),
        date: timeStamp.split(" ")[0]
    }
    this.timeOutEvents.push(timeOut)
    return this
}

function hoursWorkedOnDate(timeStamp){
    const clockedIn = this.timeInEvents.find(employee => employee.date === timeStamp).hour
    const clockedOut = this.timeOutEvents.find(employee => employee.date === timeStamp).hour
    return (clockedOut - clockedIn)/100
}

function wagesEarnedOnDate(timeStamp){
    return (hoursWorkedOnDate.call(this, timeStamp) * this.payPerHour)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(array, firstName){
    return array.find(employee => employee.firstName)
}

function calculatePayroll(array){
    return array.reduce((total, employee) => total += allWagesFor.call(employee), 0)
}