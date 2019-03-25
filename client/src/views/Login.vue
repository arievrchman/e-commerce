<template>
  <div class="container">
    <div class="row align-items-center" style="height: 80vh">
      <div class="col col-md-12">
        <div class="row justify-content-center mt-2">
          <div class="mb-4">
            <div class="card-body d-flex flex-column">
              <h1 class="text-center title-header">Login</h1>
              <div class="mt-2 align-self-center error-message text-center" v-if="errText">
                <span class="error-text">{{ errText }}</span>
              </div>
              <form class="p-3" @submit.prevent="login">
                <div class="form-group">
                  <label for="email" style="font-family: serif">Email address</label>
                  <input
                    v-model="email"
                    type="email"
                    class="form-control"
                    placeholder="Enter email"
                  >
                </div>
                <div class="form-group">
                  <label for="password" style="font-family: serif">Password</label>
                  <input
                    v-model="password"
                    type="password"
                    class="form-control"
                    id="password"
                    placeholder="Password"
                  >
                </div>
                <div class="footer p-3">
                  <small>
                    Dont't have an account?
                    <router-link to="/account/register">
                      Create an account.
                    </router-link>
                  </small>
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-primary">Login</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/api/axios';

export default {
  name: 'account',
  data() {
    return {
      email: '',
      password: '',
      errText: '',
    }
  },
  methods: {
    login() {
      axios({
        method: 'post',
        url: '/login',
        data: {
          email: this.email,
          password: this.password,
        }
      })
        .then(({data}) => {
          console.log(data.token);
          this.email = '';
          this.password = '';
          localStorage.setItem('token', data.token);
          this.$emit('success-login');
          this.$router.replace({ path: '/' });
          
        })
        .catch((err) => {
          this.errText = err.response.data.message
        });
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Sofia");

.title-header {
  font-family: "Sofia", cursive;
}

.error-text {
  /* margin-bottom: 0px !important; */
  font-size: 13px;
  color: red;
}

.error-message {
  background-color: #fce4e4;
  border: 1px solid #fcc2c3;
  padding: 10px 10px;
  width: 80%;
}

</style>
