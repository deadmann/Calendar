///<reference path="IDate.ts"/>
/**
 * Created by Hassan on 1/28/2016.
 */
// Help References:
// 1- http://www.aftabir.com/encyclopedia/urgent/calendar/chronometry/leapyear_new.php
var PersianDate = (function () {
    function PersianDate(year, month, day) {
        this.day = day;
        this.month = month;
        this.year = year;
    }
    PersianDate.isLeapYear = function (year) {
        var a = 0.025;
        var b = 266;
        var leapDays0;
        var leapDays1;
        var frac0;
        var frac1;
        if (year > 0) {
            leapDays0 = ((year + 38) % 2820) * 0.24219 + a; // 0.24219 ~ extra days of one year
            leapDays1 = ((year + 39) % 2820) * 0.24219 + a; // 38 days is the difference of epoch to 2820-year cycle
        }
        else if (year < 0) {
            leapDays0 = ((year + 39) % 2820) * 0.24219 + a;
            leapDays1 = ((year + 40) % 2820) * 0.24219 + a;
        }
        else {
            return false;
        }
        frac0 = Math.floor((leapDays0 - Math.floor(leapDays0)) * 1000);
        frac1 = Math.floor((leapDays1 - Math.floor(leapDays1)) * 1000);
        if (frac0 <= b && frac1 > b)
            return true;
        else
            return false;
    };
    PersianDate.prototype.isLeapYear = function () {
        PersianDate.isLeapYear(this.month);
    };
    PersianDate.prototype.getDaysInMonth = function () {
        switch (this.month) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
                return 31;
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
                return 30;
            case 12:
                return (this.isLeapYear() ? 30 : 29);
        }
        return undefined;
    };
    PersianDate.getDaysInMonth = function (year, month) {
        switch (month) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
                return 31;
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
                return 30;
            case 12:
                return (PersianDate.isLeapYear(year) ? 30 : 29);
        }
        return undefined;
    };
    PersianDate.prototype.getDaysInWeek = function () {
        return 7;
    };
    PersianDate.prototype.getDaysInYear = function () {
        return 365 + (this.isLeapYear() ? 1 : 0);
    };
    PersianDate.prototype.getMonthsInYear = function () {
        return 12;
    };
    PersianDate.prototype.getWeeksInYear = function () {
        return this.getDaysInYear() + (this.getWeekFirstDayOfYear()) / 7;
    };
    PersianDate.prototype.getWeeksInMonth = function () {
        //var month = this.getMonth();
        //var totalDaysToMonthStart = this.getMonthsTotalDays(month-1);
        //var totalDaysToNextMonthStart = this.getMonthsTotalDays(month);
        //var reminedDayWithoutStartingDay = totalDaysToMonthStart % 7;
        //var totalDaysToMonthStartPlusYearStartWeek = totalDaysToMonthStart + this.getWeekFirstDayOfYear();
        //var totalDaysToNextMonthPlusYearStartWeek = totalDaysToNextMonthStart + this.getWeekFirstDayOfYear();
        //
        //console.log("totalDaysToMonthStart: "+totalDaysToMonthStart);
        //console.log("totalDaysToNextMonthStart: "+totalDaysToNextMonthStart);
        //console.log("reminedDayWithoutStartingDay: "+reminedDayWithoutStartingDay);
        //
        //console.log("totalDaysToMonthStartPlusYearStartWeek: "+totalDaysToMonthStartPlusYearStartWeek);
        //console.log("totalDaysToNextMonthPlusYearStartWeek: "+totalDaysToNextMonthPlusYearStartWeek);
        //
        //weekToMonth= totalDaysToMonthStartPlusYearStartWeek/7;
        //weekToNextMonth=totalDaysToNextMonthPlusYearStartWeek/7;
        //
        //result = Math.ceil(weekToNextMonth - weekToMonth);
        //
        //console.log(weekToMonth);
        //console.log(weekToNextMonth);
        //
        //console.log(result);
        var remainedDaysFromBegin = 0;
        var remainedDaysFromEnd = 0;
        var monthRemainedDays = 0;
        var inLoopDaysFromBegin = this.getWeekFirstDayOfYear();
        for (var m = 1; m <= this.month; m++) {
            var startDaysInverse = 7 - inLoopDaysFromBegin;
            var daysInMonth = PersianDate.getDaysInMonth(this.year, m);
            monthRemainedDays = daysInMonth - startDaysInverse;
            var remainedDaysFromEndOfMonth = monthRemainedDays % 7;
            inLoopDaysFromBegin = remainedDaysFromEndOfMonth;
            remainedDaysFromBegin = startDaysInverse;
            remainedDaysFromEnd = remainedDaysFromEndOfMonth;
        }
        var remainedFullWeek = Math.floor(monthRemainedDays / 7);
        return ((remainedDaysFromBegin > 0) ? 1 : 0) + remainedFullWeek + ((remainedDaysFromEnd > 0) ? 1 : 0);
    };
    PersianDate.prototype.getMonthsTotalDays = function (month) {
        if (month <= 6) {
            return month * 31;
        }
        else if (month <= 11) {
            return 186 + ((month - 6) * 30);
        }
        return this.getDaysInYear();
    };
    PersianDate.prototype.getWeekFirstDayOfYear = function () {
        var n = this.year;
        var a = n - 1;
        var b = a + 2346;
        var yearLength = b * 365.24219879; //tool sal motevasete khorshidi
        var c = Math.ceil(yearLength);
        //نظر به آنکه مبداء سال ۲۳۴۶- روز سه‌شنبه بوده است (و با انتساب اعداد صفر و يک تا شش به شنبه و يکشنبه تا جمعه) به C سه واحد مى‌افزائيم يا از آن چهار واحد کم مى‌کنيم تا به مبداء شنبه انتقال يابيم و عدد حاصل را d مى‌ناميم.
        var d = c + 3;
        var r = d % 7;
        console.log("First day of year: " + r);
        return r;
    };
    /**
     * Alias for getDayOfMonth
     * @returns {number}
     */
    PersianDate.prototype.getDay = function () {
        return this.getDayOfMonth();
    };
    PersianDate.prototype.getWeekOfYear = function () {
        console.log("Week of Year: " + this.getDayOfYear() + this.getWeekFirstDayOfYear() / 7);
        return this.getDayOfYear() + this.getWeekFirstDayOfYear() / 7;
    };
    PersianDate.prototype.getWeekOfMonth = function () {
        return undefined;
    };
    PersianDate.prototype.getDayOfWeek = function () {
        return undefined;
    };
    PersianDate.prototype.getDayOfMonth = function () {
        return this.day;
    };
    PersianDate.prototype.getDayOfYear = function () {
        var previousMonthTotalDays = this.getMonthsTotalDays(this.month - 1);
        return previousMonthTotalDays + this.day;
    };
    PersianDate.prototype.getMonth = function () {
        return this.month;
    };
    PersianDate.prototype.getYear = function () {
        return this.year;
    };
    return PersianDate;
}());
//# sourceMappingURL=PersianDate.js.map