export const passwordPattern = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d]).{8,35}$/;

export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};
