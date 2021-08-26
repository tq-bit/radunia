<template>
  <div
    class="q-flex"
    :class="{
      'q-flex-fluid': fluid === true,
    }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    fluid: {
      type: Boolean,
      required: false,
      default: false,
    },
    cols: {
      type: Number,
      required: false,
    },
  },
};
</script>

<style scoped>
.q-flex {
  width: 95%;
  display: flex;
  margin: auto;
}

.q-flex-fluid {
  width: 100% !important;
}

@media (min-width: 768px) {
  .q-flex {
    width: 80%;
  }
}

@media (min-width: 992px) {
  .q-flex {
    width: 70%;
  }
}

@media (min-width: 1200px) {
  .q-flex {
    width: 60%;
  }
}

@media (min-width: 1400px) {
  .q-flex {
    width: 50%;
  }
}
</style>