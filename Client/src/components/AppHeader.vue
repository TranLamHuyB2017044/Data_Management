<template>
    <header>
        <router-link to="/" class="header-title">BOOKING</router-link>
        <nav>
            <ul class="nav__links">
                <li>
                    <router-link :to="{ name: 'manager' }"
                        >Vé của tôi</router-link
                    >
                </li>
                <li @click="feature"><a href="#">Tin tức</a></li>
                <li @click="feature"><a href="#">Trò chuyện</a></li>
            </ul>
        </nav>
        <div class="d-flex justify-content-center align-items-center gap-2">
            <form class="d-flex mx-5">
                <input
                    class="form-control me-2 text-white"
                    style="height: 50%"
                    type="search"
                    placeholder="Tìm kiếm"
                    aria-label="Search"
                    @keyup.enter="changeToSearchPage"
                    v-model="searchText" />
                <button
                    class="btn btn-outline-success"
                    style="height: 50%"
                    @click.prevent="changeToSearchPage()">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
            <span v-if="this.userStore.user" class="text-white">{{
                this.userStore.user.name
            }}</span>
            <router-link v-else to="/login" class="cta">Login</router-link>
            <div class="dropdown">
                <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenu2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i id="user_dropdown" class="fa-regular fa-circle-user"></i>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <li>
                        <router-link
                            to="/edit"
                            class="dropdown-item"
                            type="button">
                            Chỉnh sửa thông tin
                        </router-link>
                    </li>
                    <li>
                        <button
                            v-if="this.userStore.user"
                            @click="logout"
                            class="dropdown-item"
                            type="button">
                            Đăng xuất
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>
<script>
import { useUserStore } from '../stores/user.store';
import { useFilmStore } from '../stores/film.store';
import myAlertService from '../services/myAlert.service';
export default {
    setup() {
        const userStore = useUserStore();
        const filmStore = useFilmStore();
        return { userStore, filmStore };
    },
    data() {
        return {
            searchText: '',
        };
    },
    methods: {
        logout() {
            localStorage.removeItem('id');
            this.userStore.user = null;
            this.$router.push({ name: 'login' });
        },
        feature() {
            myAlertService.Alert('info', 'Tính năng hiện chưa tồn tại');
        },
        changeToSearchPage() {
            if (this.searchText)
                this.$router.push({
                    name: 'search',
                    params: { searchText: this.searchText },
                });
        },
    },
};
</script>
<style scoped>
header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 10%;
    background-color: #24252a;
    height: 70px;
}

.logo {
    cursor: pointer;
}

.header-title {
    text-decoration: none;
    font-size: 25px;
    font-weight: bold;
    color: rgb(16, 179, 220);
}

.header-title:hover {
    opacity: 0.8;
    color: rgb(16, 179, 220);
}

.nav__links a,
.cta {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    color: #edf0f1;
    text-decoration: none;
}

.nav__links {
    list-style: none;
    margin-top: 15px;
    display: flex;
}

.nav__links li {
    padding: 0px 20px;
}

.nav__links li a {
    transition: color 0.3s ease 0s;
}

.nav__links li a:hover {
    color: #0088a9;
}

.cta {
    padding: 5px 25px;
    background-color: rgba(0, 136, 169, 1);
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: 0.3s ease 0s;
}

.cta:hover {
    background-color: rgba(0, 136, 169, 0.8);
    color: white;
}

#user_dropdown {
    font-size: 28px;
}
</style>
