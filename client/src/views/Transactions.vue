<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h3 class="text-center my-4">Uncofirmed Transactions</h3>
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th>Transaction Id</th>
              <th>Total</th>
              <th>Shipped To</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(transaction, index) in uncompleted" :key="index">
            <td>{{ transaction.id }}</td>
            <td>{{ transaction.total }}</td>
            <td>{{ transaction.contactInformation.city }}</td>
            <td>
              <button @click.prevent="confirmStatus(transaction.id)" class="btn btn-sm btn-outline-dark">Confirm</button>
            </td>
            </tr>
          </tbody>
        </table>
        <hr>
        <h3 class="text-center">Confirmed Transactions</h3>
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th>Transaction Id</th>
              <th>Total</th>
              <th>Shipped To</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(transaction, index) in completed" :key="index">
              <td>{{ transaction.id }}</td>
              <td>{{ transaction.total }}</td>
              <td>{{ transaction.contactInformation.city }}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['transactionsHt'],
  data() {
    return {
      comp: [],
      uncomp: []
    }
  },
  created() {
    this.$emit('fetch-trans');
  },
  methods: {
    confirmStatus(id) {
      this.axios({
        method: 'patch',
        url: '/checkout/' + id,
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          this.$emit('fetch-trans');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  computed: {
    completed() {
      return this.comp;
    },
    uncompleted() {
      return this.uncomp;
    }
  },
  watch: {
    transactionsHt(val) {
      this.comp = val.filter(e => {
        return e.shipped == true;
      });

      this.uncomp = val.filter(e => {
        return e.shipped == false;
      });
      
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Nunito");

h3 {
  font-family: "Nunito", sans-serif;
}
</style>
