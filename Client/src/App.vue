<script>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import { useUserStore } from './stores/user.store';
import { useFilmStore } from './stores/film.store';
import bookedSeatService from './services/bookedSeat.service';
import bookingService from './services/booking.service';
export default {
    setup() {
        const userStore = useUserStore();
        const filmStore = useFilmStore();
        return { userStore, filmStore };
    },
    components: {
        AppHeader,
        AppFooter,
    },
    async mounted() {
        await this.userStore.getLoginById();
    },
};
</script>

<template>
    <div id="app" style="overflow-x: hidden">
        <app-header v-if="this.userStore.user" />
        <RouterView :key="this.$route.path"/>
        <app-footer v-if="this.userStore.user" />
    </div>
</template>

<style></style>
