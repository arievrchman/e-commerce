<template>
  <div class="row">
    <div class="col">
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th>Customer Name</th>
            <th>Transaction Id</th>
            <th>Total</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(transaction, index) in transactions" :key="index">
            <td>{{ transaction.user.name }}</td>
            <td>{{ transaction.id }}</td>
            <td>{{ transaction.total }}</td>
            <td>{{ checkStatus(transaction.shipped) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: ['transactions'],
  methods: {
    checkStatus(status) {
      if (!status) {
        return 'Uncomplete';
      }
      return 'Complete';
    },
  },
};
</script>

<style>
th, td {
  font-size: 14px;
}
</style>
