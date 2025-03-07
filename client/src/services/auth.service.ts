import api from "@/services/api";

export const authService = {
  async login(username: string, password: string) {
    const { data } = await api.post("/auth/login", { username, password });
    localStorage.setItem("access_token", data.access_token);
    return data.access_token;
  },

  async getProfile() {
    return api.get("/auth/profile");
  },

  logout() {
    localStorage.removeItem("access_token");
  }
};
