<template>
  <FormProduct
    :is-edit="true"
    :current-product="product"
    @edit-product="editProduct"
  />
</template>

<script>
import FormProduct from '@/components/FormProduct.vue';

export default {
  components: {
    FormProduct,
  },
  data() {
    return {
      currentProduct: {},
    };
  },
  mounted() {
    const { id } = this.$route.params;
    this.axios({
      method: 'get',
      url: `/products/${id}`,
    })
      .then(({ data }) => {
        this.currentProduct = data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    editProduct(payload) {
      this.$emit('edit-product', payload);
    },
  },
  computed: {
    product() {
      return this.currentProduct;
    },
  },
};
</script>

<style>
</style>
