export function isPrimitive(val: unknown): val is string | number | boolean {
  return typeof val === "string" || typeof val === "number" || typeof val === "boolean";
}

export function isArrayOfStringOrNumber(val: unknown): val is (string | number)[] {
  return Array.isArray(val) && val.every(item => typeof item === "string" || typeof item === "number");
}
