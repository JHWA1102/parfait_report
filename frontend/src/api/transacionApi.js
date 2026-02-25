import api from "./api";

export const saveTransaction = (data) => {
  return api.post("/transaction", data);
};
