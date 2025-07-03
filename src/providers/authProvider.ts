import type { AuthProvider } from "@refinedev/core";
import { jwtDecode } from "jwt-decode";
import { httpClient } from "../utils";

export const authProvider: AuthProvider = {
  login: async (params: any) => {
    try {
      const response = await httpClient.post("/auth/signin", params);
      const { accessToken, data } = response.data;
      const { educatorId, organizationId } = data;

      localStorage.setItem("romulus-access-token", accessToken);
      localStorage.setItem("romulus-user", JSON.stringify(data));

      const hasProfile = educatorId || organizationId;
      const redirectTo = hasProfile ? "/" : "/create-profile";

      return {
        success: true,
        redirectTo,
        data,
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
      const response = await httpClient.post("/auth/signup", params);

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
      const response = await httpClient.patch("/auth/update-password", params);

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
      const response = await httpClient.post("/auth/forgot-password", params);

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
      const response = await httpClient.post("/auth/signout");
      localStorage.clear();

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
    const accessToken = localStorage.getItem("romulus-access-token");
    if (!accessToken) {
      return { authenticated: false, redirectTo: "/login" };
    }

    const decoded = jwtDecode(accessToken);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      localStorage.removeItem("romulus-access-token");
      localStorage.removeItem("romulus-user-profile");
      localStorage.removeItem("romulus-user");

      return { authenticated: false, redirectTo: "/login" };
    }

    return {
      authenticated: true,
      redirectTo: "/",
    };
  },

  getPermissions: async () => null,

  getIdentity: async () => {
    const userString = localStorage.getItem("romulus-user-profile");
    const user = userString ? JSON.parse(userString) : null;
    if (!user) {
      return null;
    }

    return {
      id: user.user._id,
      name: user.firstName + " " + user.lastName,
      avatar: user.avatar || "",
    };
  },
};
