import { defineStore } from "pinia";
import FilmService from "../services/film.service";
export const useFilmStore = defineStore("film", {
  state: () => ({ films: [], searchFilm: [] }),
  getters: {},
  actions: {
    async getAllFilms() {
      try {
        this.films = await FilmService.getAll();
      } catch (err) {
        console.log(err);
      }
    },
    getSearchFilm(textSearch) {
        this.searchFilm=[]
      for (let i = 0; i < this.films.length; i++) {
    
        var film = this.films[i];
        if (film.title.toLowerCase().includes(textSearch.toLowerCase()))
          this.searchFilm.push(this.films[i]);
      }
    },
  },
});
