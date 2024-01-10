import { Transaction } from "@/types";

const API_ENDPOINT =
  "https://crudcrud.com/api/7df8b50e96c94d8884bffeb1ce4a0a14/transactions";

export const all = async () => {
  const res = await fetch(API_ENDPOINT);
  return res.json();
};

export const get = async (id: string | undefined) => {
  const res = await fetch(`${API_ENDPOINT}/${id}`);
  return res.json();
};

export const store = async (data: Transaction) => {
  return fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const update = async (id: string, data: Transaction) => {
  return fetch(`${API_ENDPOINT}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const destroy = async (id: string) => {
  return fetch(`${API_ENDPOINT}/${id}`, {
    method: "DELETE",
  });
};
