<template>
  <section class="q-container-board" :class="{'q-container-board-center': center === true}">
    <slot />
  </section>
</template>

<script>
export default {
  props: {
    center: {
      type: Boolean,
      required: false,
      default: false
    }
  }
};
</script>

<style scoped>
.q-container-board {
  width: 95%;
  display: block;
  margin: auto;
}

.q-container-board-center {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .q-container-board {
    width: 90%;
  }
}

@media (min-width: 992px) {
  .q-container-board {
    width: 80%;
  }
}

@media (min-width: 1200px) {
  .q-container-board {
    width: 70%;
  }
}

@media (min-width: 1400px) {
  .q-container-board {
    width: 60%;
  }
}
</style>