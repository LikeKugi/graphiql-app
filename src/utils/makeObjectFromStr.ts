export const makeObjectFromStr = (str: string) => {
  let out: object;
  try {
    out = JSON.parse(str);
  } catch (e) {
    out = {};
  }
  return out;
};
