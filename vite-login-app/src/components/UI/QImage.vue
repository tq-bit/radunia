<template>
  <img
    class="q-image"
    :style="{
      'max-height': maxHeight,
      'max-width': maxWidth,
    }"
    :class="{
      'q-image-rounded': rounded === true,
    }"
    :src="src"
    :alt="alt"
  />
</template>

<script>
export default {
  props: {
    rounded: {
      type: Boolean,
      required: false,
      default: false,
    },
    maxHeight: {
      type: String, required: false, default: "100%"
    },
    maxWidth: {
      type: String, required: false, default: "100%"
    }
  },
};
</script>

<style scoped>
.q-image {
  margin: auto;
  display: block;
  height: auto;
  width: 100%;
}

.q-image-rounded {
  border-radius: 100%;
}
</style>