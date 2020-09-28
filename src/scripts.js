export function getCurrentMonth()
{
    let date = new Date()
    return date.getFullYear()+"-"+("0" + (date.getMonth() + 1)).slice(-2)
}

export function getWeek(plusWeeks)
{   
    //currentWeek = getWeek(0), nextWeek = getWeek(1)...
    let date = new Date()
    let year = date.getFullYear()
    date.setHours(0, 0, 0, 0)
    date.setDate(date.getDate() + 3 + (7 * plusWeeks) - (date.getDay() + 6) % 7);
    let week1 = new Date(date.getFullYear(), 0, 4);
    let week = 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
    - 3 + (week1.getDay() + 6) % 7) / 7)
    return year+"-W"+week;
}

Date.prototype.getWeek = function() {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    var week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

export function weekToString(week)
{
    let y = week.slice(0,4)
    let w = week.slice(6,8)
    let d1 = new Date(''+y+'') 
    let numOfdaysPastSinceLastMonday = d1.getDay() - 1
    d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday)
    d1.setDate(d1.getDate() + (7 * (w - d1.getWeek()) - 1))
    let rangeIsFrom = d1.getDate() + "/" + (d1.getMonth() + 1) + "/" + d1.getFullYear()
    d1.setDate(d1.getDate() + 6);
    let rangeIsTo = d1.getDate() + "/" + (d1.getMonth() + 1) + "/" + d1.getFullYear() 
    return rangeIsTo + " - " + rangeIsFrom;
}

export default null;