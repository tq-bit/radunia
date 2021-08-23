<template>
  <transition appear name="fade-move">
    <div v-if="show" class="q-alert">
      <div class="q-alert-body">
        <h3 v-if="title">{{ title }}</h3>
        <p v-if="message">{{ message }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: false,
      default: true
    },
    title: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      required: false,
    },
    type: {
      type: Boolean,
      required: false,
    },
  },
};
</script>

<style scoped>
.q-alert {
  background-color: var(--accent-color-primary);
  border-radius: var(--gap-xs);
  position: fixed;
  margin: auto;
}

.q-alert-body {
  display: flex;
  flex-direction: column;
}

.q-alert > * {
  padding: 0 var(--gap-md);
}

.q-alert-body > * {
  padding: 0 var(--gap-md);
}

@media (max-width: 992px) {
  .q-alert {
    bottom: 2%;
    left: 5%;
    width: 90%;
  }
}

@media (min-width: 992px) {
  .q-alert {
    bottom: 5%;
    left: 30%;
    right: 30%;
    max-width: var(--el-size-xl)
  }
}
</style>