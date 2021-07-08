<template>
  <button
    :id="uuid"
    class="q-button-base"
    :class="{
      'q-button-v-default': variant === 'default',
      'q-button-v-big': variant === 'big',
      'q-button-v-link': variant === 'link',
      'q-button-c-primary': coloring === 'primary',
      'q-button-c-secondary': coloring === 'secondary',
      'q-button-c-bright': coloring === 'bright',
    }"
  >
    <i v-if="loading">
      <div class="loader"></div>
    </i>
    <span v-else>
      {{ label }}
    </span>
  </button>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  setup() {
    const uuid = uuidv4();
    return { uuid };
  },
  props: {
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    label: {
      type: String,
      required: true,
      default: "",
    },
    coloring: {
      type: String,
      required: false,
      default: "primary",
      validator(value) {
        const isPrimary = value === "primary";
        const isBright = value === "bright";
        return isPrimary || isBright;
      },
    },
    variant: {
      type: String,
      required: false,
      default: "default",
      validator(value) {
        const isDefault = value === "default";
        const isBig = value === "big";
        const isLink = value === "link";
        return isDefault || isBig || isLink;
      },
    },
  },
};
</script>

<style scoped>
.q-button-base {
  border: none;
  border-radius: var(--gap-xs);
  color: var(--bright-color);
  cursor: pointer;
  font-size: var(--text-size-md);
  margin: var(--gap-xs) 0;
  padding: var(--gap-sm) var(--gap-sm);
  text-align: center;
  width: 100%;
}

/* Variant classes */
.q-button-v-default {
  padding: var(--gap-sm) var(--gap-sm);
  font-size: var(--text-size-md);
  background-color: var(--primary-color);
  font-weight: 600;
}

.q-button-v-big {
  font-size: var(--text-size-xxl);
  padding: var(--gap-md) var(--gap-xl);
  font-weight: 600;
}

.q-button-v-link {
  background-color: transparent !important;
  color: var(--primary-color) !important;
}

.q-button-v-link:hover {
  text-decoration: underline;
}

/* Color classes */
.q-button-c-primary {
  background-color: var(--primary-color);
  color: var(--bright-color);
}

.q-button-c-secondary {
  background-color: var(--secondary-color);
  color: var(--bright-color);
}

.q-button-c-bright {
  background-color: var(--bright-color);
  color: var(--primary-color);
}

/* Styles for the loader */
.loader {
  display: block;
  margin: auto;
  width: var(--text-size-xl);
  height: var(--text-size-xl);
  border-radius: 50%;
  border-top: 2px solid var(--bright-color);
  border-right: 2px solid transparent;
  animation: fullRotation 1s linear infinite;
}

@keyframes fullRotation {
  to {
    transform: rotate(360deg);
  }
}
</style>