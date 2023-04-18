import { defineStore } from 'pinia';
import FilmService from '../services/film.service';
export const useFilmStore = defineStore('film', {
    state: () => ({ films: [] , searchFilm:[]}),
    getters: {},
    actions: {
        async getAllFilms() {
            try {
                this.films = await FilmService.getAll();
            } catch (err) {
                console.log(err);
            }
        },
        getSearchFilm(filmSearch) {
            this.searchFilm = filmSearch;
        }
    },
});
