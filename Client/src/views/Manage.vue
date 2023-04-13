<template>
    <div style="width: 80%" class="mx-auto">
        <div class="card m-4" v-for="item in items" :key="item">
            <div class="row">
                <div class="col-md-3">
                    <img
                        :src="item.poster_url"
                        style="width: 100%; height: 100%"
                        class="img-fluid rounded-start"
                        alt="..." />
                </div>
                <div class="col-md-6">
                    <div class="card-body">
                        <h5 class="card-title">{{ item.title }}</h5>
                        <hr />
                        <div
                            class="d-flex flex-column flex-md-row justify-content-between">
                            <p class="card-text">
                                Ngày chiếu: {{ item.date_start }}
                            </p>
                            <p class="card-text">
                                Thời gian chiếu: {{ item.time_start }}
                            </p>
                        </div>
                        <p class="card-text">
                            Địa chỉ rạp: {{ item.location }}
                        </p>
                        <p class="card-text">
                            Ghế:
                            <span
                                v-for="(seat, index) in item.seats"
                                :key="index">
                                {{ seat }}
                                <span v-if="index !== item.seats.length - 1"
                                    >,
                                </span>
                            </span>
                        </p>
                        <p class="card-text">
                            Giá vé:
                            {{ showCost(item.seats?.length) }}
                        </p>
                        <div
                            class="d-flex flex-column flex-md-row justify-content-between">
                            <p class="card-text">
                                Ngày đặt: {{ item.date_book }}
                            </p>
                            <p class="card-text">
                                Thời gian đặt: {{ item.time_book }}
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    class="col-md-3 d-flex justify-content-center align-items-center"
                    :qr="getQRCode(item)">
                    <qrcode-vue :value="value" :size="size" level="L" />
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
import QrcodeVue from 'qrcode.vue';
export default {
    setup() {
        const useUser = useUserStore();
        return { useUser };
    },
    data() {
        return {
            items: [],
            value: '',
            size: 180,
            cost: 75000,
        };
    },
    components: {
        QrcodeVue,
    },
    methods: {
        showCost(numSeat) {
            return new Intl.NumberFormat().format(this.cost * numSeat);
        },
        getQRCode(data) {
            this.value = `Film name: ${data.title}\nMovie day: ${
                data.date_start
            }\nMovie time: ${data.time_start}\nSeats: ${
                data.seats
            }\nCustomer: ${data.name}\nDay booked: ${
                data.date_book
            }\nTime booked: ${data.time_book}\nCost: ${this.showCost(
                data.seats?.length,
            )}`;
        },
    },
    async mounted() {
        const userID = this.useUser.user.user_id;
        try {
            this.items = await bookingService.getAllByUserId(userID);
            this.items = this.items.reverse();
            this.items.forEach(async (res) => {
                let seats = await bookedSeatService.getSeatByBookingId(
                    res.booking_id,
                );
                res.seats = seats.map((result) => result);
            });
        } catch (err) {
            console.log(err);
        }
    },
};
</script>
