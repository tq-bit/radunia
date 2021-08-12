<template>
  <section
    class="q-container-paper"
    :class="{ 'q-container-paper-center': center === true }"
  >
    <div v-for="item in content" :key="item.title">
      <h1 class="q-container-paper-header">{{ item.title }}</h1>
      <div v-html="item.text"></div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    content: {
      type: Array,
      required: true,
      validator: (contentArray) => {
        return contentArray.every((element) => {
          const hasTitle = Object.keys(element).includes('title');
          const hasText = Object.keys(element).includes('text');
          return hasTitle && hasText
        });
      },
    },
    heading: {
      type: Boolean,
      required: false,
    },
    center: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style scoped>
.q-container-paper {
  background-color: var(--background-color-tartiary);
  border-radius: var(--gap-xs);
  display: block;
  margin: auto;
  margin-top: var(--gap-lg);
  margin-bottom: var(--gap-lg);
  padding: var(--gap-md);
  width: 95%;
}

.q-container-paper-header {
  color: var(--accent-color-primary);
}

.q-container-paper-center {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .q-container-paper {
    width: 80%;
  }
}

@media (min-width: 992px) {
  .q-container-paper {
    width: 70%;
  }
}

@media (min-width: 1200px) {
  .q-container-paper {
    width: 60%;
  }
}

@media (min-width: 1400px) {
  .q-container-paper {
    width: 50%;
  }
}
</style>