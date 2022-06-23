import moment from "moment";
import "moment/locale/es";

export const dateString = (date, type) => {
  let formatDate;
  if (type === "dayString") formatDate = "dddd";
  if (type === "monthString") formatDate = "MMMM";

  return (
    moment(date).format(formatDate).charAt(0).toUpperCase() +
    moment(date).format(formatDate).slice(1)
  );
};

export const dateNumber = (date, type) => {
  let formatDate;
  if (type === "dayNumber") formatDate = "DD";
  if (type === "monthNumber") formatDate = "MM";
  if (type === "yearNumber") formatDate = "YYYY";

  return moment(date).format(formatDate);
};

export const dateFull = (date) =>
  `${dateNumber(date, "dayNumber")} de ${dateString(
    date,
    "monthString"
  )} ${dateNumber(date, "yearNumber")}`;
