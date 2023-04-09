import createApiClient from './api.service';

class UserService {
    constructor(baseUrl = '/admin') {
        this.api = createApiClient(baseUrl);
    }
    async deleteUser(id, admin) {
        return (await this.api.delete(`/deleteUser/${id}/${admin}`)).data;
    }
    async deleteAllUsers(admin) {
        return (await this.api.delete(`/deleteAllUsers/${admin}`)).data;
    }
    async deleteFilm(id, admin) {
        return (await this.api.delete(`/deleteFilm/${id}/${admin}`)).data;
    }
    async deleteAllFilms(admin) {
        return (await this.api.delete(`/deleteAllFilms/${admin}`)).data;
    }
    async createFilm(data) {
        return (await this.api.post(`/createFilm`, data)).data;
    }
}
export default new UserService();
