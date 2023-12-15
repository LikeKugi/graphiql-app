export function camelCase(str: string): string {
  // converting all characters to lowercase
  const ans = str.toLowerCase();

  // Returning string to camelcase
  return ans
    .split(' ')
    .reduce((s, c) => s + (c.charAt(0).toUpperCase() + c.slice(1)));
}
