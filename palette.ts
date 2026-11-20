export const W = 1080;
export const H = 1920;

export const C = {
  cream: '#F4EBDD',
  creamDark: '#E6D7BE',
  glass: '#EFE8D8',
  wood: '#EAD9BD',
  woodLine: '#D6BF9B',
  coffee: '#4A2C1D',
  coffeeMid: '#6E4530',
  coffeeLight: '#A87A55',
  coffeeTan: '#C9A47F',
  ink: '#2B1A12',
  teal: '#3C8D89',
  tealSoft: '#A9CBC6',
  paper: '#FAF5EA',
};

export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const prog = (f: number, a: number, b: number) => clamp01((f - a) / (b - a));
export const easeOut = (t: number) => 1 - Math.pow(1 - clamp01(t), 3);
export const easeInOut = (t: number) => {
  t = clamp01(t);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};
export const easeInOutQuint = (t: number) => {
  t = clamp01(t);
  return t < 0.5 ? 16 * Math.pow(t, 5) : 1 - Math.pow(-2 * t + 2, 5) / 2;
};

// Deterministic random (mulberry32) so every render is identical.
export const rng = (seed: number) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};
