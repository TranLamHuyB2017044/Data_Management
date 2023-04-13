<template>
    <div class="card m-4" v-for="item in items" :key="item">
        <div class="row">
            <div class="col-md-3">
                <img
                    :src="item.poster_url"
                    class="img-fluid rounded-start"
                    alt="..." />
            </div>
            <div class="col-md-6">
                <div class="card-body">
                    <h5 class="card-title">{{ item.title }}</h5>
                    <hr />
                    <div class="d-flex justify-content-between">
                        <p class="card-text">
                            Ngày chiếu: {{ item.date_start }}
                        </p>
                        <p class="card-text">
                            Thời gian chiếu: {{ item.time_start }}
                        </p>
                    </div>
                    <p class="card-text">Địa chỉ rạp: {{ item.location }}</p>
                    <p class="card-text">
                        Ghế:
                        <span v-for="(seat, index) in item.seats" :key="index">
                            {{ seat }}
                            <span v-if="index !== item.seats.length - 1"
                                >,
                            </span>
                        </span>
                    </p>
                    <p class="card-text">
                        Giá vé:
                        {{ showCost(item.seats.length) }}
                    </p>
                    <div class="d-flex justify-content-between">
                        <p class="card-text">Ngày đặt: {{ item.date_book }}</p>
                        <p class="card-text">
                            Thời gian đặt: {{ item.time_book }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card-body">
                    <h5 class="card-title">{{ item.title }}</h5>
                    <p class="card-text">Thời gian: {{ item.time_start }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from '../services/user.service';
import bookedSeatService from '../services/bookedSeat.service';
import bookingService from '../services/booking.service';
import { useUserStore } from '../stores/user.store';
export default {
    setup() {
        const useUser = useUserStore();
        return { useUser };
    },
    data() {
        return {
            items: [],
        };
    },
    methods: {
        showCost(numSeat) {
            numSeat = Number.parseInt(numSeat);
            return new Intl.NumberFormat().format(75000 * numSeat);
        },
    },
    async mounted() {
        const userID = this.useUser.user.user_id;
        this.items = JSON.parse(
            JSON.stringify(await bookingService.getAllByUserId(userID)),
        );
        this.items.forEach(async (res) => {
            let seats = await bookedSeatService.getSeatByBookingId(
                res.booking_id,
            );
            res.seats = seats.map((result) => result);
        });
        //  = JSON.parse(JSON.stringify(response));
        console.log(this.items);
    },
};
</script>
