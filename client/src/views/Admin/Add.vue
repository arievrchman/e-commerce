<template>
  <FormProduct @add-product="addProduct"/>
</template>

<script>
import FormProduct from '@/components/FormProduct.vue';

export default {
  components: {
    FormProduct,
  },
  methods: {
    addProduct(payload) {
      this.$emit('add-product', payload);
    },
  },
};
</script>
