import axios, { AxiosError } from "axios";

// allow overriding the backend URL via environment variable (Vite)
const BASE_URL =
  import.meta.env.VITE_API_BASE ||
  "https://ai-chatbot-back-0i91.onrender.com/api/v1";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// global interceptor to surface network issues more clearly
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // if there's no response, it's a network-level error
    if (error.code === "ECONNRESET" || !error.response) {
      console.error("Network error or server unreachable:", error.message);
      // we can wrap it in a friendlier message for callers
      return Promise.reject(new Error("Network error: unable to contact server"));
    }
    
    // Handle 401 Unauthorized - user not authenticated
    if (error.response?.status === 401) {
      console.error("Authentication failed: User not authorized");
      // Return the error with status code so handlers can act accordingly
      return Promise.reject(error);
    }
    
    return Promise.reject(error);
  }
);


export const loginUser = async (email: string, password: string) => {
  const res = await API.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  return res.data;
};


export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await API.post("/user/signup", { name, email, password });
  if (res.status === 409) {
    throw new Error("User already registered");
  } else if (res.status !== 201) {
    throw new Error("Unable to Signup");
  }
  return res.data;
};

export const checkAuthStatus = async () => {
  try {
    const res = await API.get("/user/auth-status");
    if (res.status !== 200) {
      throw new Error("Unable to authenticate");
    }
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<unknown>;
    // 401 means not authenticated, which is expected sometimes
    if (axiosError.response?.status === 401) {
      throw new Error("Not authenticated");
    }
    throw error;
  }
};

export const sendChatRequest = async (message: string) => {
  try {
    const res = await API.post("/chat/new", { message });
    if (res.status !== 200) {
      throw new Error("Unable to send chat");
    }
    const data = await res.data;
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<unknown>;
    // If it's a 401 error, throw with a specific message
    if (axiosError.response?.status === 401) {
      throw new Error("Session expired. Please login again.");
    }
    throw error;
  }
};

export const getUserChats = async () => {
  try {
    const res = await API.get("/chat/all-chats");
    if (res.status !== 200) {
      throw new Error("Unable to fetch chats");
    }
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<unknown>;
    // If it's a 401 error, throw with a specific message
    if (axiosError.response?.status === 401) {
      throw new Error("Session expired. Please login again.");
    }
    throw error;
  }
};

export const deleteUserChats = async () => {
  try {
    const res = await API.delete("/chat/delete");
    if (res.status !== 200) {
      throw new Error("Unable to delete chats");
    }
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<unknown>;
    // If it's a 401 error, throw with a specific message
    if (axiosError.response?.status === 401) {
      throw new Error("Session expired. Please login again.");
    }
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const res = await API.get("/user/logout");
    if (res.status !== 200) {
      throw new Error("Unable to logout");
    }
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<unknown>;
    // If it's a 401 error, it means we're already logged out
    if (axiosError.response?.status === 401) {
      return { message: "Already logged out" };
    }
    throw error;
  }
};
