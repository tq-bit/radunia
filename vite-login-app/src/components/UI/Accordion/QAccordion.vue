<template>
  <div class="q-accordion-wrapper">
    <header class="q-accordion-header">
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