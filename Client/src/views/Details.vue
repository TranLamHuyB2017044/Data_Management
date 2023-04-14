<template>
    <div>
        <div id="play">
            <img :src="`${film.poster_url}`" alt="" class="movie-img" />

            <div class="play-text">
                <h2>{{ film.title }}</h2>
                <p class="my-2" style="max-width: 48.125rem">
                    {{ film.description }}
                </p>
                <p>Ngày ra mắt: {{ film.release_date }}</p>
                <p>Thể loại: {{ film.category }}</p>

                <p>Quốc gia: {{ film.national }}</p>
                <p>Thời lượng: {{ film.duration }} phút</p>
            </div>
        </div>
        <div class="booking container my-3">
            <h3>Lịch chiếu phim: {{ film.title }}</h3>
            <p>Địa điểm rạp: Lotte Cần Thơ</p>
            <div class="date rounded-3 d-flex justify-content-center py-2">
                <div
                    role="button"
                    class="day d-flex flex-column justify-content-center align-items-center mx-3 text-center py-2"
                    v-for="index_date in 7"
                    :key="index_date"
                    :class="{ active_date: choice_date }"
                    @click.prevent="
                        getBookDay(getDate(index_date));
                        showEvent($event);
                    ">
                    <div class="number_date w-100">
                        <span class="">{{ getDate(index_date).day }}</span>
                    </div>
                    <div>
                        <span>{{ getDate(index_date).weekday }}</span>
                    </div>
                </div>
            </div>
            <div
                class="container d-flex justify-content-start align-items-center"
                v-if="showTime">
                <div
                    class="showtime mx-2 my-3"
                    v-for="i in this.timeStartArr"
                    :key="i">
                    <div class="timeStartArr" @click.prevent="getShowTime(i)">
                        <i>
                            <span style="color: #0284c7">{{ i }}:00</span> ~
                            {{ getTimeEnd(i) }}</i
                        >
                    </div>
                </div>
            </div>
            <div v-if="showSeat" class="position-booking container">
                <div class="seat-container">
                    <div class="screen mx-auto"></div>
                    <h3 class="text-center mt-0 mb-4 text-light text-uppercase">
                        Màn Hình
                    </h3>
                    <div class="seats" v-for="index in 9" :key="index">
                        <div
                            class="seat"
                            v-for="number in 12"
                            :key="number"
                            @click="
                                getPosition(index, number, $event);
                                getCost();
                            ">
                            <span>{{ changeText(index) }}{{ number }}</span>
                        </div>
                    </div>
                    <div class="seat-inform">
                        <div class="seat-notices"></div>
                        <h5 class="seat-inform-text" style="color: #fff">
                            Đã đặt
                        </h5>
                    </div>
                </div>
                <div class="temp-ticket">
                    <h3>{{ film.title }}</h3>
                    <h3 style="color: rgb(249, 115, 22)">
                        {{ this.timeStart }}, {{ this.datestart.weekday }},
                        {{ this.datestart.weekday }}, Phòng chiếu 1 · 2D Phụ đề
                    </h3>
                    <hr />
                    <div class="sited">
                        <h3>Chỗ ngồi</h3>
                        <span v-for="(seat, index) in seats" :key="index">
                            {{ seat
                            }}<span v-if="index !== seats.length - 1"
                                >,
                            </span></span
                        >
                    </div>
                    <hr />
                    <div class="buy-ticket">
                        <h3>Tạm tính</h3>
                        <h1 v-if="this.seats.length != 0">
                            {{ getCost() }}.000đ
                        </h1>
                        <h1 v-else>0đ</h1>
                        <button
                            @click="createTicket"
                            type="button"
                            class="btn btn-lg btn-primary">
                            Mua vé
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { useFilmStore } from '../stores/film.store';
import filmService from '../services/film.service';
import bookingService from '../services/booking.service';
import bookedSeatService from '../services/bookedSeat.service';
import myAlertService from '../services/myAlert.service';
import { useUserStore } from '../stores/user.store';
export default {
    setup() {
        const useFilm = useFilmStore();
        const useUser = useUserStore();
        return { useFilm, useUser };
    },
    data() {
        return {
            film: {},
            datestart: {},
            seats: new Array(),
            seated: [],
            choice_date: false,
            showTime: false,
            timeStartArr: [9, 11, 13, 14, 16, 19],
            timeStart: '',
            showSeat: false,
            cost: { type: Number },
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
            date.setDate(date.getDate() + number - 1);
            var newdate = {
                weekday: date.toLocaleDateString('en-US', { weekday: 'long' }),
                day: date.getDate(),
                fullDay: `${date.getDate()}-${
                    date.getMonth() + 1
                }-${date.getFullYear()}`,
                time: `${date.getHours()}:${date.getMinutes()}`,
            };
            return newdate;
        },
        changeText(number) {
            const index = 64 + number;
            return String.fromCharCode(index);
        },
        async getShowTime(index) {
            this.showSeat = true;
            const time = `${index}:00`;
            this.timeStart = time;
            this.seated = await bookedSeatService.getAll(
                this.$route.params.id,
                this.datestart.fullDay,
                this.timeStart,
            );
            const currenSeat = document.querySelectorAll('.seat span');
            currenSeat.forEach((s) => {
                s.parentElement.style.backgroundColor = '#db7373';
            });
            this.seated.forEach((seated) => {
                currenSeat.forEach((s) => {
                    if (s.innerHTML == seated) {
                        s.parentElement.style.backgroundColor = '#7c7575';
                    }
                });
            });
        },
        getTimeEnd(time_start) {
            const showtime = time_start * 60;
            const endtime = showtime + this.film.duration;
            const hourEnd = endtime / 60;
            Math.floor(hourEnd);
            const minuteEnd = endtime % 60;
            if (minuteEnd < 10)
                return Math.floor(hourEnd) + ': ' + '0' + minuteEnd;
            else return Math.floor(hourEnd) + ':' + minuteEnd;
        },
        async getBookDay(date_start) {
            this.datestart = date_start;
            let fullDay = date_start.fullDay;
            this.showTime = true;
        },
        getCurrentDay() {
            const timeBooking = new Date();
            var day = {
                currentDay: `${timeBooking.getDate()}-${
                    timeBooking.getMonth() + 1
                }-${timeBooking.getFullYear()}`,
                currentTime: timeBooking.toLocaleTimeString('it-IT'),
            };
            return day;
        },
        checkPositionSeat(seat_label) {
            return (
                this.seated.includes(seat_label) ||
                this.seats.includes(seat_label)
            );
        },
        getPosition(index, number, e) {
            e.currentTarget.classList.toggle('active_seat');
            const seat = `${this.changeText(index)}${number}`;
            if (!this.checkPositionSeat(seat)) {
                this.seats.push(seat);
            } else {
                const index = this.seats.indexOf(seat);
                if (index > -1) {
                    this.seats.splice(index, 1);
                }
            }
        },
        getCost() {
            const cost = 75;
            this.cost = cost;
            const totalCost = this.cost * this.seats.length;
            return totalCost;
        },
        showEvent(event) {
            const dateDiv = document.querySelectorAll('.day ');
            dateDiv.forEach((date) => {
                date.style.backgroundColor = '#c1c2d6';
            });
            event.currentTarget.style.backgroundColor = '#db7373';
            this.choice_date = !this.choice_date;
        },
        async createTicket() {
            try {
                const array = this.seats.map((seat) => seat);
                const timeBooking = this.getCurrentDay();
                const formTicket = {
                    user_id: this.useUser.user.user_id,
                    movie_id: Number.parseInt(this.$route.params.id),
                    date_start: this.datestart.fullDay,
                    time_start: this.timeStart,
                    date_book: timeBooking.currentDay,
                    time_book: timeBooking.currentTime,
                    location: 'Lotte Can Tho',
                    seats: array,
                };
                console.log(formTicket);
                if (this.seats.length === 0) {
                    myAlertService.Alert('error', 'Bạn chưa chọn ghế');
                    return;
                }

                await bookingService.create(formTicket);
                myAlertService.Alert('success', 'Bạn đã đặt vé thành công');

                this.$router.push({ name: 'manager' });
            } catch (error) {
                console.log(error);
            }
        },
    },

    async mounted() {
        await this.getDetail();
    },
};
</script>

<style scoped>
.active_seat {
    background-color: #7c7575 !important;
}

#play {
    /* margin-top: 50px;aaa */
    display: flex;
    padding: 24px 24px 60px 40px;
    margin-bottom: 100px;
    z-index: 2;
    color: #ffffff;
    background-image: linear-gradient(
        to right top,
        #221e20,
        #292027,
        #2e2230,
        #2f253b,
        #2c2947,
        #2d2947,
        #2f2948,
        #302948,
        #35243c,
        #352131,
        #321e28,
        #2d1d21
    );
}
.play-text {
    margin: auto;
    display: flex;
    justify-content: center;
    justify-items: center;
    flex-direction: column;
    position: relative;
}

.movie-img {
    border-radius: 10px;
    height: 400px;
    margin: 2rem 2rem auto auto;
}

h4 {
    margin-top: 160px;
    color: #fff !important;
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
.showtime {
    border: 1px solid #59b3e1;
    cursor: pointer;
    border-radius: 5px;
}

.showtime i {
    color: #59b3e1;
    font-weight: 700;
}
.seat-container {
    background: #000;
    padding: 10px 0;
}
.position-booking {
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
.seat:hover {
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
.temp-ticket {
    border: 1px solid #000;
    margin: 0 auto auto auto;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 10px;
}
.btn {
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
