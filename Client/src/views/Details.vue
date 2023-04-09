<template>
  <div class="container play-container" v-if="film">
    <div class="play">
      <img :src="`${film.poster_url}`" alt="" class="movie-img" />

      <div class="play-text">
        <h2>{{ film.title }}</h2>
        <h2>Author: {{ film.category }}</h2>
        <p class="my-2" style="max-width: 48.125rem">{{ film.description }}</p>
        <p>Released: {{ film.release_date }}</p>
        <p>Caterogy: {{ film.category }}</p>

        <p>Country: {{ film.national }}</p>
        <p>Duration: {{ film.duration }} minutes</p>
  
        <button class="btn-favorite d-none d-lg-block">
          <i class="fa-solid fa-plus"></i> Add to favorite
        </button>
      </div>
    </div>
    <div class="booking">
      <h3>Lịch chiếu phim: {{ film.title }}</h3>
      <p>Location: Lotte Cần Thơ</p>
      <div class="date rounded-3 d-flex justify-content-center py-2">
        <div
          class="day d-flex flex-column justify-content-center align-items-center mx-3 text-center py-2"
          v-for="index_date in 7"
          :key="index_date"
        >
          <div class="number_date w-100">
            <span class="">{{ getDate(index_date).day }}</span>
          </div>
          <div>
            <span>{{ getDate(index_date).weekday }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="position-booking">
      <div class="seat-container pb-3">
        <div class="screen mx-auto"></div>
        <h3 class="text-center mt-2 mb-4 text-light text-uppercase ">man hinh</h3>
        <div class="seats" v-for="index in 9" :key="index">
          <div class="seat" v-for="number in 12" :key="number">
            <span @click="getPosition" ref="myRef"  >{{ changeText(index) }}{{ number }}</span>
          </div>
        </div>
        <div class="seat-inform">
          <div class="seat-notices"></div>
          <h5 class="seat-inform-text" style="color: #fff;">Da dat</h5>
        </div>
      </div>
      <div class="temp-ticket">
        <h3>{{ film.title }}</h3>
        <h3 style="color: rgb(249, 115, 22);">21:10 ~ 22:56 · CN, 09/04 · Phòng chiếu 1 · 2D Phụ đề</h3>
        <hr>
        <div class="sited">
          <h3>Chỗ ngồi</h3>
        </div>
        <hr>
        <div class="buy-ticket">
          <h3>Tạm tính</h3>
          <h1>0đ</h1>
          <button type="button" class="btn btn-lg btn-primary">Mua ve</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useFilmStore } from "../stores/film.store";
import filmService from "../services/film.service";
export default {
  setup() {
    const useFilm = useFilmStore();
    return { useFilm };
  },
  data() {
    return {
      film: {},
    };
  },
  methods: {
    async getDetail() {
      try {
        this.film = await filmService.get(this.$route.params.id);
      } catch (error) {
        console.log(error);
      }
    },
    getDate(number) {
      var date = new Date();

      date.setDate(date.getDate() + number);
      var newdate = {
        weekday: date.toLocaleDateString("en-US", { weekday: "long" }),
        day: date.getDate(),
      };
      return newdate;
    },
    changeText(number) {
      const index = 64 + number;
      return String.fromCharCode(index);
    },
    getPosition(){
      console.log(this.$refs.myRef.innerHTML)
    }
  },

  async mounted() {
    await this.getDetail();
    // console.log(this.getDate(1).day);
  },
};
</script>

<style scoped>
.play {
  margin-top: 100px;
  display: flex;
  padding: 24px 24px 60px 40px;
  border-radius: 20px;
  box-shadow: 0px 4px 3px 4px rgba(0, 0, 0, 0.62);
  -webkit-box-shadow: 0px 4px 3px 4px rgba(0, 0, 0, 0.62);
  -moz-box-shadow: 0px 4px 3px 4px rgba(0, 0, 0, 0.62);
  height: 500px;
  margin-bottom: 100px;
}

.play-text {
  display: flex;
  justify-content: center;
  justify-items: center;
  flex-direction: column;
  position: relative;
}

.rate-btn {
  position: absolute;
  bottom: 120px;
  left: 150px;
}

.rate {
  position: absolute;
  bottom: 200px;
  width: 16%;
  left: 150px;
}

.movie-img {
  border-radius: 10px;

  margin: 0rem 2rem -2rem -1rem;
}

.btn-favorite {
  padding: 5px 15px;
  border-radius: 50px;
  position: absolute;
  right: 0;
  top: 0;
  background-color: #ccc;
  border: none;
}

h4 {
  margin-top: 160px;
  color: #fff !important;
}

.btn-favorite:hover {
  opacity: 0.8;
}

.date {
  background-color: #c1c2d6;
}
.number_date {
  background: #e0e0e0;
}
.day {
  width: 150px;
  border: 1px solid #989797;
  border-radius: 4px;
}
.seat-container {
  background: #000;
  padding: 10px 0;
}
.position-booking{
    margin: 20px auto;
    border-radius: 10px;
    
}
.seats {
  display: flex;
  width: 60%;
  justify-content: center;
  align-items: center;
  margin: 7px auto;
  flex-wrap: wrap;
  gap: 7px;
  
}
.seat {
  border: 1px #000;
  color: #fff;
  background: #db7373;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
}
.seat:hover{
  transform: scale(1.1);
}
.seat-inform {
  text-align: center;
  line-height: 50px;
  margin: 30px auto 20px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
.seat-notices {
  border: 1px #000;
  color: #fff;
  background: #7c7575;
  width: 50px;
  height: 50px;
  border-radius: 10px;
}

.screen {
  width: 40%;
  height: 5px;
  border-radius: 10px;
  background: #fff;

}
.temp-ticket{
    border: 1px solid #000;
    margin: 0 auto auto auto;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 10px;
}
.btn{
    float: right;
    margin-top: -50px;
    margin-right: 20px;
}
/* p {
  color: #fff;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;
  margin-top: 20px;
} */
</style>