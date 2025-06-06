import type { AuthProvider } from "@refinedev/core";
import { api } from "../utils";

export const authProvider: AuthProvider = {
  login: async (params: any) => {
    try {
      const response = await api.post("/auth/signin", params);

      console.log("response", response);

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));

        return {
          success: true,
          redirectTo: "/",
        };
      }

      return {
        success: false,
        error: {
          message: "Login failed",
          name: response.data?.message || "Unexpected error",
        },
      };
    } catch (error: any) {
      console.error("Login error", error);
      return {
        success: false,
        error: {
          message: "Login failed",
          name: error?.response?.data?.message || error.message,
        },
      };
    }
  },

  register: async (params: any) => {
    try {
      await api.post("/auth/signup", params);

      return {
        success: true,
        // redirectTo: "/login",
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
    await api.patch("/auth/update-password", params);

    return {
      success: true,
    };
  },

  forgotPassword: async (params: any) => {
    try {
      await api.post("/auth/forgot-password", params);
      return {
        success: true,
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
    localStorage.removeItem("user");
    return {
      success: true,
      redirectTo: "/login",
    };
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
    console.log("user", user);
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
