import {createRouter, createWebHistory} from "vue-router";
import {useProductsStore} from "@/store/index.js";


const routes = [
    {
        path: '/',
        component: () => import('@/pages/HomePage.vue'),
    },
    {
        path: '/products',
        component: () => import('@/pages/ProductsPage.vue')
    },
    {
        path: '/contact',
        component: () => import('@/pages/ContactPage.vue'),
    },
    {
        path: '/cart',
        component: () => import('@/pages/CartPage.vue'),
    },
    {
        path: '/products/:id',
        component: () => import('@/pages/ProductIdPage.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/NotFoundPage.vue'),
    },
    {
        path: '/login',
        component: () => import('@/pages/LoginPage.vue'),
    },
    {
        path: '/signup',
        component: () => import('@/pages/SignUpPage.vue'),
    },
    {
        path: '/terms',
        component: () => import('@/pages/TermsPage.vue'),
    }
];

const router = createRouter({
    mode: 'history',
    routes,
    history: createWebHistory(),
    linkExactActiveClass: '!text-green-300 underline',
});

router.beforeEach((to, from, next) => {
    useProductsStore.isLoading = true
    next()
});

router.afterEach(() => {
    useProductsStore.isLoading = false
})
export  default  router;