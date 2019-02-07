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
  return months[(monthIndex + months.length) % months.length];
};

const getYear = ({
  currentMonth = months[0],
  nextMonth = months[1],
  currentYear = date.getFullYear()
}) => {
  if (currentMonth === "December" && nextMonth === "January") {
    return (parseInt(currentYear) + 1).toString();
  } else if (currentMonth === "January" && nextMonth === "December") {
    return (parseInt(currentYear) - 1).toString();
  } else {
    return currentYear.toString();
  }
};

export { daysInMonth, getMonthName, getYear };
