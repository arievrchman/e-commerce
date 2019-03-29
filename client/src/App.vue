<template>
  <div id="app">
    <Navbar
      :status="checkPoint"
      @logged-out="logout"
      :my-cart="getCarts"
    />
    <router-view
      @success-login="loggedIn"
      :get-products="products"
      @add-product="addNewProduct"
      @remove-product="removeTheProduct"
      @edit-product="updateProduct"
      @add-to-cart="addToCart"
      :carts="getCarts"
      @remove-from-carts="cart = $event"
      :current-user="currentUser"
      :transactions-ht="transactions"
      @clear-cart="cart = []"
      @fetch-trans="findAllTransaction"
    />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      checkPoint: {
        isLogin: false,
        isAdmin: false,
      },
      cart: [],
      allProducts: [],
      currentUser: {
        name: '',
        id: null,
      },
      transactions: [],
    };
  },
  created() {
    if (localStorage.getItem('token')) {
      this.loggedIn();
    }
  },
  mounted() {
    this.getAllProducts();
  },
  methods: {
    loggedIn() {
      this.axios({
        method: 'get',
        url: '/auth',
        headers: { token: localStorage.getItem('token') },
      })
        .then(({ data }) => {
          const user = {
            id: data._id,
            name: data.name,
          };
          this.currentUser = user;
          this.checkPoint.isLogin = true;
          if (data.role === 'admin') {
            this.checkPoint.isAdmin = true;
          }
          this.findUserCart();
          this.findAllTransaction();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logout() {
      this.checkPoint.isLogin = false;
      this.checkPoint.isAdmin = false;
    },
    getAllProducts() {
      this.axios({
        method: 'get',
        url: '/products',
      })
        .then(({ data }) => {
          this.allProducts = data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    addNewProduct(payload) {
      this.allProducts.unshift(payload);
    },
    removeTheProduct(payload) {
      const removed = this.allProducts.filter(product => product._id !== payload);
      this.allProducts = removed;
    },
    updateProduct(payload) {
      const updatedObj = this.allProducts.find(product => product._id == payload._id);
      Object.assign(updatedObj, payload);
    },

    addToCart(payload) {
      this.axios({
        method: 'patch',
        url: `/users/cart/${payload._id}/add`,
        headers: { token: localStorage.getItem('token') },
      })
        .then(({ data }) => {
          this.cart = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    findUserCart() {
      this.axios({
        method: 'get',
        url: '/users/cart',
        headers: { token: localStorage.getItem('token') },
      })
        .then(({ data }) => {
          this.cart = data.shopping_cart;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    findAllTransaction() {
      this.axios({
        method: 'get',
        url: '/checkout',
        headers: { token: localStorage.getItem('token') },
      })
        .then(({ data }) => {
          this.transactions = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    products() {
      return this.allProducts;
    },
    getCarts() {
      return this.cart;
    },
  },
};
</script>


<style>
* {
  margin: 0px;
  padding: 0px;
}
</style>
