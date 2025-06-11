import type { AuthProvider } from "@refinedev/core";
import { api } from "../utils";

export const authProvider: AuthProvider = {
  login: async (params: any) => {
    try {
      const response = await api.post("/auth/signin", params);

      // Extract token from Authorization header (preferred method)
      const authHeader = response.headers.authorization;
      const token = authHeader
        ? authHeader.replace("Bearer ", "")
        : response.data.token;

      // Save token to localStorage
      if (token) {
        localStorage.setItem("romulus-auth", token);
      }

      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(response.data.data));

      return {
        success: true,
        redirectTo: "/",
        successNotification: {
          message: response.data.message || "Login successful",
          description: "Welcome back!",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: "Login failed",
          name: error.response.data.message || error.message,
        },
      };
    }
  },

  register: async (params: any) => {
    try {
      const response = await api.post("/auth/signup", params);

      return {
        success: true,
        successNotification: {
          message: response.data.message || "Registration successful",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: "Register failed",
          name: error?.response?.data?.message,
        },
      };
    }
  },

  updatePassword: async (params) => {
    try {
      const response = await api.patch("/auth/update-password", params);

      return {
        success: true,
        successNotification: {
          message: response.data.message || "Password updated successfully",
          description: "Your password has been changed.",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: "Update password failed",
          name: error.response.data.message || error.message,
        },
      };
    }
  },

  forgotPassword: async (params: any) => {
    try {
      const response = await api.post("/auth/forgot-password", params);

      return {
        success: true,
        successNotification: {
          message: response.data.message || "Forgot password successful",
          description: "Please check your email for further instructions.",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: "Forgot password failed",
          name: error?.response?.data?.message,
        },
      };
    }
  },

  logout: async () => {
    try {
      const response = await api.post("/auth/signout");
      localStorage.removeItem("user");
      localStorage.removeItem("romulus-auth");
      return {
        success: true,
        redirectTo: "/login",
        successNotification: {
          message: response.data.message || "Logout successful",
          description: "You have been logged out.",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: "Logout failed",
          name: error?.response?.data?.message || error.message,
        },
      };
    }
  },

  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },

  check: async () => {
    const token = localStorage.getItem("user");
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      error: {
        message: "Check failed",
        name: "Token not found",
      },
      logout: true,
      redirectTo: "/login",
    };
  },

  getPermissions: async () => null,

  getIdentity: async () => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    if (!user) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      avatar: "https://i.pravatar.cc/150",
    };
  },
};
