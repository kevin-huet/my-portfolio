import api from "@/services/api";
import {TimelineDto} from "@/dto/timeline.dto";

export const timelineService = {
  async create(data: TimelineDto) {
    return api.post('/timeline', data);
  },
  async edit(name: string, desc: string, startedAt?: string, endedAt?: string) {
    return api.put('/timeline', { name, desc, startedAt, endedAt });
  },
  async delete(uuid: string) {
    return api.delete(`/timeline/${uuid}`);
  },
  async getAll() {
    return api.get('/timeline');
  }
}