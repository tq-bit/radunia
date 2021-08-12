<template>
  <section class="q-accordion-body">
    <slot />
  </section>
  <button @click.native="togglePanel" class="q-accordion-button">
    {{ title }}
  </button>
</template>

<script>
export default {
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