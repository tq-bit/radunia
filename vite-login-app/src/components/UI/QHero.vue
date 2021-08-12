<template>
  <div class="q-hero-wrapper">
    <h1 class="q-hero-heading">
      {{ heading }}
    </h1>
    <p class="q-hero-text">
      {{ text }}
    </p>
    <div class="q-hero-action">
      <base-button
        v-for="action in actions"
        variant="big"
        coloring="bright"
        :key="action"
        :label="action.title"
        @click="action.function"
      >
      </base-button>
    </div>
  </div>
</template>

<script>
import BaseButton from "../Form/BaseButton.vue";
export default {
  components: {
    BaseButton,
  },

  props: {
    heading: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    actions: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.q-hero-wrapper {
  background-image: linear-gradient(
    5deg,
    var(--accent-color-blur-primary),
    var(--accent-color-primary),
    var(--accent-color-primary),
    var(--accent-color-blur-primary)
  );
  color: var(--black-color);
  text-align: center;
  padding: var(--gap-xxl);
}

.q-hero-heading {
  font-size: 2.75rem;
  padding-top: var(--gap-xl);
  padding-bottom: var(--gap-xl);
}

.q-hero-text {
  font-size: 1.5rem;
  font-weight: 600;
  padding-bottom: var(--gap-xl);
}

.q-hero-action {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: var(--gap-xl);
  padding-top: var(--gap-xl);
}

.q-hero-action > button {
  margin: var(--gap-md);
}

@media (min-width: 992px) {
  .q-hero-action{
    flex-direction: row;
  }

  .q-hero-action > button {
    width: fit-content;
  }
}
</style>