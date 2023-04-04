<template>
    <div
        class="container_form d-flex align-items-center justify-content-center">
        <div class="card mycard border-0 text-white">
            <div class="card-body">
                <h2 class="card-title text-center">Wellcome</h2>
                <form method="post" @submit.prevent="login()">
                    <input
                        type="text"
                        class="form-control my-4 py-2"
                        placeholder="Username"
                        v-model="username"
                        required />
                    <input
                        type="password"
                        name=""
                        class="form-control my-4 py-2"
                        placeholder="Password"
                        v-model="password"
                        required />
                    <div
                        class="text-center mt-3 d-flex flex-column align-items-center justify-content-center">
                        <button class="btn btn-primary" type="submit">
                            Login
                        </button>
                        <span>
                            Already have an account ?
                            <router-link to="/signup">Sign up</router-link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import { useUserStore } from '../stores/user.store';
import Swal from 'sweetalert2';

export default {
    setup() {
        const userStore = useUserStore();
        return { userStore };
    },
    data() {
        return {
            username: '',
            password: '',
            user: null,
        };
    },
    methods: {
        async login() {
            await this.userStore.getLogin(this.username, this.password);
            this.user = this.userStore.user;

            if (!this.user || Object.keys(this.user).length === 0) {
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: 'Username or password incorrect!',
                    showConfirmButton: false,
                    timer: 1500,
                });
                return;
            }
            localStorage.setItem('id', this.user.user_id);
            console.log(this.user.name);
            Swal.fire({
                position: 'top',
                icon: 'success',
                title: 'Login succesfully.',
                showConfirmButton: false,
                timer: 1500,
            });
            this.$router.push('/');
        },
    },
};
</script>
<style scoped></style>
