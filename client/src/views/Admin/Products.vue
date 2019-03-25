<template>
  <div class="row">
    <div class="col">
      <div
        class="my-3 success-message text-center"
        v-if="successText"
      >
        <span class="success-text">{{ successText }}</span>
      </div>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in allProducts" :key="index" >
            <td>{{ product.product_name }}</td>
            <td>{{ product.price }}</td>
            <td>
              <router-link :to="'/admin/edit/' + product._id">
                <i class="fas fa-pen-square"></i>
              </router-link>
            </td>
            <td>
              <a @click="deleteProduct(product._id)">
                <i class="fa fa-trash"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: ['allProducts'],
  data() {
    return {
      successText: '',
    }
  },
  methods: {
    deleteProduct(id) {
      this.axios({
        method: 'delete',
        url: '/products/' + id
      })
      .then(({data}) => {
        this.$emit('remove-product', id);
        this.successText = data.message;
      })
      .catch(err => {
        console.log(err);
      });
    },
  },
};
</script>

<style scoped>
a {
 cursor: pointer;
}

a .fa-trash, a .fa-pen-square {
  color: grey;
}

th, td {
  font-size: 14px;
}

.success-text {
  /* margin-bottom: 0px !important; */
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
