import Vue from 'vue'
import VueRouter from 'vue-router'
import Hot from '../views/Hot.vue'
import store from '../store/index';
import userLocalStorageFetch from '../js/userLocalStorageFetch'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Hot',
    component: Hot,
    alias: '/hot'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( /* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import( /* webpackChunkName: "signup" */ '../views/Signup.vue')
  },
  {
    path: '/fresh',
    name: 'Fresh',
    component: () => import( /* webpackChunkName: "fresh" */ '../views/Fresh.vue')
  },
  {
    path: '/post/:slug',
    name: 'Post',
    component: () => import( /* webpackChunkName:  "post" */ '../views/DetailPost.vue')
  },
  {
    path: '/admin',
    name: "Admin",
    component: () => import( /* webpackChunkName:  "profile" */ '../views/Admin.vue')
  },
  {
    path: '/:slug',
    name: 'Category',
    component: () => import( /* webpackChunkName:  "catgegory" */ '../views/CategoryPage.vue')
  },
  {
    path: '/user/:slug',
    name: 'Profile',
    component: () => import( /* webpackChunkName:  "profile" */ '../views/Profile.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import( /* webpackChunkName:  "profile" */ '../views/404.vue')
  },

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach(async (to, from, next) => {
  // Checks if user is valid, else directs to login page (user can still go to signup)
  if (!(to.path === '/login' || to.path === '/signup')) {
    const userLocalStorage = userLocalStorageFetch();
    await store.dispatch('setUser', userLocalStorage); // the setUser contains the check to verify the user is valid.
    if (store.state.currentUser.logValid) {
      next();
    } else {
      router.push('/login');
      //next() // (debug)
    }
  } else {
    next();
  }
});

router.afterEach(() => {

})

export default router