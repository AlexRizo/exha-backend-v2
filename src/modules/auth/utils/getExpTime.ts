// ? El valor viene como [n]d/[n]h/[n]m/[n]s
export const getExpTime = (time: string) => {
  const [value, unit] = time.split('');

  switch (unit) {
    case 'd':
      return new Date(
        Date.now() + Number(value) * 24 * 60 * 60 * 1000,
      ).getTime();
    case 'h':
      return new Date(Date.now() + Number(value) * 60 * 60 * 1000).getTime();
    case 'm':
      return new Date(Date.now() + Number(value) * 60 * 1000).getTime();
    case 's':
      return new Date(Date.now() + Number(value) * 1000).getTime();
    default:
      return new Date(Date.now() + Number(value) * 1000).getTime();
  }
};
