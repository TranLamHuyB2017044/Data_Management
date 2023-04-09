import createApiClient from './api.service';

class MovieService {
    constructor(baseUrl = '/bookedseat') {
        this.api = createApiClient(baseUrl);
    }
    async getAll(movie_id, date) {
        return (await this.api.get(`/${movie_id}/${date}`)).data;
    }
}
export default new MovieService();
