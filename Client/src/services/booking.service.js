import createApiClient from './api.service';

class MovieService {
    constructor(baseUrl = '/booking') {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get(`/`)).data;
    }
    async create(data) {
        return (await this.api.post('/', data)).data;
    }
    async getAllByUserId(userId) {
        return (await this.api.get(`/user/${userId}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async remove(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}
export default new MovieService();
