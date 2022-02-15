export default {
    methods: {
        fixText(str, max) {
            if (str.length > max)
                return str.substring(0, max) + '...';
            else
                return str;
        },
        saveObject(obj, name) {
            const json = JSON.stringify(obj);
            localStorage.setItem(name, json);
        },
        loadObject(name) {
            if (localStorage.getItem(name))
                return JSON.parse(localStorage.getItem(name));
            return null;
        },
        deleteObject(name, clear) {
            localStorage.removeItem(name);
            if (clear)
                localStorage.clear();
        },
        formatPrice(value) {
            let val = (value / 1).toFixed(2);
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        fixNumber: function (n) {
            return n < 10 ? "0" + n : n;
        },
        toFixedDateFormat: function (dt, format) {
            if (!dt) dt = new Date();

            var yyyy = dt.getFullYear();
            var MM = this.fixNumber(dt.getMonth() + 1);
            var dd = this.fixNumber(dt.getDate());

            var hh = this.fixNumber(dt.getHours());
            var mm = this.fixNumber(dt.getMinutes());
            var ss = this.fixNumber(dt.getSeconds());

            switch (format) {
                case "yyyy-MM-dd":
                    return `${yyyy}-${MM}-${dd}`;
            }

            return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`;
        },
        toFixedFormat(dt, format) {
            if (!dt) dt = new Date();
            var yyyy = dt.getFullYear();
            var MM = this.fixNumber(dt.getMonth() + 1);
            var dd = this.fixNumber(dt.getDate());

            var hh = this.fixNumber(dt.getHours());
            var mm = this.fixNumber(dt.getMinutes());
            var ss = this.fixNumber(dt.getSeconds());

            switch (format) {
                case "yyyy-MM-dd": return `${yyyy}-${MM}-${dd}`;
                case "yyyyMMdd": return `${yyyy}${MM}${dd}`;
            }

            return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`;
        },
        toFixedTime(dt) {
            if (!dt) dt = new Date();
            var hours = dt.getHours();
            var minutes = this.fixNumber(dt.getMinutes());
            var ampm = hours >= 12 ? "pm" : "am";

            hours = hours % 12;
            hours = hours ? hours : 12;
            return `${hours}:${minutes} ${ampm}`;
        },
        dayOfWeek(dt) {
            var date = new Date(dt);
            switch (date.getDay()) {
                case 0:
                    return "Domingo";
                case 1:
                    return "Lunes";
                case 2:
                    return "Martes";
                case 3:
                    return "Miércoles";
                case 4:
                    return "Jueves";
                case 5:
                    return "Viernes";
                case 6:
                    return "Sábado";
            }
        },
        dayName(date) {
            switch (date.getDay()) {
                case 0:
                    return "Domingo";
                case 1:
                    return "Lunes";
                case 2:
                    return "Martes";
                case 3:
                    return "Miércoles";
                case 4:
                    return "Jueves";
                case 5:
                    return "Viernes";
                case 6:
                    return "Sábado";
            }
        },
        monthName(date) {
            switch (date.getMonth()) {
                case 0: return "Enero";
                case 1: return "Febrero";
                case 2: return "Marzo";
                case 3: return "Abril";
                case 4: return "Mayo";
                case 5: return "Junio";
                case 6: return "Julio";
                case 7: return "Agosto";
                case 8: return "Septiembre";
                case 9: return "Octubre";
                case 10: return "Noviembre";
                case 11: return "Diciembre";
            }
        },
        monthNameByIndex(index) {
            switch (index) {
                case 0: return "Enero";
                case 1: return "Febrero";
                case 2: return "Marzo";
                case 3: return "Abril";
                case 4: return "Mayo";
                case 5: return "Junio";
                case 6: return "Julio";
                case 7: return "Agosto";
                case 8: return "Septiembre";
                case 9: return "Octubre";
                case 10: return "Noviembre";
                case 11: return "Diciembre";
            }
        },
        initDayOfWeekDate(day, offset) {
            var today = new Date(day);
            if (offset)
                today.setDate(today.getDate() - (today.getDay() + offset) + 1);
            else
                today.setDate(today.getDate() - today.getDay() + 1);
            return today;
        },
        getMonthOfDate(fullDate) {
            return fullDate.toString().substring(4, 6);
        },
        getWeekOfDate(d) {
            // Create a copy of this date object
            var target = new Date(d.valueOf());

            // ISO week date weeks start on monday
            // so correct the day number
            var dayNr = (d.getDay() + 6) % 7;

            // Set the target to the thursday of this week so the
            // target date is in the right year
            target.setDate(target.getDate() - dayNr + 3);

            // ISO 8601 states that week 1 is the week
            // with january 4th in it
            var jan4 = new Date(target.getFullYear(), 0, 4);

            // Number of days between target date and january 4th
            var dayDiff = (target - jan4) / 86400000;

            // Calculate week number: Week 1 (january 4th) plus the
            // number of weeks between target date and january 4th
            var weekNr = 1 + Math.ceil(dayDiff / 7);
            return weekNr;
        },
        pad(number, size) {
            var s = String(number);
            while (s.length < (size || 2)) {
                s = "0" + s;
            }
            return s;
        },
    }
};