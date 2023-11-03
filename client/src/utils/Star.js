export const handleStar = (data) => {
  const rs = [0, 1, 2, 3, 4].map((item) => {
    if (data >= item + 1) {
      return 100;
    } else {
      const result = Math.round((data - item) * 100);
      return result > 0 ? result : 0;
    }
  });
  return rs;
};
