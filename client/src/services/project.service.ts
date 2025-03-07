import api from "@/services/api";

export const projectService = {
  getAll() {
    return api.get("/projects");
  },
  create(data: any) {
    return api.post("/projects", data);
  },
  update(uuid: string, data: any) {
    return api.put(`/projects/${uuid}`, data);
  },
  delete(uuid: string) {
    return api.delete(`/projects/${uuid}`);
  },
};