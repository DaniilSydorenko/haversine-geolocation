export const isNodeJs = () => typeof window === 'undefined' && typeof process !== "undefined";
