<template>
  <div>
    <div id="landingPage" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#landingPage" data-slide-to="0" class="actives"></li>
        <li data-target="#landingPage" data-slide-to="1"></li>
        <li data-target="#landingPage" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../assets/home/image1.jpg" class="d-block w-100" alt="Casual Men's">
        </div>
        <div class="carousel-item">
          <img src="../assets/home/image2.jpg" class="d-block w-100" alt="Mens Shoes 2019">
        </div>
        <div class="carousel-item">
          <img src="../assets/home/image3.jpg" class="d-block w-100" alt="Crockett and Jones Boots">
        </div>
      </div>
    </div>

    <div class="container">
      <h2>New Arrivals</h2>
      <div class="row">

        <div v-for="(product, index) in products.slice(0, 4)" :key="index" class="col-md-3 col-sm-6">
          <div class="product-top">
            <img class="img-fluid" :src="product.product_image" :alt="product.product_name" style="height: 220px; width:210px;">
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
  name: 'landing-page',
  props: ['products'],
  methods: {
    addToCart(product) {
      this.$emit('add-to-cart', product);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Nunito");

.carousel-item {
  height: 100vh;
  min-height: 300px;
  background: no-repeat center center scroll;
  -webkit-background-size: cover;
  background-size: cover;
}

.carousel-item:after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
}

.carousel-indicators li {
  width: 10px;
  height: 10px;
  border-radius: 100%;
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
  font-size: 21px;
  padding: 5px;
  height: 40px;
  font-family: "Nunito", sans-serif;
}

.container h2::after {
  content: '';
  border-top: 40px solid #0062cc;
  border-right: 40px solid transparent;
  position: relative;
  left: 62px;
  top: 37px;
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
