import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index';
import userLocalStorageFetch from '../js/userLocalStorageFetch'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( /* webpackChunkName: "login" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  // Checks if user is valid, else directs to login page (user can still go to signup)
  if (!(to.path === '/login' || to.path === '/signup')) {
    const userLocalStorage = userLocalStorageFetch();
    await store.dispatch('setUser', userLocalStorage);
    if(store.state.currentUser.logValid){
      next();
    }
    else{
      next(false);
      //next() // (debug)
    }
  }
  else{
    next();
  }
});

router.afterEach((to) => {
  store.dispatch('updateActive', to);
})

export default router