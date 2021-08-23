<template>
  <div
    class="q-user-card"
    :class="{
      'q-user-card-filled': bodyFormat === 'filled',
      'q-user-card-bright': bodyFormat === 'bright',
    }"
  >
    <div v-if="cardTitle" class="q-user-card-header">
      <h3>{{ cardTitle }}</h3>
    </div>
    <div class="q-user-card-body">
      <slot name="card-body" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardTitle: {
      type: String,
      required: false,
    },
    bodyFormat: {
      type: String,
      required: false,
      default: "transparent", // alt: filled, bright
    },
  },
};
</script>

<style scoped>
.q-user-card {
  width: 100%;
  border-radius: var(--gap-xs);
  transition: var(--duration-quick) all;
  background-color: var(--background-color-tartiary);
  color: var(--accent-color-blur-primary);
  border: var(--gap-tiny) solid var(--grey-color)
}

.q-user-card-filled {
  background-color: var(--accent-color-blur-primary);
  color: var(--background-color-tartiary);
}

.q-user-card-header,
.q-user-card-body {
  padding: var(--gap-md);
}
</style>