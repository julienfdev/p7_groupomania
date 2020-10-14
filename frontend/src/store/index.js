import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuItems: [{
        name: 'Home',
        text: 'Accueil',
        root: '/',
        active: false,
        showLog: true
      },
      {
        name: 'Fresh',
        text: 'Fresh',
        root: '/fresh',
        active: false,
        showLog: true
      },
      {
        name: 'Profile',
        text: 'Profil',
        root: '/placeholder',
        active: false,
        showLog: true
      },
      {
        name: 'Login',
        text: 'S\'identifier',
        root: '/login',
        active: false,
        showLog: false
      },
      {
        name: 'Signup',
        text: 'S\'enregistrer',
        root: '/signup',
        active: false,
        showLog: false
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
    },
    USER_SET_TOKEN(state, token){
      state.currentUser.token = token;
    },
    USER_SET_ADMIN(state, admin){
      state.currentUser.isAdmin = admin;
    },
    USER_SET_VALID(state, valid){
      state.currentUser.logValid = valid;
    }
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

        if ((Date.now() / 1000) > payload.expires) {
          context.commit('USER_SET_VALID', false);
        } else {
          context.commit('USER_SET_VALID', true);
        }
      } else {
        context.commit('USER_SET_VALID', false);
      }
    }
  },
  modules: {}
})