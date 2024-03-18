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

<<<<<<< HEAD
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
=======
  const cart = ref(JSON.parse(localStorage.getItem("cart")) || []);
  const saveToLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart.value));
  };
  const addProductToCart = (product) => {
    const productIndex = cart.value.findIndex((item) => item.id === product.id);
>>>>>>> b21b49d9a7cd386c5cd0e73141230b424642f57b

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
