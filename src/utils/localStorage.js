const STORAGE_KEY = "expense-tracker-data";

export const saveExpensesToLocalStorage = (expenses) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
};

export const getExpensesFromLocalStorage = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};
