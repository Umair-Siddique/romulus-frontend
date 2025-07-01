import { jwtDecode } from "jwt-decode";

import type { AuthProvider } from "@refinedev/core";
import { api } from "../utils";

export const authProvider: AuthProvider = {
  login: async (params: any) => {
    try {
      const response = await api.post("/auth/signin", params); // Full response object
      const dataObj = response?.data; // Actual data sent by the API

      let redirectTo = "/";
      
      if (dataObj) {
        let hasProfile = false;
        const { accessToken, data: userData } = dataObj;
        const { userId, educatorId, organizationId, role } = userData;

        const stringifiedUserData = JSON.stringify(userData);

        localStorage.setItem("romulus-auth", accessToken);
        localStorage.setItem("romulus-user", stringifiedUserData);

        switch (role) {
          case "educator":
            try {
              const response = await api.get(`/educators/${educatorId}`);
              const dataObj = response?.data;

              const { data: educatorData } = dataObj;
              const stringifiedEducatorData = JSON.stringify(educatorData);

              localStorage.setItem("romulus-user", stringifiedEducatorData);
              hasProfile = true;
            } catch (error) {
              hasProfile = false;
              redirectTo = "/create-profile";
              console.error("Error fetching educator data:", error);
            }
            break;
          case "organization":
            try {
              const response = await api.get(
                `/organizations/${organizationId}`
              );
              const dataObj = response?.data;

              const { data: organizationData } = dataObj;
              const stringifiedOrganizationData =
                JSON.stringify(organizationData);

              localStorage.setItem("romulus-user", stringifiedOrganizationData);
              hasProfile = true;
            } catch (error) {
              hasProfile = false;
              redirectTo = "/create-profile";
              console.error("Error fetching organization data:", error);
            }
            break;
          case "admin":
            try {
              const response = await api.get(`/users/${userId}`);
              const dataObj = response?.data;

              const { data: adminData } = dataObj;
              const stringifiedAdminData = JSON.stringify(adminData);

              localStorage.setItem("romulus-user", stringifiedAdminData);
              hasProfile = true;
            } catch (error) {
              console.error("Error fetching admin data:", error);
            }
            break;
          default:
        }

        localStorage.setItem("romulus-has-profile", JSON.stringify(hasProfile));
      }

      return {
        success: true,
        redirectTo,
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
      localStorage.removeItem("romulus-auth");
      localStorage.removeItem("romulus-user");
      localStorage.removeItem("romulus-has-profile");

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
    const accessToken = localStorage.getItem("romulus-auth");

    if (accessToken) {
      const decoded = jwtDecode(accessToken);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decoded.exp && decoded.exp < currentTime) {
        localStorage.removeItem("romulus-auth");
        localStorage.removeItem("romulus-user");
        localStorage.removeItem("romulus-has-profile");

        return {
          authenticated: false,
          error: {
            message: "Token expired",
            name: "Session expired",
          },
          logout: true,
          redirectTo: "/login",
        };
      }

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
    const userString = localStorage.getItem("romulus-user");
    const user = userString ? JSON.parse(userString) : null;
    if (!user) {
      return null;
    }

    return {
      id: user.user,
      name: user.organizationName || user.educatorName || user.adminName,
      avatar: user.avatar || user.profilePicture || "",
    };
  },
};
