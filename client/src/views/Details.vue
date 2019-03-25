<template>
  <div class="product-details">
    <div class="container">
      <div class="row">

        <div class="col-lg-8 col-md-8 col-sm-6 col-xs-12 product-details__info">
          <div class="product-details__description">
            <small>{{ product.catalog }}</small>
            <h3>{{product.product_name}}</h3>
            <p>
              {{product.description}}
            </p>
          </div>
          <div class="product-details__price-cart">
            <p>Rp. {{product.price}}</p>
            <button
              class="btn btn-outline-dark"
              @click.prevent="addToCart(product)">
              <i class="fa fa-cart-plus"></i>
              <small> Add to Cart</small>
            </button>
          </div>
        </div>

        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 product-details__image">
          <img
          class="img-fluid"
          :src="product.product_image" alt>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      product: {}
    };
  },
  mounted() {
    let id = this.$route.params.id;
    this.axios({
      method: 'get',
      url: '/products/' + id
    })
      .then(({ data }) => {
        this.product = data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    addToCart(product) {
      this.$emit('add-to-cart', product);
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Nunito");

.product-details {
  border-bottom: 2px solid #F5F5F5;
  padding: 30px 0;
}

.product-details__description {
  padding-top: 30px;
}

.product-details__description {
  font-family: "Nunito", sans-serif;
}

.product-details__description small {
  color: #808080;
}

.product-details__description h3 {
  font-family: "Nunito", sans-serif;
  margin: 5px 0 30px 0;
}
.product-details__price-cart {
  display: flex;
  padding-top: 30px;
}
.product-details__price-cart p {
  flex-grow: 2;
  font-size: 15px;
  font-weight: bolder;
}
</style>
