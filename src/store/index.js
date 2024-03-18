import { defineStore } from "pinia";
import axios from "axios";
import { useToast } from "vue-toastification";
import { computed, readonly, ref } from "vue";

export const useProductsStore = defineStore("products", () => {
    const toast = useToast();

    const products = ref([]);

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get("https://fakestoreapi.com/products");
            products.value = data;
        } catch (error) {
            alert(error);
            console.log(error);
        }
    };

    const cart = ref(JSON.parse(localStorage.getItem("cart")) || []);
    const saveToLocalStorage = () => {
        localStorage.setItem("cart", JSON.stringify(cart.value));
    };
    const addProductToCart = (product) => {
        const productIndex = cart.value.findIndex((item) => item.id === product.id);

        if (productIndex !== -1) {
            cart.value[productIndex].quantity += 1;
            toast.success("Product count increased");
        } else {
            cart.value.push({ ...product, quantity: 1 });
            toast.success("Product added to cart");
        }

        saveToLocalStorage();
    };
    const removeProductFromCart = (id) => {
        cart.value = cart.value.filter((product) => product.id !== id);
        toast.success("Product removed from cart");
        saveToLocalStorage();
    };

    const decreaseProduct = (productEl) => {
        const productIndex = cart.value.findIndex(
            (product) => product.id === productEl.id
        );
        if (productIndex !== -1 && cart.value[productIndex].quantity > 1) {
            cart.value[productIndex].quantity -= 1;
            toast.success("Product quantity decreased");
        } else if (productIndex !== -1 && cart.value[productIndex].quantity === 1) {
            cart.value = cart.value.filter((_, index) => index === productIndex);
            toast.success("Product removed from cart");
        }
        saveToLocalStorage();
    };

    const getCartTotal = computed(() =>
        cart.value
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)
    );
    const getCartTotalCount = computed(() =>
        cart.value.reduce((total, item) => total + item.quantity, 0)
    );

    const quantity = ref(0);

    const price = ref(0);

    const currentProductPageId = ref(null);

    const isMenuOpen = ref(false);
    const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value;
    };

    const sendMessage = () => {
        toast.success("Your message was sent");
    };

    return {
        products: readonly(products),
        fetchProducts,

        cart: readonly(cart),
        addProductToCart,
        removeProductFromCart,
        decreaseProduct,
        getCartTotal,
        getCartTotalCount,

        quantity: readonly(quantity),

        price: readonly(price),

        currentProductPageId: readonly(currentProductPageId),

        isMenuOpen: readonly(isMenuOpen),
        toggleMenu,

        sendMessage,
    };
});
