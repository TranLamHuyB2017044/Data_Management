<template>
    <header>
        <router-link to="/" class="header-title">BOOKING</router-link>
        <nav>
            <ul class="nav__links">
                <li><a href="#">Services</a></li>
                <li><a href="#">Projects</a></li>
                <li><a href="#">About</a></li>
            </ul>
        </nav>
        <div class="d-flex justify-content-center align-items-center gap-2">
            <span v-if="this.userStore.user" class="text-white">{{
                this.userStore.user.name
            }}</span>
            <router-link v-else to="/login" class="cta">Login</router-link>
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <li><button v-if="this.userStore.user" @click="logout" class="dropdown-item" type="button">Logout</button></li>
                        <li>
                            <router-link to="/myticket" class="dropdown-item" type="button">
                                My Ticket
                            </router-link>
                        </li>
                        <li>
                            <button class="dropdown-item" type="button">
                                Something else here
                            </button>
                        </li>
                    </ul>
                </div>
        </div> 
    </header>
</template>
<script>
import { useUserStore } from "../stores/user.store";
export default {
    setup() {
        const userStore = useUserStore();
        return { userStore };
    },
    data() {
        return {};
    },
    methods: {
        logout() {
            localStorage.removeItem("id");
            this.userStore.user = null;
            this.$router.push({ name: "login" });
        },
    },
};
</script>
<style>
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
    font-family: "Montserrat", sans-serif;
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
</style>
