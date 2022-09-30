export const isDev = process.env.NODE_ENV === "development";

/**
 * If you don't care about the order of the items
 * you should sort them before calling this function
 *
 * @returns a boolean indicating whether the arrays are equal
 */
export function arraysEqual(a: any[], b: any[]): boolean {
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
