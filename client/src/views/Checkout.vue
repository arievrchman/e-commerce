<template>
  <div class="row">
    <div class="col-lg-6">
      <div class="p-5 contact-information border-right">
        <h4 class="text-center form-name">Contact Information</h4>

        <form class="mt-3">
          <div class="form-group">
            <input
              v-validate="'required|email'"
              v-model="email"
              type="email"
              name="email"
              class="form-control"
              placeholder="Email"
            >
            <span class="small text-danger" v-show="errors.has('email')">{{ errors.first('email') }}</span>
          </div>
          <span class="form-text">Shipping address</span>
          <div class="form-row">
            <div class="form-group col-md-6">
              <input
                v-validate="'required'"
                v-model="fname"
                type="text"
                name="firstname"
                class="form-control"
                placeholder="First name"
              >
              <span
                class="small text-danger"
                v-show="errors.has('firstname')"
              >First name is required</span>
            </div>
            <div class="form-group col-md-6">
              <input
                v-validate="'required'"
                v-model="lname"
                type="text"
                name="lastname"
                class="form-control"
                placeholder="Last name"
              >
              <span class="small text-danger" v-show="errors.has('lastname')">Last name is required</span>
            </div>
          </div>
          <div class="form-group">
            <input
              v-validate="'required'"
              v-model="address"
              type="text"
              name="address"
              class="form-control"
              placeholder="Address"
            >
            <span class="small text-danger" v-show="errors.has('address')">Address is required</span>
          </div>
          <div class="form-group">
            <input
              v-validate="'required'"
              v-model="city"
              type="text"
              name="city"
              class="form-control"
              placeholder="City"
            >
            <span class="small text-danger" v-show="errors.has('city')">City is required</span>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <input
                v-validate="'required'"
                v-model="state"
                type="text"
                name="state"
                class="form-control"
                placeholder="State"
              >
              <span class="small text-danger" v-show="errors.has('state')">State is required</span>
            </div>
            <div class="form-group col-md-6">
              <input
                v-validate="'required'"
                v-model="zipcode"
                type="text"
                name="zipcode"
                class="form-control"
                placeholder="Zip code"
              >
              <span class="small text-danger" v-show="errors.has('zipcode')">Zip code is required</span>
            </div>
          </div>
          <div class="form-group d-flex my-3 justify-content-end">
            <button @click.prevent="checkout" type="button" class="btn btn-md btn-outline-dark">
              <span class="form-btn">Confirm</span>
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="col-lg-6">
      <div class="d-flex flex-column">
        <div class="row" v-for="(cart, index) in carts" :key="index">
          <div class="p-4 mt-3">
            <img :src="cart.product_image" class="img-fluid border" style="height: 120px" alt>
          </div>
          <div class="d-flex justify-content-between w-50">
            <p class="align-self-center form-text">{{ cart.product_name }}</p>
          </div>
        </div>
      </div>
      <hr>
      <div class="container">
        <div class="row col-md-6 offset-md-6">
          <div class="d-flex w-100">
            <p class="form-text">Total :</p>
            <p class="ml-auto form-text">Rp. {{ countPrice(carts) }}</p>
          </div>
        </div>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['carts'],
  data() {
    return {
      email: '',
      fname: '',
      lname: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      total: 0,
    };
  },
  methods: {
    countPrice(data) {
      let count = 0;
      data.forEach((e) => {
        count += e.price;
      });
      this.total = count;
      return count;
    },
    checkout() {
      const newTransaction = {
        email: this.email,
        fname: this.fname,
        lname: this.lname,
        address: this.address,
        city: this.city,
        state: this.state,
        zipcode: this.zipcode,
      };
      this.$validator
        .validateAll()
        .then(() => {
          this.axios({
            method: 'post',
            url: '/checkout',
            data: {
              contactInformation: newTransaction,
              total: this.total,
            },
            headers: { token: localStorage.getItem('token') },
          })
            .then(({ data }) => {
              console.log(data);
              this.$emit('clear-cart');
              this.$emit('fetch-trans');
            })
            .catch((err) => {
              console.log(err);
            });
        });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Nunito");

input[type="text"],
input[type="email"] {
  font-family: "Nunito", sans-serif;
  border-radius: 0px !important;
}
.row {
  margin-right: 0px !important;
}

.form-name {
  font-family: "Nunito", sans-serif;
  letter-spacing: 1px;
  margin-top: 2rem;
}

.form-text {
  font-family: "Nunito", sans-serif;
  margin: 15px 0;
}

.form-btn {
  font-family: "Nunito", sans-serif;
}

.btn-md {
  border-radius: 0px !important;
}
</style>
