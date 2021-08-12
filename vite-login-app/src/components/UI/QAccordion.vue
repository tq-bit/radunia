<template>
  <div class="q-accordion-wrapper">
    <button @click="togglePanel" class="q-accordion-header">
      Accorion header
    </button>
    <section class="q-accordion-body">
      <p>Accordion body</p>
    </section>
    <button @click="togglePanel" class="q-accordion-header">
      Accorion header
    </button>
    <section class="q-accordion-body">
      <p>Accordion body</p>
    </section>
    <button @click="togglePanel" class="q-accordion-header">
      Accorion header
    </button>
    <section class="q-accordion-body">
      <p>Accordion body</p>
    </section>
  </div>
</template>

<script>
export default {
  methods: {
    togglePanel(ev) {
      const panel = ev.target.nextElementSibling;
      console.log(panel);
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
.q-accordion-wrapper {
  color: var(--text-primary-color);
}

.q-accordion-wrapper:nth-last-child() {
  border-bottom-left-radius: var(--gap-xl);
  border-bottom-right-radius: var(--gap-xl);
}

.q-accordion-header {
  width: 100%;
  background-color: var(--bright-color);
  padding: var(--gap-lg);
  font-size: var(--text-size-xxl);
  color: var(--text-primary-color);
  text-align: left;
  border: none;
  cursor: pointer;
}

.q-accordion-header:nth-child(1) {
  border-top-left-radius: var(--gap-xs);
  border-top-right-radius: var(--gap-xs);
}
.q-accordion-body {
  background-color: var(--background-color-secondary);
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}

.q-accordion-body > * {
  padding: 0 var(--gap-lg);
}

.q-accordion-wrapper {
  width: 100%;
}
</style>