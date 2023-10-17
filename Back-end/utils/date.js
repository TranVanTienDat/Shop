const formatDate = (date) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return date.toLocaleDateString("en-GB", options);
};

exports.getCurrentAndNextDate = async (currentDate) => {
  const date = new Date(currentDate);
  date.setDate(date.getDate() + 5);

  const currentDateFormatted = formatDate(currentDate);
  const nextDateFormatted = formatDate(date);

  return { currentDateFormatted, nextDateFormatted };
};
