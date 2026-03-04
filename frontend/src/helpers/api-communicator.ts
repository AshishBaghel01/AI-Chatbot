import axios from "axios";

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
    return Promise.reject(error);
  }
);


export const loginUser = async (email: string, password: string) => {
  const res = await API.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  return data;
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
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const res = await API.get("/user/auth-status");
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = await res.data;
  return data;
};

export const sendChatRequest = async (message: string) => {
  const res = await API.post("/chat/new", { message });
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const getUserChats = async () => {
  const res = await API.get("/chat/all-chats");
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const deleteUserChats = async () => {
  const res = await API.delete("/chat/delete");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};

export const logoutUser = async () => {
  const res = await API.get("/user/logout");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};
