export function isLeap(year){
    if(year == undefined || year == null || typeof(year) != 'number'){
        throw Error()
    }

    if (!Number.isInteger(year) || year < 1582){
        throw Error()
    }

    return year%4 === 0 && year%100 !== 0 || year%400 === 0
}