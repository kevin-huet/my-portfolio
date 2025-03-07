import api from "@/services/api";

export const contactService = {
  async send(data: any) {
    return api.post('/contact', data);
  }
}