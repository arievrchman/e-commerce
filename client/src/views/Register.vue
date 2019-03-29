<template>
  <div class="container">
    <div class="row">
      <div class="col col-md-12">
        <div class="row justify-content-center mt-2">
          <div class="col-md-5">
            <div class="mb-4">
              <div class="card-body d-flex flex-column">
                <h1 class="text-center title-header">Register</h1>
                <div class="mt-2 align-self-center success-message text-center" v-if="successText">
                  <span class="success-text">{{ successText }}</span>
                </div>
                <div class="mt-2 align-self-center error-message text-center" v-if="errText">
                  <span class="error-text">{{ errText }}</span>
                </div>
                <form class="p-3" @submit.prevent="register">
                  <div class="form-group">
                    <label for="text" style="font-family: serif">Name</label>
                    <input
                      v-model="name"
                      type="text"
                      class="form-control"
                      placeholder="Name"
                    >
                  </div>
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
                  <div class="footer p-3 text-center">
                    <small>
                      Have an account?
                      <router-link to="/account/login">
                        Click here to login.
                      </router-link>
                    </small>
                  </div>
                  <div class="text-center">
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </div>
                </form>

              </div>
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
      name: '',
      email: '',
      password: '',
      errText: '',
      successText: '',
    };
  },
  methods: {
    register() {
      axios({
        method: 'post',
        url: '/register',
        data: {
          name: this.name,
          email: this.email,
          password: this.password,
        },
      })
        .then(({ data }) => {
          this.successText = data.message;
          this.name = '';
          this.email = '';
          this.password = '';
        })
        .catch((err) => {
          const error = err.response.data;
          if (error.hasOwnProperty('email')) {
            this.errText = error.email;
          } else if (error.hasOwnProperty('password')) {
            this.errText = error.password;
          } else {
            this.errText = error.message;
          }
        });
    },
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
  font-weight: 700;
}

.error-message {
  background-color: #fce4e4;
  border: 1px solid #fcc2c3;
  padding: 10px;
  width: 80%;
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
  width: 80%;
}

</style>
