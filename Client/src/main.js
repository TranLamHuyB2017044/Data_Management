import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createPinia } from 'pinia';
import './assets/css/style.css';

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);
app.mount('#app');
