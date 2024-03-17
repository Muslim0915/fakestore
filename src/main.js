import {createApp} from 'vue'
import {createPinia} from "pinia";
import router from "@/router";
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import 'primeicons/primeicons.css'
import './style.css'
import App from './App.vue'


const pinia = createPinia();


const app = createApp(App);


app.use(router);
app.use(pinia);
app.use(Toast);
app.mount('#app')
