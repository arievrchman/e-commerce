<template>
  <div>
    <div class="my-3 success-message text-center" v-if="successText">
      <span class="success-text">{{ successText }}</span>
    </div>
    <div class="my-3 error-message text-center" v-if="errText">
      <span class="error-text">{{ errText }}</span>
    </div>

    <form>
      <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <div class="form-group">
            <label>Name</label>
            <input
              v-model="product.product_name"
              type="text"
              placeholder="Name"
              name="name"
              class="form-control">
          </div>
          <div class="form-group">
            <label>Price</label>
            <input
              v-model="product.price"
              type="number"
              class="form-control"
              placeholder="Price"
              name="price">
          </div>
          <div class="form-group">
            <label>Catalog</label>
            <select class="custom-select" v-model="product.catalog">
              <option>Men</option>
              <option>Women</option>              
            </select>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <div class="form-group">
            <label>Product Image</label>
            <div class="custom-file">
              <input
                type="file"
                class="custom-file-input"
                id="customFile"
                v-on:change="imageUpload"
                ref="image"
              >
              <label class="custom-file-label" for="customFile">Choose file</label>
            </div>
          </div>
          <div class="form-group">
            <label>Stock</label>
            <input
              v-model="product.stock"
              type="number"
              name="image"
              class="form-control">
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea
              v-model="product.description"
              class="form-control"
              name="description"
              rows="5"></textarea>
          </div>
          <div class="form-group d-flex">
            <div class="btn btn-md btn-primary ml-auto">
              <span v-if="isEdit" @click.prevent="editProduct">Update Product</span>
              <span v-else @click.prevent="addProduct">Add Product</span>
            </div>
          </div>
        </div>
      </div>
    </form>

  </div>
</template>

<script>

$(document).ready(function(){
  $('#customFile').on('change',function(){
      var fileName = $(this).val().replace('C:\\fakepath\\', " ");
      $(this).next('.custom-file-label').html(fileName);
  });
});

export default {
  props: ['isEdit', 'currentProduct'],
  data() {
    return {
      product: {
        product_name: '',
        catalog: '',
        description: '',
        price: 0,
        stock: 0,
        image: '',
      },
      successText: '',
      errText: '',
    }
  },
  methods: {
    editProduct() {

      let id = this.$route.params.id
      let data = new FormData();
      data.append('product_name', this.product.product_name);
      data.append('catalog', this.product.catalog);
      data.append('description', this.product.description);
      data.append('price', this.product.price);
      data.append('stock', this.product.stock);
      data.append('image', this.product.image);

      this.axios({
        method: 'put',
        url: '/products/' + id,
        data
      })
        .then(({ data }) => {
          this.$emit('edit-product', data.product);
          this.successText = data.message;
          this.product.product_name = '';
          this.product.catalog = '';
          this.product.description = '';
          this.product.price = '';
          this.product.stock = '';
          this.product.image = '';
        })
        .catch((err) => {
          let error = err.response.data;
          let customErr = [];
          for (let key in error) {
            if (Object.values(error).length > 1) {
              customErr.push(error[key].message);
            } else {
              customErr += error[key].message;
            }
          }
          if (typeof customErr == 'string') {
            this.errText = customErr;
          } else {
            this.errText = customErr.join(', ');
          }
        });
      
    },
    imageUpload() {      
      this.product.image = this.$refs.image.files[0];
    },

    addProduct() {
      
      let data = new FormData();
      data.append('product_name', this.product.product_name);
      data.append('catalog', this.product.catalog);
      data.append('description', this.product.description);
      data.append('price', this.product.price);
      data.append('stock', this.product.stock);
      data.append('image', this.product.image);

      this.axios({
        method: 'post',
        url: '/products',
        data
      })
        .then(({ data }) => {
          this.$emit('add-product', data.product);
          this.successText = data.message;
          this.product.product_name = '';
          this.product.catalog = '';
          this.product.description = '';
          this.product.price = '';
          this.product.stock = '';
          this.product.image = '';
        })
        .catch((err) => {
          let error = err.response.data;
          let customErr = [];
          if (error.hasOwnProperty('message')) {
            customErr = error.message;
          } else {
            for (let key in error) {
              if (Object.values(error).length > 1) {
                customErr.push(error[key]);
              } else {
                customErr += error[key];
              }
            }
          }
          if (typeof customErr == 'string') {
            this.errText = customErr;
          } else {
            this.errText = customErr.join(', ');
          }
        });
    }
  },
  watch: {
    currentProduct(val) {
      if (this.isEdit) {
        this.product = val;
      }
    }
  },
}
</script>

<style>
.btn {
  cursor: pointer;
}
.error-text {
  font-size: 13px;
  color: red;
  font-weight: 700;
}

.error-message {
  background-color: #fce4e4;
  border: 1px solid #fcc2c3;
  padding: 10px;
}

.success-text {
  font-size: 13px;
  color: #4F8A10;
  font-weight: 700;
}

.success-message {
  background-color: #DFF2BF;
  border: 1px solid #DFF2BF;
  padding: 10px;
}
</style>

