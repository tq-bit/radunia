import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store/index';
import Cookies from 'js-cookie'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/profile/',
    name: 'My Profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
    beforeEnter: async (_, __, next) => {
      try {
        const userToken = Cookies.get('user-token') || store.getters.activeToken
        if (!userToken) {
          store.dispatch('alert', {
            title: '🍘 No cookies recognized',
            message: 'You have to login before you can access your profile'
          })
          return next({ path: '/login' });
        }

        const { status } = await store.dispatch('refreshSession')
        if (status !== 'login-extend-success') {
          store.dispatch('alert', {
            title: 'Session expired',
            message: 'Please login again to access your profile'
          })
          return next({ path: '/login' });
        }
        next()

      } catch (err) {
        console.error(err)
      }
    }
  }, {
    path: '/404',
    name: 'Not Found',
    component: () => import(/* webpackChunkName: "about" */ '../views/404.vue'),
    props: route => ({ redirect: route.query.redirect })

  },
]

// TODO: Add route guard for dashboard

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    next({ path: '/404', query: { redirect: from.fullPath } })
  } else {
    next();
  }
})

export default router
