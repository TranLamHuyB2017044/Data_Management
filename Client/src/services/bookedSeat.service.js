import createApiClient from './api.service';

class MovieService {
    constructor(baseUrl = '/bookedseat') {
        this.api = createApiClient(baseUrl);
    }
    async getAll(movie_id, date,time) {
        return (await this.api.post(`/detailseats/${movie_id}`,{
            date_start:date,
            time_start:time
        })).data;
    }
    async getSeatByBookingId(bookingid) {
        return (await this.api.get(`/bookingid/${bookingid}`)).data;
    }
}
export default new MovieService();
