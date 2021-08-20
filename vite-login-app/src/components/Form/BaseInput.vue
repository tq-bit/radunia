<template>
  <label :for="uuid" class="q-input-label">{{ label }}</label>
  <input
    class="q-input-base"
    v-bind="$attrs"
    :id="uuid"
    :placeholder="label"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  setup() {
    const uuid = uuidv4();
    return { uuid };
  },
  props: {
    label: {
      type: String,
      default: "",
    },

    modelValue: {
      type: [String, Number],
      default: "",
    },
  },
};
</script>

<style scoped>
.q-input-base,
.q-input-label {
  font-size: var(--text-size-sm);
  padding: var(--gap-xs) var(--gap-sm);
}

.q-input-label {
  color: var(--accent-color-primary);
  font-size: var(--text-size-sm);
  font-weight: 600;
  text-transform: uppercase;
}

.q-input-base {
  background-color: transparent;
  color: var(--text-color-primary);
  caret-color: var(--text-color-primary);
  border: none;
  border-bottom: var(--gap-xxs) solid transparent;
  margin-bottom: var(--gap-md);
}

.q-input-base:focus {
  outline: none;
  transition: var(--duration-quickest);
  border-bottom: var(--gap-xxs) solid var(--accent-color-primary);
}
</style>