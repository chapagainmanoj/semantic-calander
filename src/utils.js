export const getUnhandledProps = (Component, props) => {
  // NOTE: that `handledProps` are generated automatically during build with `babel-plugin-transform-react-handled-props`
  const { handledProps = [] } = Component;

  return Object.keys(props).reduce((acc, propKey) => {
    if (propKey === 'childKey') return acc;
    if (handledProps.indexOf(propKey) === -1) acc[propKey] = props[propKey];
    return acc;
  }, {});
};

export const WEEKDAYS = 'Sun Mon Tue Wed Thu Fri Sat'.split(' ');
export const SHORT_MONTHS = 'JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC'.split(' ');
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const arrayGen = (n, func) => Array.apply(null, {length: n}).map(Function.call, func)

export const HOURS = arrayGen(24, (n) => (n<10 ? '0'+n: ''+n))
export const MINIUTES = arrayGen(12, (n) => (n<2 ? '0'+n*5: ''+n*5))

/**
 * Returns date according to passed format
 *
 * @param {Date}   dt     Date object
 * @param {String} format Format string
 *      d    - day of month
 *      dd   - 2-digits day of month
 *      D    - day of week
 *      m    - month
 *      mm   - 2-digits month number
 *      M    - short month name
 *      MM   - full month name
 *      yy   - 2-digits year number
 *      yyyy - 4-digits year number
 *      hh: hour mt: minutes ss: second
 */

export const parseFormatedTime = (time, format) => {
  let del = format.replace(/(hh|mt)/g, '');
  return time.split(del);
}
export const getFormatedDate = (dt, format) => {
    let items = {
        d   : dt.getDate(),
        dd  : dt.getDate(),
        D   : dt.getDay(),
        mm  : dt.getMonth() + 1,
        M   : dt.getMonth(),
        MM  : dt.getMonth(),
        yy  : dt.getFullYear().toString().substr(-2),
        yyyy: dt.getFullYear(),
        hh  : format.includes('12') ? dt.getHours()%12 : dt.getHours(),
        mt  : dt.getMinutes(),
        ss  : dt.getSeconds(),
        12  : dt.getHours() < 12 ? 'AM': 'PM'
    };

    items.dd < 10 && (items.dd = '0' + items.dd);
    items.mm < 10 && (items.mm = '0' + items.mm);
    items.hh < 10 && (items.hh = '0' + items.hh);
    items.mt < 10 && (items.mt = '0' + items.mt);
    items.ss < 10 && (items.ss = '0' + items.ss);
    items.D = WEEKDAYS[items.D ? items.D - 1 : 6];
    items.M = SHORT_MONTHS[items.M];
    items.MM = MONTHS[items.MM];

    return format.replace(/(?:mt|[dmM]{1,2}|D|yyyy|12|yy|hh|ss)/g, function(m)
    {
        return typeof items[m] !== 'undefined' ? items[m] : m;
    });
}

export const isDatesEqual = (dt1, dt2) => {
  dt1.setHours(0,0,0,0);
  dt2.setHours(0,0,0,0);
  return dt1.getTime() === dt2.getTime();;
}

export const isPast = (dt, date = new Date()) => {
  date.setHours(0,0,0,0);
  dt.setHours(0,0,0,0);
  return dt.getTime() < date.getTime();
}

export const isDateInMonth = (dt, mt) => dt.getMonth() === mt;

export const getFirstDay = (dt) => {
  return (new Date(dt.getFullYear(), dt.getMonth(), 1));
}

export const getLastDay = (dt) => {
  return (new Date(dt.getFullYear(), dt.getMonth()+1, 0));
}

export const isDate = (dt) => {
  return dt instanceof Date;
}
