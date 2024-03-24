import {defineStore} from "pinia";
import axios from "axios";
import {useToast} from "vue-toastification";

const toast = useToast();

export const useProductsStore = defineStore("store", {
    state: () => ({
        products: [],
        cart: JSON.parse(localStorage.getItem("cart")) || [],
        quantity: 0,
        price: 0,
        currentProductPageId: null,
        isMenuOpen: false,

    }),

    actions: {
        async fetchProducts() {
            try {
                const {data} = await axios.get('https://fakestoreapi.com/products');
                this.products = data;
                localStorage.setItem('products', JSON.stringify(data));
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        saveToLocalStorage() {
            localStorage.setItem("cart", JSON.stringify(this.cart));
        },
        addProductToCart(product) {
            const productIndex = this.cart.findIndex((item) => item.id === product.id);

            if (productIndex !== -1) {
                this.cart[productIndex].quantity += 1;
                toast.success("Product count increased");
            } else {
                this.cart.push({...product, quantity: 1});
                toast.success("Product added to cart");
            }

            this.saveToLocalStorage();
        },
        removeProductFromCart(id) {
            this.cart = this.cart.filter((product) => product.id !== id);
            toast.success("Product removed from cart");
            this.saveToLocalStorage();
        },
        decreaseProduct(productEl) {
            const productIndex = this.cart.findIndex(
                (product) => product.id === productEl.id
            );
            if (productIndex !== -1 && this.cart[productIndex].quantity > 1) {
                this.cart[productIndex].quantity -= 1;
                toast.success("Product quantity decreased");
            } else if (productIndex !== -1 && this.cart[productIndex].quantity === 1) {
                this.removeProductFromCart(productEl.id)
            }
            this.saveToLocalStorage();
        },
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
        sendMessage: () => {
            toast.success("Your message was sent");
        },

    },


    getters: {
        getCartTotal(state) {
            return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
        },
        getCartTotalCount(state) {
            return state.cart.reduce((total, item) => total + item.quantity, 0);
        },
        getFilteredProducts(state) {
            return state.products.filter(item => item.category === "women's clothing" || item.category === "men's clothing")
        }


    },

});
