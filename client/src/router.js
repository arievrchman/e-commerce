import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('./views/Cart.vue'),
    },
    {
      path: '/account/login',
      name: 'Login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/account/register',
      name: 'Register',
      component: () => import('./views/Register.vue'),
    },
    {
      path: '/details/:id',
      name: 'Details',
      component: () => import('./views/Details.vue'),
    },
    {
      path: '/products',
      name: 'Products',
      component: () => import('./views/Products.vue'),
    },
    {
      path: '/checkout/:id',
      name: 'Checkout',
      component: () => import('./views/Checkout.vue'),
    },
    {
      path: '/admin',
      component: () => import('./views/Admin/Index.vue'),
      children: [
        {
          path: '',
          name: 'ProductsAdmin',
          component: () => import('./views/Admin/Products.vue'),
        },
        {
          path: 'add',
          name: 'Add',
          component: () => import('./views/Admin/Add.vue'),
        },
        {
          path: 'edit/:id',
          name: 'Edit',
          component: () => import('./views/Admin/Edit.vue'),
        },
        {
          path: 'history',
          name: 'History',
          component: () => import('./views/Admin/History.vue'),
        },
      ],
    },
  ],
});
