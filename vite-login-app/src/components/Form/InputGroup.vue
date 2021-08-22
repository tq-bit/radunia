<template>
  <fieldset class="input-group">
    <legend v-if="title">{{ title }}</legend>
    <slot />
  </fieldset>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
    },
  },
};
</script>

<style scoped>
.input-group {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: auto;
  padding: var(--gap-sm) 0;
  border: none;
}
</style>