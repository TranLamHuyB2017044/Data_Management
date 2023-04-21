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
                                <p class="mb-0">Tên người dùng</p>
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
                                <p class="mb-0">Tên đăng nhập</p>
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
                        <hr />
                        <div class="d-flex justify-content-start gap-3">
                            <div>
                                <input
                                    type="checkbox"
                                    name=""
                                    id="changePass"
                                    v-model="changePass"
                                    style="width: 1.5rem; height: 1.5rem" />
                            </div>
                            <label for="changePass">Thay đổi mật khẩu</label>
                        </div>
                        <div v-if="changePass">
                            <div class="row">
                                <div class="">
                                    <p class="mb-0">Mật khẩu hiện tại</p>
                                </div>
                                <div class="">
                                    <input
                                        v-model="this.currentPassword"
                                        type="password"
                                        class="form-control" />
                                </div>
                            </div>
                            <hr />
                            <div class="row">
                                <div class="">
                                    <p class="mb-0">Mật khẩu mới</p>
                                </div>
                                <div class="">
                                    <input
                                        v-model="this.newPassword"
                                        type="password"
                                        class="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
<<<<<<< HEAD
                <div class="col-10 d-flex">
                    <button
                        @click.prevent="updateUser()"
                        type="submit"
                        class="btn btn-primary w-100"
                        style="
                            background-color: #2b59735c;
                            white-space: nowrap;
                        ">
                        Cập nhật
=======
                <div class="col-6 d-flex">
                    <button
                        @click.prevent="updateUser()"
                        type="submit"
                        class="btn btn-primary"
                        style="background-color: #2b59735c; width:  !important;">
                        <span style="white-space: nowrap;">Cập nhật</span>
                        
>>>>>>> d005324d2771d95b28d1b6f038644d5adc990ade
                    </button>
                    <button
                        @click.prevent="deleteUser"
                        class="delete-btn btn btn-danger align-center mx-2"
                        style="background-color: #2b59735c">
                        Xóa
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import { useUserStore } from '../stores/user.store';
import userService from '../services/user.service';
import myAlertService from '../services/myAlert.service';
export default {
    setup() {
        const useUser = useUserStore();
        return { useUser };
    },
    data() {
        return {
            user: {},
            newPassword: '',
            currentPassword: '',
            changePass: false,
        };
    },
    methods: {
        async updateUser() {
            try {
                if (!this.currentPassword || !this.newPassword) {
                    myAlertService.Alert('error', 'Vui lòng nhập mật khẩu');
                    return;
                } else if (this.user.password !== this.currentPassword) {
                    myAlertService.Alert(
                        'error',
                        'Mật khẩu hiện tại không đúng',
                    );
                    return;
                } else {
                    this.user.password = this.newPassword;
                    await this.useUser.update(this.user.user_id, this.user);
                    myAlertService.Alert('success', 'Cập nhật thành công.');
                    this.reloadPage();
                }
            } catch (error) {
                myAlertService.Alert(
                    'error',
                    'Đã có lỗi xảy ra trong quá trình cập nhật!',
                );
            }
        },
        async deleteUser() {
            const curPass = prompt('Nhập mật khẩu hiện tại của bạn:');
            try {
                if (!curPass) {
                    myAlertService.Alert('error', 'Nhập mật khẩu để xóa.');
                    return false;
                } else if (curPass != this.user.password) {
                    myAlertService.Alert('error', 'Sai mật khẩu');
                } else {
                    var checkAgree = await myAlertService.Confirm(
                        'Xóa tài khoản',
                        'info',
                        'Bạn có chắc muốn xóa',
                        'Có',
                    );
                    if (checkAgree) {
                        await userService.delete(this.user.user_id);
                        localStorage.removeItem('id');
                        this.useUser.user = null;
                        this.$router.push({ name: 'login' });
                    } else {
                        return;
                    }
                }
            } catch (error) {
                myAlertService.Alert(
                    'error',
                    'Đã có lỗi xảy ra trong quá trình xóa!',
                );
            }
        },
        reloadPage() {
            window.location.reload();
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
    background-color: #097fb2da !important;
}
.delete-btn:hover {
    background: red !important;
}
</style>
