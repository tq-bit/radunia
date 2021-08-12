<template>
  <div class="q-accordion-wrapper">
    <header @click="togglePanels" class="q-accordion-header">
      {{ header }}
    </header>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    header: {
      type: String,
      required: true,
    },
  },
  methods: {
    togglePanels(ev) {
      const panelNodes =
        ev.target.parentElement.querySelectorAll(".q-accordion-body");

      panelNodes.forEach((panel) => {
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    },
  },
};
</script>

<style>
.q-accordion-wrapper {
  color: var(--text-color-primary);
  width: 100%;
}

.q-accordion-header {
  width: 100%;
  background-color: var(--background-color-secondary);
  padding: var(--gap-lg);
  font-size: var(--text-size-xxl);
  color: var(--text-color-primary);
  text-align: left;
  border: none;
  cursor: pointer;
}
</style>