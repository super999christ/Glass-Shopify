export const formatUSDPrice = (price: number) => {
  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return USDollar.format(price);
};

export const formatDate = (date: Date | string) => {
  const formattedDate = new Date(date).toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });
  return formattedDate;
}