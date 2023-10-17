export const priceTransport = () => {
  const price = [
    27000, 35000, 40000, 18000, 43000, 54000, 24000, 15000, 42000, 22000,
  ];
  const random = Math.floor(Math.random() * 10);
  return price[random];
};
