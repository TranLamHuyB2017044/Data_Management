import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import Details from '../views/Details.vue';
import myTicket from '../views/myTicket.vue';
// import Manage from '../views/Manage.vue'
import { useUserStore } from '../stores/user.store';
import pinia from '../stores/defineStore';
const userStore = useUserStore(pinia);
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/signup',
            name: 'signup',
            component: Signup,
        },
        {
            path: '/:id',
            name: 'details',
            component: Details,
            props: true,
        },
        {
            path: '/myticket',
            name: 'myticket',
            component: myTicket,
        },
        // {
        //     path: '/admin/manager',
        //     name: 'manager',
        //     component: Manage,
        // },
    ],
});
router.beforeEach(async (to, _from, next) => {
    await userStore.getLoginById();
    const empty = userStore.checkUser();
    if (!empty && !(to.name === 'login') && !(to.name === 'signup')) {
        next({ name: 'login' });
    } else if (empty && to.name === 'login') next({ name: 'home' });
    else next();
});
export default router;
