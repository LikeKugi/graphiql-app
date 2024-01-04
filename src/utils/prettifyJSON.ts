export const prettifyJSON = (data: string) => {
  let prettified: string;
  try {
    prettified = JSON.stringify(JSON.parse(data), null, 2);
  } catch {
    prettified = data;
  }
  return prettified;
};

export const prettifyJSONObject = (data: object) => {
  return JSON.stringify(data, null, 2);
};
