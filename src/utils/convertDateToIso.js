const convertDateToIso = (newValue) => {
  console.log(newValue);
  const year = newValue.$y;
  const month = newValue.$M + 1;
  const day = newValue.$D;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedDateString = `${year}-${formattedMonth}-${formattedDay}T21:00:00.000Z`;
  return formattedDateString;
};

export { convertDateToIso };
