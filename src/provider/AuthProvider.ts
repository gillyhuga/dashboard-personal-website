import { AuthBindings } from "@refinedev/core";
import { fetchAPI } from "../services/api";
import Cookies from "js-cookie";

const AuthProviderConfig: AuthBindings = {
  login: async ({ email, password }: any) => {
    try {
      const apiResponse = await fetchAPI({
        url: `${import.meta.env.VITE_API_URL}/login`,
        method: "POST",
        body: { email, password },
      });

      if (apiResponse.success) {
        const { token } = apiResponse.data.data;
        Cookies.set("auth_token", token, { expires: 7 });
        return { success: true, redirectTo: "/" };
      } else {
        return {
          success: false,
          error: { message: "Login failed", name: apiResponse.error || "Unknown error" },
        };
      }
    } catch (error) {
      return { success: false, error: { message: "Login failed", name: "Unknown error" } };
    }
  },
  logout: async () => {
    Cookies.remove("auth_token");
    return { success: true, redirectTo: "/login" };
  },
  onError: async (error: any) => {
    console.error(error);
    return { error };
  },
  check: async () => {
    return Cookies.get("auth_token")
      ? { authenticated: true }
      : {
        authenticated: false,
        error: { message: "Check failed", name: "Not authenticated" },
        logout: true,
        redirectTo: "/login",
      };
  },
  getIdentity: async () => {
    try {
      const apiResponse = await fetchAPI({
        url: `${import.meta.env.VITE_API_URL}/profile`,
      });

      if (apiResponse.success) {
        const { id, name, image } = apiResponse.data.data;
        return { success: true, id, name, avatar: image };
      } else {
        return {
          success: false,
          error: {
            message: "Profile retrieval failed",
            name: apiResponse.error || "Unknown error",
          },
        };
      }
    } catch (error) {
      return {
        success: false,
        error: { message: "Profile retrieval failed", name: "Unknown error" },
      };
    }
  },
};

export default AuthProviderConfig;
