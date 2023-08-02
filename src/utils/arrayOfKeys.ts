export function arrayOfKeys(size: number) {
  return [ ...Array(size).fill(0)].map((_, index) => index);
} 