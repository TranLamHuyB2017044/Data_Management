<template>
    <div>
        <div class="sidebar container-fluid d-flex flex-column justify-content-center align-items-center">
            <h1 class="text-white mt-3 mb-4">Phim sắp chiếu</h1>

            <div
                class="container-films row row-cols-1 row-cols-md-3 row-cols-xl-5 overflow-auto g-4"
                style="height: 90vh; width: 80%">
                <div class="col" v-for="film in searchFilm" :key="film.movie_id">
                    <router-link :to="{name: 'details', params: {id: film.movie_id}}" >
                        <div class="card bg-transparent border-0">
                            <img :src="film.poster_url" class="card-img-top rounded-4" :alt="film.title" />
                            <div class="card-body overflow-hidden">
                                <h5 class="card-title" :alt="film.title">
                                    {{ film.title }}
                                </h5>
                                <p class="card-text">
                                    {{ film.category }}
                                </p>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { useFilmStore } from "../stores/film.store";
export default {
    setup() {
        const filmStore = useFilmStore();
        return { filmStore };
    },
    data() {
        return {
            searchFilm: [],
        };
    },
    async mounted() {
        this.searchFilm = this.filmStore.searchFilm;
    },
};
</script>
<style scoped>
img {
    height: 100% !important;
}

.card {
    width: 100%;
    height: 100%;
    color: #ccc;
}

.container-films::-webkit-scrollbar {
    display: none;
}

.sidebar {
    /* position: relative; */
    background-image: url(../assets/movie.jpg);
    background-size: 100% 100%;
    height: 90vh;
}

.card-img-top:hover {
    transform: scale(1.1);
    transition: 0.5s;
}

.card-title {
    min-width: 100%;
    white-space: nowrap;
    animation: textRun 5s linear infinite;
}

@keyframes textRun {
    0% {
        transform: translateX(-50%);
    }

    100% {
        transform: translateX(0%);
    }
}
</style>
