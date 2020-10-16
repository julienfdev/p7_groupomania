import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Menu items is there to manage the display of differents items depending on the login status and admin status
    menuItems: [{
        name: 'Hot',
        text: 'Hot',
        root: '/',
        active: false,
        showLog: true,
        hideNonAdmin: false
      },
      {
        name: 'Fresh',
        text: 'Fresh',
        root: '/fresh',
        active: false,
        showLog: true,
        hideNonAdmin: false
      },
      {
        name: 'Profile',
        text: 'Profil',
        root: '/placeholder',   // To be updated when user logged in
        active: false,
        showLog: true,
        hideNonAdmin: false
      },
      {
        name: 'Administration',
        text: 'Admin',
        root: '/admin',
        active: false,
        showLog: true,
        hideNonAdmin: true
      },
      {
        name: 'Login',
        text: 'S\'identifier',
        root: '/login',
        active: false,
        showLog: false,
        hideNonAdmin: false
      },
      {
        name: 'Signup',
        text: 'S\'enregistrer',
        root: '/signup',
        active: false,
        showLog: false,
        hideNonAdmin: false
      }
    ],
    currentUser: {
      slug: null,
      token: null,
      isAdmin: false,
      logValid: false
    }
  },
  mutations: {
    SET_ACTIVE(state, index) {
      state.menuItems[index].active = true;
    },
    DEACTIVATE(state, index) {
      state.menuItems[index].active = false;
    },
    LOADED(state) {
      state.firstLoaded = true;
    },
    USER_SET_SLUG(state, slug) {
      state.currentUser.slug = slug;
      const profileItem = state.menuItems.find((item) => {
        return item.name === 'Profile';
      })
     profileItem.root = `/user/${slug}`;
    },
    USER_SET_TOKEN(state, token){
      state.currentUser.token = token;
    },
    USER_SET_ADMIN(state, admin){
      state.currentUser.isAdmin = admin;
    },
    USER_SET_VALID(state, valid){
      state.currentUser.logValid = valid;
    },
  },
  actions: {
    // tests if an item into menuItems is the current route, if so, it's pinned "active" and navbar add active class to it, payload is the route this.$route
    updateActive(context, payload) {
      for (let i = 0; i < context.state.menuItems.length; i++) {
        if (context.state.menuItems[i].name === payload.name) {
          context.commit('SET_ACTIVE', i);
        } else {
          context.commit('DEACTIVATE', i);
        }
      }
      document.activeElement.blur();
    },
    setUser(context, payload) {
      if (payload) {
        context.commit('USER_SET_SLUG', payload.slug);
        context.commit('USER_SET_TOKEN', payload.token);
        context.commit('USER_SET_ADMIN', payload.isAdmin)

        // Compares the expiration date provided during login with the current date
        if (Math.floor((Date.now() / 1000)) > payload.expires) {
          context.commit('USER_SET_VALID', false);
        } else {
          context.commit('USER_SET_VALID', true);
        }
      } else {
        context.commit('USER_SET_VALID', false);
      }
    }
  },
  getters: {
    authorizationHeader(state) {
      return `Bearer ${state.currentUser.token}`;
    }
  },
  modules: {}
})