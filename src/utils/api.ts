import { fetchWrapper } from "./fetch";

function get<T = unknown>(url: string, init?: RequestInit) {
  return fetchWrapper<T>(url, {
    credentials: "same-origin",
    ...init,
    method: "GET",
  });
}

function post<T = unknown>(url: string, body: any, init?: RequestInit) {
  return fetchWrapper<T>(url, {
    credentials: "same-origin",
    ...init,
    method: "POST",
    body: JSON.stringify(body),
  });
}

function put<T = unknown>(url: string, body: any, init?: RequestInit) {
  return fetchWrapper<T>(url, {
    credentials: "same-origin",
    ...init,
    method: "PUT",
    body: JSON.stringify(body),
  });
}

function patch<T = unknown>(url: string, body: any, init?: RequestInit) {
  return fetchWrapper<T>(url, {
    credentials: "same-origin",
    ...init,
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

function httpDelete<T = unknown>(url: string, init?: RequestInit) {
  return fetchWrapper<T>(url, {
    credentials: "same-origin",
    ...init,
    method: "DELETE",
  });
}

export const api = {
  get,
  post,
  put,
  patch,
  delete: httpDelete,
};
