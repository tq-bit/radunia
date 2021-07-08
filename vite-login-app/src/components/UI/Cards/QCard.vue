<template>
  <div class="q-card">
    <div class="q-card-header">
      <h3>{{ cardTitle }}</h3>
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
    cardTitle: {
      type: String,
      required: false,
      default: "A card title",
    },
  },
};
</script>

<style scoped>
.q-card {
  margin: var(--gap-md);
  background-color: var(--bright-color);
  border-top: 3px solid var(--primary-color);
  border-radius: var(--gap-xs);
  transition: var(--duration-quick) all;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 6px;
}

.q-card:hover {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 5px 15px;
  transform: translateY(var(--gap-xs));
  transition: var(--duration-quick) all;
}

.q-card > * {
  margin: var(--gap-sm);
}

.q-card-header > *,
.q-card-footer > * {
  width: 100%;
  margin: var(--gap-xl) 0;
  text-align: center;
}

.q-card-body {
  padding: 0 var(--gap-md) var(--gap-md) var(--gap-md);
}

.q-card-body > *, .q-card-body > * > * {
  line-height: var(--gap-xl);
}
</style>