"use client";

import { BASE_URL } from "@/constants";
import { APIError, HTTPMethod } from "@/types";
import Cookies from "js-cookie";

const memoryCache = new Map<string, { data: any; expiresAt: number }>();

export const fetcher = async (url: string, ttl: number = 2) => {
  const token = Cookies.get("accessToken");
  const cacheKey = `${url}::${token}`;
  const now = Date.now();

  const cached = memoryCache.get(cacheKey);
  if (cached && cached.expiresAt > now) {
    return cached.data;
  }

  try {
    const res = await fetch(`${BASE_URL}/${url}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    const data = await res.json();

    memoryCache.set(cacheKey, {
      data,
      expiresAt: now + ttl * 1000, // TTL in milliseconds
    });

    return data;
  } catch (e) {
    console.log("Fetcher error:", e);
  }
};

export const fetchBlob = async (url: string) => {
  const token = Cookies.get("accessToken");
  const response = await fetch(`${BASE_URL}/${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/pdf",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    const errorMessage = error.message;
    throw new Error(`Error fetching : ${errorMessage}`);
  }

  return response;
};

export const fetcherWithoutAuth = async (url: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const hasFile = (data: object): boolean => {
  return Object.values(data).some((value) => {
    if (Array.isArray(value)) {
      return value.some((item) => item instanceof File);
    }
    return value instanceof File;
  });
};

export const sendData = async <T, D extends object>(
  url: string,
  data: D,
  method: HTTPMethod = "POST",
  isFormData?: boolean,
  headers?: RequestInit["headers"]
): Promise<T> => {
  const token = Cookies.get("accessToken");
  const shouldUseFormData = hasFile(data) || isFormData;

  const _headers: HeadersInit = shouldUseFormData
    ? { Authorization: `Bearer ${token}`, ...headers }
    : {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...headers,
      };

  const options: RequestInit = {
    method,
    headers: _headers,
  };

  if (!["DELETE", "GET"].includes(method)) {
    options.body = shouldUseFormData
      ? convertToFormData(data)
      : JSON.stringify(data);
  }

  let response: Response;
  try {
    response = await fetch(`${BASE_URL}/${url}`, options);
  } catch (err) {
    throw new APIError("Network Error", 0, null);
  }

  let responseBody: any = null;
  try {
    responseBody = await response.json();
  } catch (err) {
    // JSON parse error
    throw new APIError("Invalid server response", response.status, null);
  }

  if (!response.ok) {
    throw new APIError(
      responseBody.message || "Request failed",
      response.status,
      responseBody.data || responseBody // tangkap field error jika ada
    );
  }

  return responseBody as T;
};

// Fungsi untuk mengonversi objek ke FormData
export const convertToFormData = <D extends object>(data: D): FormData => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === null || typeof value === "undefined") return;

    // Jika value berupa array
    if (Array.isArray(value)) {
      const validItems = value.filter((v) => v !== null && v !== undefined);

      if (validItems.length === 1) {
        const item = validItems[0];
        if (item instanceof File || item instanceof Blob) {
          formData.append(key, item);
        } else if (typeof item === "object") {
          formData.append(key, JSON.stringify(item));
        } else {
          formData.append(key, String(item));
        }
      } else {
        validItems.forEach((item) => {
          if (item instanceof File || item instanceof Blob) {
            formData.append(key, item);
          } else if (typeof item === "object") {
            formData.append(key, JSON.stringify(item));
          } else {
            formData.append(key, String(item));
          }
        });
      }
    } else if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
    } else if (typeof value === "object") {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, String(value));
    }
  });

  return formData;
};
