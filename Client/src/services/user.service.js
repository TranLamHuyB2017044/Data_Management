import createApiClient from './api.service';

class UserService {
    constructor(baseUrl = '/user') {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get('/')).data;
    }

    async getAllBookings(id){
        return (await this.api.get(`/allBookings/${id}`)).data;
    }

    async create(data) {
        return (await this.api.post('/', data)).data;
    }
    async deleteAll() {
        return (await this.api.delete('/')).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async getLogin(username, password) {
        return (
            await this.api.post(`/login`, {
                username: username,
                password: password,
            })
        ).data[0];
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    async addVideo(id, videoId) {
        return (await this.api.put(`/myVideos/${id}/${videoId}`)).data;
    }
    async removeVideo(id, videoId) {
        return (await this.api.delete(`/myVideos/${id}/${videoId}`)).data;
    }
}
export default new UserService();
