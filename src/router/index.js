import {createRouter, createWebHistory} from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import ProductsPage from "@/pages/ProductsPage.vue";
import ContactPage from "@/pages/ContactPage.vue";
import CartPage from "@/pages/CartPage.vue";
import ProductIdPage from "@/pages/ProductIdPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import * as path from "path";


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
    {
        path: '/:pathMatch(.*)*',
        component: NotFoundPage,
    },
    {
        path: '/login',
        component: () => import('@/pages/LoginPage.vue'),
    },
    {
        path: '/signup',
        component: () => import('@/pages/SignUpPage.vue'),
    }
];

const router = createRouter({
    mode: 'history',
    routes,
    history: createWebHistory(),
    linkExactActiveClass: '!text-green-300 underline',
})

export  default  router;