const BASE = "https://schemavalidation-production.up.railway.app/api/users";

export const createUser = (data) =>
  fetch(`${BASE}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => r.json());

export const getAllUsers = () => fetch(BASE).then((r) => r.json());

export const updateUser = (id, data) =>
  fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => r.json());

export const deleteUser = (id) =>
  fetch(`${BASE}/${id}`, { method: "DELETE" }).then((r) => r.json());