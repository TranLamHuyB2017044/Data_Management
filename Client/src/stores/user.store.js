import { defineStore } from 'pinia';
import userService from '../services/user.service';
export const useUserStore = defineStore('user', {
    state: () => ({ user: null }),
    getters: {},
    actions: {
        async getLogin(username, password) {
            try {
                this.user = await userService.getLogin(username, password);
            } catch (err) {
                console.log(err);
            }
        },
        checkUser() {
            if (this.user && Object.keys(this.user).length) return true;
            return false;
        },
        async getLoginById() {
            try {
                const id = localStorage.getItem('id') || null;
                this.user = await userService.get(id);
            } catch (err) {
                console.log(err);
            }
        },
    },
});
