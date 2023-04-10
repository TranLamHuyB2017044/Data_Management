<template>
    <div
        class="container_form d-flex align-items-center justify-content-center">
        <div class="card mycard border-0 text-white">
            <div class="card-body">
                <h2 class="card-title text-center">Wellcome</h2>
                <form method="post" @submit.prevent="register">
                    <input
                        type="text"
                        name=""
                        class="form-control my-4 py-2"
                        placeholder="FullName"
                        required
                        v-model="name" />
                    <input
                        type="email"
                        name=""
                        class="form-control my-4 py-2"
                        placeholder="Email"
                        required
                        v-model="email" />
                    <input
                        type="text"
                        name=""
                        class="form-control my-4 py-2"
                        placeholder="Username"
                        required
                        v-model="username" />
                    <input
                        type="password"
                        name=""
                        class="form-control my-4 py-2"
                        placeholder="Password"
                        required
                        v-model="password" />
                    <div class="d-flex align-items-center">
                        <input
                            id="inputAdmin"
                            type="checkbox"
                            class="p-3 m-2"
                            style="width: 2rem; height: 2rem"
                            v-model="admin" />
                        <label for="inputAdmin">Admin</label>
                    </div>

                    <div
                        class="text-center mt-3 d-flex flex-column align-items-center justify-content-center">
                        <button class="btn btn-primary" type="submit">
                            Sign Up
                        </button>
                        <span>
                            Already have an account ?
                            <router-link to="/login">Login</router-link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import userService from '../services/user.service';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            name: '',
            username: '',
            password: '',
            email: '',
            admin: false,
        };
    },
    methods: {
        async register() {
            const newUser = {
                name: this.name,
                username: this.username,
                email: this.email,
                password: this.password,
                admin: this.admin,
            };
            try {
                await userService.create(newUser);
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Create successfully',
                    showConfirmButton: false,
                    timer: 1500,
                });
                this.$router.push({ name: 'login' });
            } catch (err) {
                const message = err.response.data.message;
                console.log(message);
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        },
    },
};
</script>
<style scoped>
.form {
    margin: 30px auto 70px auto;
}
</style>
