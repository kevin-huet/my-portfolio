import api from "@/services/api";

export const skillService = {
  getAll() {
    return api.get("/skills");
  },
  create(data: any) {
    return api.post("/skills", data);
  },
  update(uuid: string, data: any) {
    return api.put(`/skills/${uuid}`, data);
  },
  delete(uuid: string) {
    return api.delete(`/skills/${uuid}`);
  },
  async getAllCategories() {
    return api.get('/skills/categories');
  },
  async createCategory(name: string) {
    return api.post('/skills/category', { name: name });
  }
};