<template>
  <section :aria-expanded="isExpanded" class="q-accordion-body">
    <slot />
  </section>
  <button
    :class="{ expanded: isExpanded, collapsed: !isExpanded }"
    @click="togglePanel"
    class="q-accordion-button"
  >
    {{ title }}
  </button>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const isExpanded = ref(false);
    return { isExpanded };
  },
  props: {
    key: {
      type: String,
      required: false,
      default: 0,
    },
    title: {
      type: String,
      required: true,
    },
  },

  methods: {
    togglePanel(ev) {
      this.isExpanded = !this.isExpanded;
      const panel = ev.target.previousElementSibling;

      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    },
  },
};
</script>

<style scoped>
.q-accordion-button {
  width: 100%;
  background-color: var(--background-color-secondary);
  padding: var(--gap-lg);
  font-size: var(--text-size-xl);
  color: var(--text-color-primary);
  text-align: left;
  border: none;
  cursor: pointer;
}

.expanded:after {
  content: "+";
  transition: transform var(--duration-quickest);
  transform: rotate(45deg);
  float: right;
}

.collapsed:after {
  content: "+";
  transition: transform var(--duration-quickest);
  float: right;
}

.q-accordion-button:nth-child(1) {
  border-top-left-radius: var(--gap-xs);
  border-top-right-radius: var(--gap-xs);
}

.q-accordion-button:last-child {
  border-bottom-left-radius: var(--gap-xs);
  border-bottom-right-radius: var(--gap-xs);
}

.q-accordion-body {
  background-color: var(--background-color-tartiary);
  max-height: 0;
  overflow: hidden;
  transition: max-height var(--duration-quickest) ease-in-out;
  padding: 0 var(--gap-lg);
}
</style>