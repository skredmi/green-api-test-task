export const url = (id: string, type: string, api: string) => {
  const url = `https://api.green-api.com/waInstance${id}/${type}/${api}`;
  return url;
};
