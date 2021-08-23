<template>
  <div class="q-card">
    <div class="q-card-header">
      <h3>{{ title }}</h3>
    </div>
    <div class="q-card-body">
      <slot name="card-body" />
    </div>
    <div class="q-card-footer">
      <slot name="card-footer" />
    </div>
  </div>
</template>


<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: "A card title",
    },
  },
};
</script>

<style scoped>
.q-card {
  background-color: var(--background-color-tartiary);
  border-top: 3px solid var(--accent-color-primary);
  border-radius: var(--gap-xs);
  transition: var(--duration-quick) all;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 6px;
}
.q-card > * {
  padding: var(--gap-lg);
}

.q-card:hover {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 5px 15px;
  transform: translateY(var(--gap-xs));
  transition: var(--duration-quick) all;
}


.q-card-header > *,
.q-card-footer > *,
.q-card-body > * {
  margin: 0;
  width: 100%;
}

.q-card-body > *, .q-card-body > * > * {
  line-height: var(--gap-xl);
}
</style>