<template>
  <nav class="q-navbar">
    <!-- Navbar left, burger toggle and basic navigation -->
    <ul class="q-navbar-navigation left">
      <li
        class="q-navbar-navigation-item"
        v-for="element in navbarLeft"
        :key="element"
      >
        <router-link class="q-router-link" :to="element.path">
          {{ element.name }}
        </router-link>
      </li>
    </ul>

    <ul class="q-navbar-navigation right">
      <q-theme-button class="q-navbar-logo"></q-theme-button>
      <li
        class="q-navbar-navigation-item"
        v-for="element in navbarRight"
        :key="element"
      >
        <router-link
          v-if="element.path"
          class="q-router-link"
          :to="element.path"
        >
          {{ element.name }}
        </router-link>
        <span
          v-if="element.action"
          class="q-router-link"
          @click="element.action ? element.action() : null"
        >
          {{ element.name }}
        </span>
      </li>
    </ul>
    <burger-button
      class="q-sidebar-toggle"
      :active="showSidebar"
      @click="$emit('toggle-sidebar')"
    />
  </nav>
</template>

<script>
import BurgerButton from "../../Form/BurgerButton.vue";
import QThemeButton from "../Theme/QThemeButton.vue";

export default {
  components: {
    BurgerButton,
    QThemeButton,
  },
  props: {
    showSidebar: {
      type: Boolean,
      required: false,
    },
    navbarLeft: {
      type: Array,
      required: false,
    },
    navbarRight: {
      type: Array,
      required: false,
    },
  },
};
</script>

<style scoped>
.q-navbar {
  display: flex;
  justify-content: space-between;
  color: var(--accent-color-primary);
  background-color: var(--black-color);
  padding: var(--gap-xl);
}

ul.q-navbar-navigation {
  align-items: center;
}

.q-navbar-logo {
  font-weight: 600;
  font-size: var(--text-size-md);
}

.q-navbar-logo,
.q-navbar-navigation-item {
  display: inline-block;
  padding: var(--gap-sm) var(--gap-md);
}

a.router-link-exact-active {
  transition: var(--duration-quick);
  position: relative;
}

a.router-link-exact-active:before {
  left: 0%;
  width: 100%;
}

.q-router-link {
  font-weight: 600;
  color: #fff;
  cursor: pointer;
}

.left {
  text-align: left;
  justify-content: flex-start;
}

.right {
  text-align: right;
  justify-content: flex-end;
}

@media (max-width: 992px) {
  ul.q-navbar-navigation {
    display: none;
  }

  .q-sidebar-toggle {
    display: block;
  }
}

@media (min-width: 992px) {
  ul.q-navbar-navigation {
    display: flex;
  }

  .q-sidebar-toggle {
    display: none;
  }
}
</style>