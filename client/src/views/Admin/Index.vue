<template>
  <div>
    <div class="group">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="text-center admin-title-header my-3">Admin Dashboard</h2>
          </div>
          <div class="col-lg-3 col-md-3">
            <ul class="group-menu">
              <li>
                <router-link to="/admin">View Products</router-link>
              </li>
              <li>
                <router-link to="/admin/add">Add Product</router-link>
              </li>
              <li>
                <router-link to="/admin/history">Transaction History</router-link>
              </li>
            </ul>
          </div>
          <div class="col-lg-9 col-md-9">
            <router-view
              :all-products="getProducts"
              @add-product="addProduct"
              @remove-product="removeProduct"
              @edit-product="editProduct"
              :transactions="transactionsHt"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/api/axios';

export default {
  name: 'admin',
  props: ['getProducts', 'transactionsHt'],
  data() {
    return {
      products: [],
    }
  },
  methods: {
    addProduct(payload) {
      this.$emit('add-product', payload);
    },
    removeProduct(payload) {
      this.$emit('remove-product', payload);
    },
    editProduct(payload) {
      this.$emit('edit-product', payload);
    }
  },
};
</script>

<style>
.admin-title-header {
  font-family: serif;
}

ul {
  list-style: none;
}
.group-menu a {
  margin-bottom: 1px;
  display: block;
  background: #fff;
  border: 1px solid black;
  border-radius: 2px;
  color: #3d3d3d;
  padding: 10px 15px;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 12px;
}
.group-menu a:hover {
  text-decoration: none;
  transform: scaleX(1.02);
}
.group,
.admin-products {
  padding: 20px 0;
}
</style>
