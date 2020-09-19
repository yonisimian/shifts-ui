export function getCurrentMonth()
{
    let date = new Date()
    return date.getFullYear()+"-"+("0" + (date.getMonth() + 1)).slice(-2)
}

export function getWeek(plusWeeks)
{   
    //current week = getWeek(0), next week = getWeek(1)
    let date = new Date()
    let year = date.getFullYear()
    date.setHours(0, 0, 0, 0)
    date.setDate(date.getDate() + 3 + (7 * plusWeeks) - (date.getDay() + 6) % 7);
    let week1 = new Date(date.getFullYear(), 0, 4);
    let week = 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
    - 3 + (week1.getDay() + 6) % 7) / 7)
    return year+"-W"+week;
}
export default null;