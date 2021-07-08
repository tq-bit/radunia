<template>
  <section
    class="q-container-snip"
    :class="{ 'q-container-snip-center': center === true }"
  >
    <slot />
  </section>
</template>

<script>
export default {
  props: {
    center: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style scoped>
.q-container-snip {
  display: block;
  margin: auto;
  width: 95%;
}

.q-container-snip-center {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (min-width: 768px) {
  .q-container-snip {
    width: 50%;
  }
}

@media (min-width: 992px) {
  .q-container-snip {
    width: 40%;
  }
}

@media (min-width: 1200px) {
  .q-container-snip {
    width: 30%;
  }
}

@media (min-width: 1400px) {
  .q-container-snip {
    width: 25%;
  }
}
</style>