<template>
  <div v-if="carts.length > 0">
    <div v-for="(cart, index) in carts" :key="index">
      <div class="product-details">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 product-details__image">
              <img class="img-fluid" :src="cart.product_image" alt>
            </div>
            <div class="col-lg-8 col-md-8 col-sm-6 col-xs-12 product-details__info">
              <div class="product-details__description">
                <h5>{{cart.product_name}}</h5>
                <h6>{{cart.description}}</h6>
              </div>
              <div class="product-details__price-cart">
                <a href="" @click.prevent="removeFromCart(cart._id)" class="mt-2">
                  <small>Remove from Cart</small>
                </a>
              </div>
            </div>
          </div>
          <hr>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row col-md-6 offset-md-6">
        <div class="d-flex w-100">
          <h5>Subtotal</h5>
          <h5 class="ml-auto">Rp. {{ countPrice(carts) }}</h5>
        </div>
        <router-link :to="'/checkout/' + currentUser.id" class="ml-auto">
          <button class="mt-5 btn btn-md btn-dark">
            Checkout →
          </button>
        </router-link>
      </div>
      <hr>
    </div>
  </div>
</template>

<script>
export default {
  props: ['carts', 'currentUser'],
  data() {
    return {
      total: 0,
    }
  },
  methods: {
    countPrice(data) {
      let count = 0;
      data.forEach(e => {
        count += e.price;
      });
      this.total = count;
      return count;
    },
    removeFromCart(id) {
      this.axios({
        method: 'patch',
        url: '/users/cart/' + id + '/remove',
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          // console.log(data);
          this.$emit('remove-from-carts', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  
};
</script>

<style scoped>

.container h5 {
  font-family: cursive;
  font-size: 15px;
  text-transform: uppercase;
}

.container h6 {
  font-family: cursive;
  margin-top: 1.5rem;
  font-size: 14px;
}

.container button {
  text-transform: uppercase;
  font-size: 15px;
  font-family: cursive;  
  padding: 10px;
}

.product-details__description {
  padding-top: 30px;
}

.product-details__description {
  font-family: cursive;
}

.product-details__description h3 {
  font-family: cursive;
  margin: 5px 30px;
}
.product-details__price-cart {
  display: flex;
  padding-top: 5px;
}

.product-details__price-cart a {
  color: grey;
}

.btn-md {
  border-radius: 0px !important;
}

</style>
