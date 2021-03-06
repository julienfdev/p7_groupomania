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
        showLog: true,
        hideNonAdmin: false
      },
      {
        name: 'Fresh',
        text: 'Fresh',
        root: '/fresh',
        showLog: true,
        hideNonAdmin: false
      },
      {
        name: 'Profile',
        text: 'Profil',
        root: '/placeholder', // To be updated when user logged in
        showLog: true,
        hideNonAdmin: false
      },
      {
        name: 'Administration',
        text: 'Admin',
        root: '/admin',
        showLog: true,
        hideNonAdmin: true
      },
      {
        name: 'Login',
        text: 'S\'identifier',
        root: '/login',
        showLog: false,
        hideNonAdmin: false
      },
      {
        name: 'Signup',
        text: 'S\'enregistrer',
        root: '/signup',
        showLog: false,
        hideNonAdmin: false
      }
    ],
    currentUser: {
      slug: null,
      token: null,
      isAdmin: false,
      logValid: false
    },
    categories: {},
    displayedPosts: {},
    currentPost: {
      post: {
        title: "",
      },
      commentList: []
    },
    userProfile: {
      slug: "",
      email: "",
      nickname: "",
      createdAt: "",
      showExtended: false
    }
  },
  mutations: {
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
    USER_SET_TOKEN(state, token) {
      state.currentUser.token = token;
    },
    USER_SET_ADMIN(state, admin) {
      state.currentUser.isAdmin = admin;
    },
    USER_SET_VALID(state, valid) {
      state.currentUser.logValid = valid;
    },
    CATEGORIES_POPULATE(state, payload) {
      state.categories = payload;
    },
    SET_POST(state, payload) {
      state.currentPost = payload;
    },
    SET_PROFILE(state, payload){
      state.userProfile = payload;
    }
  },
  actions: {
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
    },
    setPost(context, payload) {
      context.commit('SET_POST', payload);
    },
    setProfile(context, payload) {
      context.commit('SET_PROFILE', payload);
    }
  },
  getters: {
    authorizationHeader(state) {
      return `Bearer ${state.currentUser.token}`;
    }
  },
  modules: {}
})