const min = 1000 * parseInt(process.env.SEGUNDOS_API_DELAY_MIN as string);
const max = 1000 * parseInt(process.env.SEGUNDOS_API_DELAY_MAX as string);

export const asyncResponse = (payload: any): Promise<any> => {
  const delay = max < 0 || min < 0 ? 0 : Math.random() * (max - min) + min;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(payload);
    }, delay);
  });
};
