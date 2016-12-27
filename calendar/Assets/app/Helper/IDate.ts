/**
 * Created by Hassan on 1/28/2016.
 */
interface IDate{
    day:number;
    month:number;
    year:number;
    firstDayOfWeek:number;

    getDaysInMonth():number;
    getDaysInWeek():number;
    getDaysInYear():number;
    getMonthsInYear():number;
    getWeeksInYear():number;
    getWeeksInMonth():number;
    getWeekFirstDayOfYear():number;
    getDay():number;
    getWeekOfYear():number;
    getWeekOfMonth():number;
    getDayOfWeek():number;
    getDayOfMonth():number;
    getDayOfYear():number;
    getMonth():number;
    getYear():number;
}