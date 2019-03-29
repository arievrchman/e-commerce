<template>
  <div class="group">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h3 class="text-center my-3">Products</h3>
        </div>

        <div v-for="(product, index) in getProducts" :key="index" class="col-md-3 col-sm-6">
          <div class="product-top">
            <img
              class="img-fluid"
              :src="product.product_image"
              :alt="product.product_name"
              style="height: 220px; width:210px;"
            >
            <div class="overlay">
              <button type="button" class="btn btn-secondary" title="See details">
                <router-link :to="'/details/' + product._id">
                  <i class="fa fa-eye"></i>
                </router-link>
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                title="Add To Cart"
                @click.prevent="addToCart(product)"
              >
                <i class="fa fa-shopping-cart"></i>
              </button>
            </div>
          </div>
          <div class="product-bottom text-center">
            <h3>{{ product.product_name }}</h3>
            <h5>Rp. {{ product.price }}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['getProducts'],
  methods: {
    addToCart(product) {
      this.$emit('add-to-cart', product);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Nunito");

.container h3 {
  font-family: "Nunito", sans-serif;
  letter-spacing: 1px;
}

.container {
  width: 100%;
  margin-top: 5%;
  font-family: sans-serif;
  letter-spacing: 1px;
}

.container h2 {
  background: #0062cc;
  color: #fff;
  width: 200px;
  font-size: 24px;
  padding: 5px;
  height: 40px;
  font-family: cursive;
}

.container h2::after {
  content: '';
  border-top: 40px solid #0062cc;
  border-right: 40px solid transparent;
  position: relative;
  left: 53px;
  top: 34px;
}

.row {
  margin-top: 30px;
}

.product-bottom h3 {
  font-size: 13px;
  font-weight: bold;
}

.product-bottom h5 {
  font-size: 13px;
  padding-bottom: 10px;
}

.overlay  {
  display: block;
  opacity: 0;
  position: absolute;
  top: 10%;
  margin-left: 0px;
  width: 70px;
}

.product-top:hover .overlay {
  opacity: 1;
   margin-left: 5%;
   transition: 0.5s;
}

.overlay .fa {
  cursor: pointer;
  background-color: #fff;
  color: #000;
  height: 35px;
  width: 35px;
  font-size: 20px;
  padding: 7px;
  margin: 5%;
  margin-bottom: 5%;
}

.overlay .btn-secondary {
  background: transparent !important;
  border: none !important;
}

</style>
