export const parseDate = (stringDate) => {
  if (!stringDate) {
    return { day: '1', month: '1', year: '2000' };
  }

  const rs = stringDate.split('/');
  const day = rs[0];
  const month = rs[1];
  const year = rs[2];

  const date = { day, month, year };
  return date;
};
