const months = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const daysInMonth = ({ month, year }) => {
  return new Date(year, month, 0).getDate();
};

const getMonthName = ({ monthIndex = 0 }) => {
  return months[monthIndex];
};

export { daysInMonth, getMonthName };
