<template>
    <div class="edit d-flex justify-content-center align-items-center">
        <form
            @submit.prevent="updateUser"
            @submit="deleteUser"
            class="vw-50 my-5 form_edit d-flex flex-column justify-content-center align-items-center p-3 rounded-4"
            style="border-radius: 5px; backdrop-filter: blur(50px)">
            <div class="col-lg-12 border-0">
                <div class="card mb-4" style="background-color: unset">
                    <div class="card-body" style="background-color: unset">
                        <div class="row">
                            <div class="">
                                <p class="mb-0">Name</p>
                            </div>
                            <div class="">
                                <input
                                    v-model="this.user.name"
                                    type="text"
                                    class="form-control"
                                    id="name" />
                            </div>
                        </div>
                        <hr />
                        <div class="row">
                            <div class="">
                                <p class="mb-0">User Name</p>
                            </div>
                            <div class="">
                                <input
                                    v-model="this.user.username"
                                    type="text"
                                    class="form-control"
                                    id="username" />
                            </div>
                        </div>
                        <hr />
                        <div class="row">
                            <div class="">
                                <p class="mb-0">Password</p>
                            </div>
                            <div class="">
                                <input
                                    v-model="this.newpassword"
                                    type="password"
                                    class="form-control"
                                    id="password" />
                            </div>
                        </div>
                        <hr />
                        <div class="row">
                            <div class="">
                                <p class="mb-0">Email</p>
                            </div>
                            <div class="">
                                <input
                                    v-model="this.user.email"
                                    type="text"
                                    class="form-control"
                                    id="email" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-4">
                    <button
                        type="submit"
                        class="btn btn-primary align -center"
                        style="background-color: #2b59735c">
                        Update
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import { useUserStore } from '../stores/user.store';
export default {
    setup() {
        const useUser = useUserStore();
        return { useUser };
    },
    data() {
        return {
            user: {},
            newpassword: '',
        };
    },
    methods: {
        async updateUser() {
            try {
                this.user.password = this.newpassword;
                await this.useUser.update(this.user.user_id, this.user);
                alert('User update successfully!!');
                this.$forceUpdate();
            } catch (error) {
                console.error(error);
            }
        },
    },
    mounted() {
        this.user = this.useUser.user;
    },
};
</script>
<style scoped>
.edit {
    height: 90vh;
    width: 100vw;
    background-image: url(../assets/bg_edit.jpg) !important;
    background-repeat: no-repeat;
    background-size: cover;
}
button:hover {
    background-color: #2b5973da !important;
}
</style>
