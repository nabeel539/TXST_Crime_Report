import axiosInstance from "./axiosConfig";

export const adminLogin = async (email, password, role) => {
  try {
    const response = await axiosInstance.post(`/api/admin/login`, {
      email,
      password,
      role,
    });
    // Store token in localStorage
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

export const userLogin = async (email, password, role) => {
  try {
    // Map 'user' role to 'officer' for backend compatibility
    const mappedRole = role === "user" ? "officer" : role;

    const response = await axiosInstance.post(`/api/auth/login`, {
      email,
      password,
      role: mappedRole,
    });
    // Store token in localStorage
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

export const userSignup = async (userData) => {
  try {
    const response = await axiosInstance.post(`/api/auth/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Signup failed" };
  }
};

// Validate user session
export const validateToken = async () => {
  try {
    const response = await axiosInstance.get("/api/auth/validate");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Session validation failed" };
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post("/api/auth/logout");
    // Remove token from localStorage
    localStorage.removeItem("token");
    return response.data;
  } catch (error) {
    // Still remove token on error
    localStorage.removeItem("token");
    throw error.response?.data || { message: "Logout failed" };
  }
};
