<template>
  <nav
    :class="'navbar navbar-expand-lg ' + (($route.path !== '/') ? 'navbar-dark border-bottom' : 'navbar-light fixed-top')"
  >
    <router-link to="/">
      <a class="navbar-brand">
        <img v-if="$route.path == '/'" src="../assets/logo.png" alt="Secrets" width="120px">
        <img v-else src="../assets/logo-dark.png" alt="Secrets" width="120px">
      </a>
    </router-link>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#ding-dong"
      aria-controls="ding-dong"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="ding-dong">
      <div class="left-side">
        <ul class="navbar-nav p-3">
          <li class="nav-item">
            <router-link to="/">
              <a href class="nav-link">
                <span class="txt">Home</span>
              </a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/products">
              <a href class="nav-link">
                <span class="txt">Products</span>
              </a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/">
              <a href class="nav-link">
                <span class="txt">Collections</span>
              </a>
            </router-link>
          </li>
        </ul>
      </div>

      <div class="right-side ml-auto">
        <ul class="navbar-nav p-3">
          <li v-show="status.isLogin" class="nav-item dropdown">
            <a
              href="#"
              class="nav-link"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fas fa-user"></i>
              <span class="ml-2">My Account</span>
            </a>
            <div class="dropdown-menu">
              <div v-if="status.isAdmin">
                <router-link to="/admin">
                  <a class="dropdown-item"><small>Dashboard</small></a>
                </router-link>
              </div>
              <a class="dropdown-item" @click.prevent="logout"><small>Logout</small></a>
            </div>
          </li>
          <li v-show="!status.isLogin" class="nav-item">
            <router-link to="/account/login">
              <span href class="nav-link">
                <i class="fas fa-user"></i>
                <span class="ml-2">Sign in</span>
              </span>
            </router-link>
          </li>
          
          <li class="nav-item">
            <router-link to="/cart">
              <a href class="nav-link">
                <i class="fas fa-shopping-cart"></i>
                <span class="ml-2">Cart ({{ myCart.length }})</span>
              </a>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  props: ['status', 'myCart'],
  data() {
    return {
      loggedIn: null
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$emit('logged-out');
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Nunito");

.left-side li,
.right-side li {
  font-size: 13px;
  font-weight: bolder;
  font-family: "Nunito", sans-serif;
}

.nav-item {
  margin: 0 10px;
}

.nav-item a {
  text-decoration: none;
}

.navbar-light .txt,
.navbar-light .nav-item i,
.navbar-light span {
  color: #fff;
  font-size: 12px;
}

.navbar-dark .txt,
.navbar-dark .nav-item i,
.navbar-dark span {
  color: grey;
  font-size: 12px;
}
.navbar-light .navbar-nav .dropdown-menu {
  background: content-box;
  width: 200px;
  border: 1px solid #fff;
}

.navbar-dark .navbar-nav .dropdown-menu {
  background: content-box;
  width: 200px;
  border: 1px solid #000;
}

.navbar-light .dropdown-menu a {
  color: white;
}

.navbar-dark .dropdown-menu a {
  color: #000;
}

.navbar-light .dropdown-menu a:hover {
  color: black;
}

</style>
