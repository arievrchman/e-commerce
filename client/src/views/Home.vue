<template>
  <div class="home">
    <Landing
      :products="getProducts"
      @add-to-cart="addToCart"
    />
    <router-view/>
  </div>
</template>

<script>
import Landing from '@/components/Landing.vue';

export default {
  name: 'home',
  props: ['getProducts'],
  components: {
  Landing,    
  },
  methods: {
    addToCart(payload) {
      this.$emit('add-to-cart', payload);
    }
  },
};
</script>

<style scoped>

</style>

