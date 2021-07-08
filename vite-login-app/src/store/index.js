import Vuex from 'vuex'
import { authClient } from '../api/client';
import Cookies from 'js-cookie'

const store = new Vuex.Store({
  state: {
    token: null,
    user: {
      auth: {},
      data: {}
    },
    appAlert: {
      title: "",
      message: "",
      show: false
    }
  },
  mutations: {
    SET_TOKEN(state, { token }) {
      state.token = token;
    },

    UNSET_TOKEN(state) {
      state.token = null;
    },

    SET_USER_AUTH(state, { userAuth }) {
      state.user.auth = userAuth;
    },

    SET_USER_DATA(state, { userData }) {
      state.user.data = userData;
    },

    UNSET_USER_DATA(state) {
      state.user = {
        auth: {},
        data: {}
      }
    },

    SET_ALERT_DATA(state, { title, message }) {
      state.appAlert.title = title;
      state.appAlert.message = message;
      state.appAlert.show = true
    },

    UNSET_ALERT_DATA(state) {
      state.appAlert.title = ""
      state.appAlert.message = "";
      state.appAlert.show = false
    },

  },
  actions: {
    async login({ commit }, { username, password }) {
      try {
        const { headers: authHeaders } = await authClient.post('/auth/authenticate', {
          data: { userName: username, password }
        })

        const authToken = authHeaders['x-auth-token'];
        const headers = { 'x-auth-token': `Bearer ${authToken}` };
        const { data, headers: loginHeaders } = await authClient.post('/auth/login', {}, { headers });
        const { auth: userAuth } = data;

        const token = loginHeaders['x-api-token'];
        const {/* status, */ title, message } = data;
        Cookies.set('user-token', token, { expires: 7 })
        commit('SET_TOKEN', { token });
        commit('SET_USER_AUTH', { userAuth })
        return { title, message }
      } catch (err) {
        const { /* status, */ title, message } = err.response.data
        return { title, message };
      }
    },

    async refreshSession({ getters, commit }) {
      try {
        const apiToken = Cookies.get('user-token') || getters.activeToken;

        const headers = { authorization: `Bearer ${apiToken}` };
        const { data, headers: refreshHeaders } = await authClient.post('/auth/refresh', {}, { headers });

        const token = refreshHeaders['x-api-token'];
        const { status, title, message, auth: userAuth } = data;
        Cookies.set('user-token', token, { expires: 7 });

        commit('SET_TOKEN', { token });
        commit('SET_USER_AUTH', { userAuth })
        return { status, title, message };
      } catch (err) {
        const { /* status, */ title, message } = err.response.data
        return { status, title, message };
      }
    },

    async registerUser(_, { username, password, email }) {
      try {
        const { data } = await authClient.post('/auth/signup', {
          data: { userName: username, password, userMail: email }
        })
        const {/* status, */ title, message } = data;
        return { title, message };
      } catch (err) {
        const { /* status, */ title, message } = err.response.data
        return { title, message };
      }
    },

    async getUserData({ getters, commit }) {
      const apiToken = getters.activeToken || Cookies.get('user-token');
      const { userId } = getters.activeUserAuth;
      if (!apiToken) {
        return false
      }
      const headers = { authorization: `Bearer ${apiToken}` };
      const { data } = await authClient.get(`/user/${userId}/active`, { headers });
      commit('SET_USER_DATA', { userData: data });
    },

    async updateUserData({ getters, commit }, { userBio }) {
      try {
        const apiToken = getters.activeToken || Cookies.get('user-token');
        const { userId } = getters.activeUserAuth;
        const headers = { authorization: `Bearer ${apiToken}` };
        const { data } = await authClient.put(`/user/${userId}/active`, {
          data: { userBio }
        }, { headers });
        const {/* status, */ title, message, user } = data;
        commit('SET_USER_DATA', { userData: user });
        return { title, message }
      } catch (err) {
        const { /* status, */ title, message } = err.response.data
        return { title, message }
      }
    },



    logout({ commit }) {
      Cookies.remove('user-token')
      commit('UNSET_TOKEN');
      commit('UNSET_USER_DATA');
    },

    alert({ commit }, { title, message }) {
      commit('SET_ALERT_DATA', { title, message });
      setTimeout(() => commit('UNSET_ALERT_DATA'), 3500);
    },
  },
  getters: {
    activeToken(state) {
      return state.token;
    },

    activeUserData(state) {
      if (state.user.data) {
        return state.user.data;
      } else {
        return {
          userName: "John Doe",
          userBio: "",
        }
      }
    },

    activeUserAuth(state) {
      return state.user.auth;
    },

    appAlert(state) {
      return state.appAlert
    }
  }
})

export default store;