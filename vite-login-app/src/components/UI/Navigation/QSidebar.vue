<template>
  <nav class="q-sidebar">
    <header class="q-sidebar-header">
      <span class="q-sidebar-close" @click="$emit('toggle-sidebar')">✖</span>
      <h1 class="q-sidebar-title">{{ title || "This is a title" }}</h1>
    </header>
    <main class="q-sidebar-body">
      <ul class="q-item-list">
        <li class="q-navigation-item" v-for="element in sidebarTop" :key="element">
          <router-link
            @click="handleElementAction(element.action)"
            class="q-router-link"
            :to="element.path"
          >
            {{ element.name }}
          </router-link>
        </li>
      </ul>
      <ul class="q-item-list">
        <li
          class="q-navigation-item"
          v-for="element in sidebarBottom"
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
    </main>

    <footer class="q-sidebar-footer">
      <q-theme-button :initWithPreference="false"></q-theme-button>
    </footer>
  </nav>
</template>

<script>
import QThemeButton from "../Theme/QThemeButton.vue";

export default {
  components: {
    QThemeButton,
  },
  props: {
    title: {
      type: String,
      required: false,
      default: "🌇 Radunia",
    },
    userIsLoggedin: {
      type: Boolean,
      required: true,
    },
    sidebarTop: {
      type: Array,
      required: false,
    },
    sidebarBottom: {
      type: Array,
      required: false,
    },
  },
  methods: {
    handleElementAction(fn) {
      this.$emit("toggle-sidebar");
      if (fn) {
        fn();
      }
    },
  },
};
</script>

<style scoped>
.q-sidebar {
  top: 0;
  left: 0;
  position: fixed;
  height: 100vh;
  width: 100%;
  z-index: 10;
}

.q-sidebar-header {
  height: 20vh;
  background-color: var(--black-color);
  color: #fff;
  padding: var(--gap-sm) var(--gap-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.q-sidebar-close {
  position: absolute;
  top: var(--gap-xl);
  right: var(--gap-xl);
  font-size: var(--text-size-xl);
}

.q-sidebar-title {
  text-align: center;
  color: #fff;
  font-size: var(--text-size-xl);
}

.q-sidebar-body {
  height: 70vh;
  background-color: var(--background-color-primary);
}

.q-item-list {
  padding-top: var(--gap-md);
}

.q-navigation-item {
  text-align: center;
}

.q-router-link {
  cursor: pointer;
  color: var(--text-color-primary);
  padding: var(--gap-sm) var(--gap-md);
  font-weight: 600;
  font-size: var(--text-size-md);
  border-radius: var(--gap-xxl);
}

a.router-link-exact-active {
  background-color: var(--accent-color-blur-primary);
}

.q-sidebar-footer {
  height: 10vh;
  background-color: var(--background-color-primary);
  padding: var(--gap-md);
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 992px) {
  .q-sidebar {
    width: 30%;
  }
}
</style>