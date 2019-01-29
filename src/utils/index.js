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

const date = new Date();

const daysInMonth = ({ month = months[0], year = date.getFullYear() }) => {
  return new Date(year, months.indexOf(month) + 1, 0).getDate();
};

const getMonthName = ({ monthIndex = 0 }) => {
  return months[((monthIndex + months.length + 1) % months.length) - 1];
};

export { daysInMonth, getMonthName };
