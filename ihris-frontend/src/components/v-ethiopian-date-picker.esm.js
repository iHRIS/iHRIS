import { VDatePickerHeader, VDatePickerMonthTable, VDatePickerDateTable, VDatePicker } from 'vuetify/lib';
import { pad } from 'vuetify/lib/components/VDatePicker/util';
import isDateAllowed from 'vuetify/lib/components/VDatePicker/util/isDateAllowed';
import ethiopicCalendar from 'ethiopic-calendar';

/*
let passiveSupported = false;

try {
  if (typeof window !== 'undefined') {
    const testListenerOpts = Object.defineProperty({}, 'passive', {
      get: () => {
        passiveSupported = true;
      }
    });
    window.addEventListener('testListener', testListenerOpts, testListenerOpts);
    window.removeEventListener('testListener', testListenerOpts, testListenerOpts);
  }
} catch (e) {
  console.warn(e);
}

const keyCodes = Object.freeze({
  enter: 13,
  tab: 9,
  delete: 46,
  esc: 27,
  space: 32,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  end: 35,
  home: 36,
  del: 46,
  backspace: 8,
  insert: 45,
  pageup: 33,
  pagedown: 34
}); // This remaps internal names like '$cancel' or '$vuetify.icons.cancel'
*/
function wrapInArray(v) {
  return v != null ? Array.isArray(v) ? v : [v] : [];
}

class ETDate {


  constructor( year, month, date ) { 
    if ( year && month && date ) {
      this.year = year;
      this.month = month;
      this.date = date;
    } else {
      const now = new Date();
      this.fromGregorian( now.getFullYear(), now.getMonth()+1, now.getDate() );
    }   
  }

  getMonthName(locale) {
    const ETmonths = {
      en: [
        "Mäskäräm", "Ṭəqəmt", "Ḫədar", "Taḫśaś", "Ṭərr", "Yäkatit",
        "Mägabit", "Miyazya", "Gənbo", "Säne", "Ḥamle", "Nähase", "Ṗagume"
      ],
      am: [
        "መስከረም", "ጥቅምት", "ኅዳር", "ታኅሣሥ", "ጥር", "የካቲት", "መጋቢት",
        "ሚያዝያ", "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ጳጉሜን"
      ]
    };
    if ( !ETmonths.hasOwnProperty(locale) ) {
      locale = 'en';
    }
    return ETmonths[locale][this.month-1]
  }

  getDayName(locale) {
    var ETdays = {
      en: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
      am: [ "እሑድ", "ሰኞ", "ማክሰ", "ረቡዕ", "ሐሙስ", "ዓርብ", "ቅዳሜ" ]
    };
    if ( !ETdays.hasOwnProperty(locale) ) {
      locale = 'en';
    }
    return ETdays[locale][this.dayOfWeek()]
  }

  getDayAbbrev(locale) {
    var ETdays_short = {
      en: [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ],
      am: [ "እ", "ሰ", "ማ", "ረ", "ሐ", "ዓ", "ቅ" ]
    };
    if ( !ETdays_short.hasOwnProperty(locale) ) {
      locale = 'en';
    }
    return ETdays_short[locale][this.dayOfWeek()]
  }

  toString() {
    return pad(this.year, 4)+"-"+pad(this.month)+"-"+pad(this.date)
  }

  fromGregorian( year, month, date ) {
      let ge = ethiopicCalendar.ge( year, month, date );
      this.year = ge.year;
      this.month = ge.month;
      this.date = ge.day;
  }

  toGregorian() {
    let eg = ethiopicCalendar.eg( this.year, this.month, this.date );
    return { year: eg.year, month: eg.month, date: eg.day }
  }

  toGregorianString() {
    let eg = ethiopicCalendar.eg( this.year, this.month, this.date );
    return pad(eg.year, 4) +"-"+ pad(eg.month) +"-"+ pad(eg.day)
  }

  dayOfWeek() {
    const gDate = new Date( this.toGregorianString() );
    return (gDate.getDay()+1) % 7
  }
  
  daysInMonth() {
    if ( this.month < 13 ) {
      return 30
    } else if ( this.year % 4 === 3 ) {
      return 6
    } else {
      return 5
    }
  }

  weekOfYear() {
    let firstDay = new ETDate( this.year, 1, 1 );
    let numDays = ((this.month-1)*30) + this.date + firstDay.dayOfWeek();
    let numWeek = Math.floor(numDays / 7) + 1;
    return numWeek
  }

    format(type, locale) {
    if ( type === 'day' ) {
      return this.date
    } else if ( type === 'year' ) {
      return this.year
    } else if ( type === 'month' ) {
      return this.getMonthName(locale)
    } else if ( type === 'date' ) {
      return this.getDayName(locale) + " " + this.getMonthName(locale)
        + " " + this.date + "፣ " + this.year
    } else if ( type === "monthYear" ) {
      return this.getMonthName(locale) + " " + this.year
    } else if ( type === 'weekday' ) {
      return this.getDayAbbrev(locale)
    }
  }

}


function createFormatter(type, locale) {
  return dateString => {
    const [year, month, date] = dateString.trim().split(' ')[0].split('-').map(Number);

    const et_date = new ETDate(year, month || 1, date || 1);

    return et_date.format(type, locale)
  }
}

function daysInMonth(year, month){
  let etdate = new ETDate( year, month, 1 );
  return etdate.daysInMonth()
}

function firstDayOfTheMonth(year, month) {
  let etdate = new ETDate( year, month, 1 );
  return etdate.dayOfWeek()
}

function weekOfYear(year, month, date) {
  let etdate = new ETDate( year, month, date );
  return etdate.weekOfYear()
}

function monthChange(value, sign) {
  const [year, month] = value.split('-').map(Number);

  if (month + sign === 0) {
    return `${year - 1}-13`
  } else if (month + sign === 14) {
    return `${year + 1}-01`
  } else {
    return `${year}-${pad(month + sign)}`
  }
}

var VEthiopianDatePickerHeader = {
    extends: VDatePickerHeader,
    computed: {
        formatter() {
            return this.format || createFormatter(String(this.value).split('-')[1] ? 'monthYear' : 'year', this.currentLocale);
        }
    },
    methods: {
        calculateChange (sign) {
            const [year, month] = String(this.value).split('-').map(Number);

            if (month == null) {
                return `${year + sign}`
            } else {
                return monthChange(String(this.value), sign)
            }   
        }   
    }   
};

var VEthiopianDatePickerMonthTable = {
    extends: VDatePickerMonthTable,
    computed: {
        formatter() {
            return this.format || createFormatter('month', this.currentLocale);
        }
    },
    methods: {
        genTBody() {
            const children = [];
            const cols = Array(4).fill(null);
            const rows = 13 / cols.length;
    
            for (let row = 0; row < rows; row++) {
                const tds = cols.map((_, col) => {
                    const month = row * cols.length + col;
                    if ( month > 12 ) return
                    const date = `${this.displayedYear}-${pad(month + 1)}`;
                    return this.$createElement('td', { key: month }, [this.genButton(date, false, 'month', this.formatter)]);
                });
                children.push(this.$createElement('tr', { key: row }, tds));
            }
    
            return this.$createElement('tbody', children);
        },
        genButton(value, isFloating, mouseEventType, formatter) {
            const isAllowed = isDateAllowed(value, this.min, this.max, this.allowedDates);
            const isSelected = this.isSelected(value) && isAllowed;
            const isCurrent = value === this.current;
            const setColor = isSelected ? this.setBackgroundColor : this.setTextColor;
            const color = (isSelected || isCurrent) && (this.color || 'accent');
            return this.$createElement('button', setColor(color, {
                staticClass: 'v-btn',
                class: this.genButtonClasses(isAllowed, isFloating, isSelected, isCurrent),
                attrs: {
                    type: 'button'
                },
                domProps: {
                    disabled: this.disabled || !isAllowed
                },
                on: this.genButtonEvents(value, isAllowed, mouseEventType)
            }), [this.$createElement('div', {
                staticClass: 'v-btn__content'
            }, [formatter(value)]), this.genEvents(value)]);
        },
    }
};

var VEthiopianDatePickerDateTable = {
    extends: VDatePickerDateTable,
    computed: {
        formatter() {
            return this.format || createFormatter('day', this.currentLocale);
        },
        weekdayFormatter() {
            return this.weekdayFormat || createFormatter('weekday', this.currentLocale);
        },
        weekDays() {
          const first = parseInt( this.firstDayOfWeek, 10 );
          return Array(7).fill().map( (x,i) => this.weekdayFormatter(`2013-01-${first + i + 10}`))
        }
    },
    methods: {
        weekDaysBeforeFirstDayOfTheMonth() {
            const weekDay = firstDayOfTheMonth(this.displayedYear, this.displayedMonth);
            return (weekDay - parseInt(this.firstDayOfWeek) + 7) % 7;
        },

        getWeekNumber(dayInMonth) {
            return weekOfYear(this.displayedYear, this.displayedMonth, dayInMonth)
        },

        genTBody() {
            const children = [];
            const daysInCurrentMonth = daysInMonth(this.displayedYear, this.displayedMonth);
            let rows = [];
            let day = this.weekDaysBeforeFirstDayOfTheMonth();
    
            if (this.showWeek) {
                rows.push(this.genWeekNumber(this.getWeekNumber(1)));
            }
    
            while (day--) rows.push(this.$createElement('td'));
    
            for (day = 1; day <= daysInCurrentMonth; day++) {
                const date = `${this.displayedYear}-${pad(this.displayedMonth)}-${pad(day)}`;
                rows.push(this.$createElement('td', [this.genButton(date, true, 'date', this.formatter)]));
    
                if (rows.length % (this.showWeek ? 8 : 7) === 0) {
                    children.push(this.genTR(rows));
                    rows = [];
        
                    if (this.showWeek && day < daysInCurrentMonth) {
                        rows.push(this.genWeekNumber(this.getWeekNumber((day + 7) > daysInCurrentMonth ? daysInCurrentMonth : (day + 7))));
                    }
                }
            }
    
            if (rows.length) {
                children.push(this.genTR(rows));
            }
    
            return this.$createElement('tbody', children);
        },
    }
};

function sanitizeDateString(dateString, type) {
    const [year, month = 1, date = 1] = dateString.split("-");
    return `${year}-${pad(month)}-${pad(date)}`.substr(
        0,
        {
            date: 10,
            month: 7,
            year: 4
        }[type]
    );
}

var VEthiopianDatePicker = {
    extends: VDatePicker,
    name: "VEthiopianDatePicker",
    props: {
        max: {
            type: String,
            validator: dateString => {
                return Number(sanitizeDateString(dateString, 'year')) <= 3000
            }
        },
        min: {
            type: String,
            validator: dateString => {
                return Number(sanitizeDateString(dateString, 'year')) >= 1
            }
        },
    },
    data() {
      const now = new ETDate();
        return {
            activePicker: this.type.toUpperCase(),
            inputDay: null,
            inputMonth: null,
            inputYear: null,
            isReversing: false,
            now,
            tableDate: (() => {
                if (this.pickerDate) {
                    return this.pickerDate;
                }

                const multipleValue = wrapInArray(this.value);
                const date = multipleValue[multipleValue.length - 1] || (typeof this.showCurrent === 'string' ? this.showCurrent : `${now.year}-${now.month}`);
                return sanitizeDateString(date, this.type === 'date' ? 'month' : 'year');
            })(),
        };
    },
    computed: {
        current() {
            if (this.showCurrent === true) {
                return sanitizeDateString(`${this.now.year}-${this.now.month}-${this.now.date}`, this.type);
            }
            return this.showCurrent || null;
        },

        inputDate() {
            return this.type === 'date' ? `${this.inputYear}-${pad(this.inputMonth)}-${pad(this.inputDay)}` : `${this.inputYear}-${pad(this.inputMonth)}`;
        },

        tableMonth() {
            return Number((this.pickerDate || this.tableDate).split('-')[1]);
        },

        minMonth() {
            return this.min ? sanitizeDateString(this.min, 'month') : "1900-01"
        },
      
        maxMonth() {
            return this.max ? sanitizeDateString(this.max, 'month') : "2100-13"
        },
      
        minYear() {
            return this.min ? sanitizeDateString(this.min, 'year') : "1900"
        },
      
        maxYear() {
            return this.max ? sanitizeDateString(this.max, 'year') : "2100"
        },
      
        formatters() {
            return {
                year: createFormatter('year', this.currentLocale),
                titleDate: this.titleDateFormat || (this.isMultiple ? this.defaultTitleMultipleDateFormatter : this.defaultTitleDateFormatter)
            };
        },

        defaultTitleDateFormatter() {
            const titleDateFormatter = createFormatter(this.type, this.currentLocale);
    
            const landscapeFormatter = date => titleDateFormatter(date).replace(/([^\d\s])([\d])/g, (match, nonDigit, digit) => `${nonDigit} ${digit}`).replace(', ', ',<br>');
    
            return this.landscape ? landscapeFormatter : titleDateFormatter;
        }
    },
    methods: {
        yearClick(value) {
            this.inputYear = value;
    
            if (this.type === 'month') {
                this.tableDate = `${value}`;
            } else {
                this.tableDate = `${value}-${pad(this.tableMonth || 1)}`;
            }
    
            this.activePicker = 'MONTH';
    
            if (this.reactive && !this.readonly && !this.isMultiple && this.isDateAllowed(this.inputDate)) {
                this.$emit('input', this.inputDate);
            }
        },

        monthClick(value) {
            this.inputYear = parseInt(value.split('-')[0], 10);
            this.inputMonth = parseInt(value.split('-')[1], 10);
    
            if (this.type === 'date') {
                if (this.inputDay) {
                    this.inputDay = Math.min(this.inputDay, daysInMonth(this.inputYear, this.inputMonth));
                }
    
                this.tableDate = value;
                this.activePicker = 'DATE';
    
                if (this.reactive && !this.readonly && !this.isMultiple && this.isDateAllowed(this.inputDate)) {
                    this.$emit('input', this.inputDate);
                }
            } else {
                this.emitInput(this.inputDate);
            }
        },
      
        dateClick(value) {
            this.inputYear = parseInt(value.split('-')[0], 10);
            this.inputMonth = parseInt(value.split('-')[1], 10);
            this.inputDay = parseInt(value.split('-')[2], 10);
            this.emitInput(this.inputDate);
        },
        
        genTableHeader() {
            return this.$createElement(VEthiopianDatePickerHeader, {
                props: {
                    nextIcon: this.nextIcon,
                    color: this.color,
                    dark: this.dark,
                    disabled: this.disabled,
                    format: this.headerDateFormat,
                    light: this.light,
                    locale: this.locale,
                    min: this.activePicker === 'DATE' ? this.minMonth : this.minYear,
                    max: this.activePicker === 'DATE' ? this.maxMonth : this.maxYear,
                    nextAriaLabel: this.activePicker === 'DATE' ? this.nextMonthAriaLabel : this.nextYearAriaLabel,
                    prevAriaLabel: this.activePicker === 'DATE' ? this.prevMonthAriaLabel : this.prevYearAriaLabel,
                    prevIcon: this.prevIcon,
                    readonly: this.readonly,
                    value: this.activePicker === 'DATE' ? `${pad(this.tableYear, 4)}-${pad(this.tableMonth)}` : `${pad(this.tableYear, 4)}`
                },
                on: {
                    toggle: () => this.activePicker = this.activePicker === 'DATE' ? 'MONTH' : 'YEAR',
                    input: value => this.tableDate = value
                }
            });
        },

        genDateTable() {
            return this.$createElement(VEthiopianDatePickerDateTable, {
                props: {
                    allowedDates: this.allowedDates,
                    color: this.color,
                    current: this.current,
                    dark: this.dark,
                    disabled: this.disabled,
                    events: this.events,
                    eventColor: this.eventColor,
                    firstDayOfWeek: this.firstDayOfWeek,
                    format: this.dayFormat,
                    light: this.light,
                    locale: this.locale,
                    localeFirstDayOfYear: this.localeFirstDayOfYear,
                    min: this.min,
                    max: this.max,
                    range: this.range,
                    readonly: this.readonly,
                    scrollable: this.scrollable,
                    showWeek: this.showWeek,
                    tableDate: `${pad(this.tableYear, 4)}-${pad(this.tableMonth + 1)}`,
                    value: this.value,
                    weekdayFormat: this.weekdayFormat
                },
                ref: 'table',
                on: {
                    input: this.dateClick,
                    'update:table-date': value => this.tableDate = value,
                    'click:date': value => this.$emit('click:date', value),
                    'dblclick:date': value => this.$emit('dblclick:date', value),
                }
            });
        },
        
        genMonthTable() {
            return this.$createElement(VEthiopianDatePickerMonthTable, {
                props: {
                    allowedDates: this.type === 'month' ? this.allowedDates : null,
                    color: this.color,
                    current: this.current ? sanitizeDateString(this.current, 'month') : null,
                    dark: this.dark,
                    disabled: this.disabled,
                    events: this.type === 'month' ? this.events : null,
                    eventColor: this.type === 'month' ? this.eventColor : null,
                    format: this.monthFormat,
                    light: this.light,
                    locale: this.locale,
                    min: this.minMonth,
                    max: this.maxMonth,
                    range: this.range,
                    readonly: this.readonly && this.type === 'month',
                    scrollable: this.scrollable,
                    value: this.selectedMonths,
                    tableDate: `${pad(this.tableYear, 4)}`
                },
                ref: 'table',
                on: {
                    input: this.monthClick,
                    'update:table-date': value => this.tableDate = value,
                    'click:month': value => this.$emit('click:month', value),
                    'dblclick:month': value => this.$emit('dblclick:month', value),
                }
            });
        },

        setInputDate() {
            if (this.lastValue) {
                const array = this.lastValue.split('-');
                this.inputYear = parseInt(array[0], 10);
                this.inputMonth = parseInt(array[1], 10);
        
                if (this.type === 'date') {
                    this.inputDay = parseInt(array[2], 10);
                }
            } else {
                this.inputYear = this.inputYear || this.now.year;
                this.inputMonth = this.inputMonth == null ? this.inputMonth : this.now.month;
                this.inputDay = this.inputDay || this.now.date;
            }
        },
    }
};

export default VEthiopianDatePicker;
