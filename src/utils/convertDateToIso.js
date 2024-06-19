import { format } from "date-fns";
import dayjs from "dayjs";
const convertDateToIso = (newValue) => {
  if (newValue === null) {
    return "";
  } else {
    const year = newValue.$y;
    const month = newValue.$M + 1;
    const day = newValue.$D;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedDateString = `${year}-${formattedMonth}-${formattedDay}T21:00:00.000Z`;
    return formattedDateString;
  }
};

const convertDateToFormat = (dateObj, dateFormat = "yyyy-MM-dd") => {
  // Ensure dateObj is a valid date object or has necessary properties
  if (!dateObj || !dateObj.$y || !dateObj.$M || !dateObj.$D) {
    return "";
  }

  // Extract components from the date object
  const year = dateObj.$y;
  const month = dateObj.$M + 1; // $M is zero-based, so add 1 to get the correct month
  const day = dateObj.$D;
  const date = new Date(year, dateObj.$M, day); // month is 0-indexed in Date
  const formattedDate = format(date, dateFormat);
  return formattedDate;
};
const convertIsoToDateObject = (isoString) => {
  if (!isoString) {
    return null;
  } else {
    const date = dayjs(isoString);
    return {
      $y: date.year(),
      $M: date.month(),
      $D: date.date() - 1,
      $H: date.hour(),
      $m: date.minute(),
      $s: date.second(),
      $ms: date.millisecond(),
      $L: date.locale(),
      $d: date.toDate(),
      $u: undefined,
      $x: {},
      $isDayjsObject: true,
    };
  }
};

export { convertDateToIso, convertDateToFormat, convertIsoToDateObject };
