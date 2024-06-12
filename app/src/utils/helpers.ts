export const getRandomId = () => {
  const S4 = () => (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  return (S4()+S4()+'-'+S4()+'-'+S4()+'-'+S4()+'-'+S4()+S4()+S4());
};

export const formatDate = (inputDate: string) => {
  const date = new Date(inputDate);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const formatter = new Intl.DateTimeFormat('en-US', options);
  return formatter.format(date);
};
