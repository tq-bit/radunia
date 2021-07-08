<template>
  <div id="app">
    <q-navbar
      :navbarLeft="navbarLeft"
      :navbarRight="navbarRightActive"
      @toggleSidebar="showSidebar = !showSidebar"
      @logout="logout"
    />
    <transition appear name="sidebar-slide">
      <q-sidebar
        v-if="showSidebar"
        :sidebarTop="navbarLeft"
        :sidebarBottom="navbarRightActive"
        @toggleSidebar="showSidebar = !showSidebar"
      ></q-sidebar>
    </transition>
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade-move" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <q-alert
      :show="appAlert.show"
      :title="appAlert.title"
      :message="appAlert.message"
      :type="appAlert.type"
    />
  </div>
</template>

<script>
import QNavbar from "./components/UI/QNavbar.vue";
import QSidebar from "./components/UI/QSidebar.vue";
import QAlert from "./components/UI/Cards/QAlert.vue";

import { mapGetters, mapActions } from "vuex";

export default {
  async mounted() {
    const { status, title, message } = await this.refreshSession();
    if (status === "login-extend-success") {
      this.alert({ title, message });
    }
  },
  data() {
    return {
      showSidebar: false,
      navbarLeft: [
        {
          path: "/",
          name: "Home",
        },
      ],
      navbarRight: [
        {
          path: "/login",
          name: "Log in",
          loginRequired: false,
        },
        {
          path: "/register",
          name: "Register",
          loginRequired: false,
        },
        {
          path: "/profile",
          name: "Profile",
          loginRequired: true,
        },
        {
          name: "Logout",
          loginRequired: true,
          action: () => {
            this.$router.push({ path: "/" });
            this.logout();
            this.alert({ message: "You have successfully logged out" });
          },
        },
      ],
    };
  },
  components: {
    QNavbar,
    QSidebar,
    QAlert,
  },
  computed: {
    ...mapGetters(["appAlert", "activeToken"]),
    navbarRightActive() {
      const userIsLoggedin = this.activeToken ? true : false;
      return this.navbarRight.filter((el) => {
        return el.loginRequired === userIsLoggedin;
      });
    },
  },
  methods: {
    ...mapActions(["refreshSession", "getUserData", "alert", "logout"]),
  },
};
</script>

<style>
@import "./assets/styles/util.css";
@import "./assets/styles/animations.css";

:root.dark-theme {
  --background-color-primary: #1e1e1e;
  --background-color-secondary: #2d2d30;
  --primary-color: rgb(227, 157, 58);
  --secondary-color: rgb(46, 84, 204);
  --accent-color: #1e1e1e;
  --primary-blur: rgba(227, 157, 58, 0.7);
  --secondary-blur: rgba(46, 84, 204, 0.7);
  --accent-blur: rgb(41, 32, 26, 0.8);
  --bright-color: #252526;
  --success-color: #00a300;
  --error-color: #b91d47;
  --grey-color: #3f3f3f;
  --text-primary-color: #ddd;
  --text-secondary-color: #eee;
}

:root {
  --background-color-primary: #fafafa;
  --primary-color: rgb(227, 157, 58);
  --secondary-color: rgb(46, 84, 204);
  --accent-color: #29201a;
  --primary-blur: rgba(227, 157, 58, 0.7);
  --secondary-blur: rgba(46, 84, 204, 0.7);
  --accent-blur: rgb(41, 32, 26, 0.8);
  --bright-color: #fefefe;
  --success-color: #00a300;
  --error-color: #b91d47;
  --grey-color: #cacaca;
  --text-primary-color: #222;
  --text-secondary-color: #333;
  --duration-quickest: 0.25s;
  --duration-quick: 0.5s;
  --duration-semi: 0.75s;
  --duration-slow: 1s;
  --el-size-xxs: 2.5rem;
  --el-size-xs: 4rem;
  --el-size-sm: 7.5rem;
  --el-size-md: 10rem;
  --el-size-l: 15rem;
  --el-size-xl: 20rem;
  --gap-tiny: 0.1rem;
  --gap-xxs: 0.125rem;
  --gap-xs: 0.25rem;
  --gap-sm: 0.5rem;
  --gap-md: 0.75rem;
  --gap-lg: 1rem;
  --gap-xl: 1.25rem;
  --gap-xxl: 1.5rem;
  --gap-max: 1.75rem;
  --text-size-md: 0.9rem;
  --text-size-lg: 1.05rem;
  --text-size-xl: 1.15rem;
  --text-size-xxl: 1.35rem;
}

* {
  font-family: "Roboto", sans-serif;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  transition: 0.1s;
}

html {
  min-height: 100vh;
  background-color: var(--background-color-primary);
}

ul {
  margin: 0;
  list-style: none;
}

li {
  color: var(--text-primary-color);
  padding: var(--gap-xs) var(--gap-md);
}

h1,
h2,
h3,
h4,
h5,
h6 {
  color: var(--text-primary-color);
  margin: var(--gap-xl) 0;
}

p {
  color: var(--text-secondary-color);
  margin: var(--gap-md) 0;
  font-size: var(--text-size-lg);
  line-height: var(--gap-max);
}

a {
  color: var(--primary-color);
  font-weight: 600;
  text-decoration: none;
  position: relative;
}

hr {
  border: 0.1px solid var(--grey-color);
  border-style: dotted;
  margin: var(--gap-lg) auto;
  width: 90%;
}

textarea {
  resize: none;
}

a:before {
  transition: var(--duration-quick);
  position: absolute;
  top: var(--text-size-xl);
  left: 50%;
  content: "";
  width: 0;
  height: var(--gap-xxs);
  background-color: var(--primary-color);
}
</style>
