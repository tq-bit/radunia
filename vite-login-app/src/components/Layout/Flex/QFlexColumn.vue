<template>
  <div class="q-flex-col"
  :class="{
    'q-flex-col-1': cols === 1,
    'q-flex-col-2': cols === 2,
    'q-flex-col-3': cols === 3,
    'q-flex-col-4': cols === 4,
    'q-flex-col-5': cols === 5,
    'q-flex-col-6': cols === 6,
    'q-flex-col-7': cols === 7,
    'q-flex-col-8': cols === 8,
    'q-flex-col-9': cols === 9,
    'q-flex-col-10': cols === 10,
    'q-flex-col-11': cols === 11,
    'q-flex-col-12': cols === 12,
  }">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    cols: {
      type: Number,
      default: 1,
      validator(value) {
        return value > 0 && value <= 12;
      },
    },
  },
};
</script>

<style scoped>
.q-flex-col {
  padding-left: var(--gap-xl);
  padding-right: var(--gap-xl);
}

.q-flex-col-1 {
  width: 8.33%;
}
.q-flex-col-2 {
  width: 16.67%;
}
.q-flex-col-3 {
  width: 25%;
}
.q-flex-col-4 {
  width: 33.33%;
}
.q-flex-col-5 {
  width: 41.67%;
}
.q-flex-col-6 {
  width: 50%;
}
.q-flex-col-7 {
  width: 58.33%;
}
.q-flex-col-8 {
  width: 66.66%;
}
.q-flex-col-9 {
  width: 75%;
}
.q-flex-col-10 {
  width: 83.33%;
}
.q-flex-col-11 {
  width: 91.67%;
}
.q-flex-col-12 {
  width: 100%;
}
</style>