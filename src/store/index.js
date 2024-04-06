import {defineStore} from "pinia";
import axios from "axios";
import {useToast} from "vue-toastification";
import {db, dbRef, get, set} from "@/firebase/index.js";

const toast = useToast();

export const useProductsStore = defineStore("store", {
    state: () => ({
        products: [],
        cart: JSON.parse(localStorage.getItem("cart")) || [],
        quantity: 0,
        price: 0,
        currentProductPageId: null,
        isMenuOpen: false,
        isSuccess: false,
        isDisabled: true,
        isLoading: false,
    }),

    actions: {
        async fetchProducts() {
            try {
                this.isLoading = true;
                const {data} = await axios.get('https://fakestoreapi.com/products');
                this.products = data;
                localStorage.setItem('products', JSON.stringify(data));
                this.isLoading = false;
            } catch (error) {
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
        sendMessage(username, email, message) {
            const error = this.checkValidation([[username, email, message]]); // Передача данных как массив в checkValidation

            if (error) {
                return console.log(username, email, message);
            }
            const newMessage = {
                username: username,
                email: email,
                message: message
            }

            set(dbRef(db, 'messages/' + username), newMessage).then(() => {
                return this.successMessage('Your message has been sent');
            }).catch(error => {
                this.errorMessage(error);
            })
        },
        successMessage(message) {
            toast.success(message);
            return this.isSuccess = true;

        },

        errorMessage(error) {
            return toast.error(error);
        },

        checkValidation(data) {
            const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            let error = false;

            data.forEach((item) => {
                const [username, email, message, password, confirmPassword] = item;

                if (username === '' || email === '' || message === '') {
                    this.errorMessage("Please fill all the fields");
                    error = true;
                } else if (!emailRe.test(email)) {
                    this.errorMessage("Please enter a valid email address example@example.com");
                    error = true;
                } else if (message.length < 6) {
                    this.errorMessage("Message must be at least 6 characters");
                    error = true;
                } else if (password && password.length < 8) {
                    this.errorMessage("Password must be at least 8 characters");
                    error = true;
                } else if (password && confirmPassword && password !== confirmPassword) {
                    this.errorMessage("Passwords do not match");
                    error = true;
                }
            });

            return error;
        },


        signUp(username, email, password, confirmPassword) {
            const newUser = {
                id: Date.now(),
                username: username,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            }
            if (this.checkValidation([[username, email, password, confirmPassword]])) {
                return;
            }

            const useRef = dbRef(db, 'users/' + username);
            get(useRef).then((snapshot) => {
                if (snapshot.exists()) {
                    this.errorMessage("User already exists");
                } else {
                    set(dbRef(db, 'users/' + username), newUser).then(() => {
                        this.successMessage('Your account has been created');
                        this.isSuccess = true;
                    }).catch(error => {
                        this.errorMessage(error);
                        console.error(error);
                    });
                }

            })
        },
        logIn(username, email, password) {

            if (this.checkValidation([[username, email, password]])) {
                return;
            }

            const useRef = dbRef(db, 'users/' + username);
            get(useRef).then((snapshot) => {

                if (snapshot.exists()) {
                    if (snapshot.val().password === password) {
                        this.successMessage('Login successful');
                        this.isSuccess = true
                    } else {
                        this.errorMessage('Incorrect password');
                    }
                } else {
                    this.errorMessage('User not found');
                }
            })
        }

    },


    getters: {
        getCartTotal(state) {
            return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
        },
        getCartTotalCount(state) {
            return state.cart.reduce((total, item) => total + item.quantity, 0);
        },
        getFilteredProducts(state) {
            return state.products.filter(item => item.category === "women's clothing" || item.category === "men's clothing");
        },
    },

});
