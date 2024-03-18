import {defineStore} from "pinia";
import axios from "axios";
import {useToast} from "vue-toastification";
const toast = useToast();

export const useStore = defineStore("store", {
    state: () => ({
        products: [],
        cart: JSON.parse(localStorage.getItem('cart')) || [],
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
        addProductToCart(product) {
            const productIndex = this.cart.findIndex(item => item.id === product.id);

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
            this.cart = this.cart.filter(item => item.id !== id);
            toast.success("Product removed from cart");
            this.saveToLocalStorage();
        },
        decreaseProduct(product) {
            const productIndex = this.cart.findIndex(item => item.id === product.id);
            if (productIndex !== -1 && this.cart[productIndex].quantity > 1) {
                this.cart[productIndex].quantity -= 1;
                toast.success("Product quantity decreased");
            } else if (productIndex !== -1 && this.cart[productIndex].quantity === 1) {
                this.cart.splice(productIndex, 1);
                toast.success("Product removed from cart");
            }
            this.saveToLocalStorage();
        },
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
        saveToLocalStorage() {
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },
        sendMessage() {
            toast.success("Your message was sent");
        },
        setCurrentProductPageId(productId) {
            this.currentProductPageId = productId;
        },
    },
    getters: {
        getProducts(state) {
            return state.products.filter(item => item.category === "men's clothing" || item.category === "women's clothing");
        },
        filteredUniqueCartItems(state) {
            return state.cart.filter((item, index) => state.cart.indexOf(item) === index);
        },
        getCartTotal(state) {
            return state.cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
        },
        getCartTotalCount(state) {
            return state.cart.reduce((total, item) => total + item.quantity, 0);
        },
    },

});
