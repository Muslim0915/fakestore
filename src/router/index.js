import {createRouter, createWebHistory} from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import ProductsPage from "@/pages/ProductsPage.vue";
import ContactPage from "@/pages/ContactPage.vue";
import CartPage from "@/pages/CartPage.vue";
import ProductIdPage from "@/pages/ProductIdPage.vue";


const routes = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/products',
        component: ProductsPage,
    },
    {
        path: '/contact',
        component: ContactPage,
    },
    {
        path: '/cart',
        component: CartPage,
    },
    {
        path: '/products/:id',
        component: ProductIdPage,
    },
];

const router = createRouter({
    routes,
    history: createWebHistory(),
    linkExactActiveClass: '!text-green-300 underline',
})

export  default  router;