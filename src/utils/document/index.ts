export const getFirstInputElement = (parent: Element) => {
  const inputs = parent.getElementsByTagName("input");

  if (!inputs.length) throw new Error("Can't find any <input/> element");

  return inputs[0];
};

export const isObject = (obj: unknown): obj is Record<string, unknown> => {
  return typeof obj === "object" && !Array.isArray(obj) && obj !== null;
};

export const isEmpty = (value: unknown): boolean => {
  if (isObject(value)) return Object.keys(value).length === 0;
  return (
    value == null ||
    ((typeof value === "string" || Array.isArray(value)) && value.length === 0)
  );
};
