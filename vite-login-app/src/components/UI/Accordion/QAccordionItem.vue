<template>
  <div :class="{ reverse: reversed, topside: !reversed }">
    <button
      :class="{
        expanded: isExpanded,
        collapsed: !isExpanded,
        'q-rounded-top': roundedTop,
        'q-rounded-bottom': roundedBottom && !isExpanded,
      }"
      @click="isExpanded = !isExpanded"
      class="q-accordion-button"
    >
      {{ title }}
    </button>
    <section
      :id="panelId"
      :class="{ 'q-rounded-bottom': roundedBottom && isExpanded }"
      :aria-expanded="isExpanded"
      class="q-accordion-body"
    >
      <slot />
    </section>
  </div>
</template>

<script>
import { ref, watch, onMounted } from "vue";
import uuid from "../../../use/uuid";
export default {
  setup({ expanded }) {
    const panelId = uuid();
    let isExpanded = ref(expanded);
    const togglePanel = () => {
      const panel = document.getElementById(panelId);
      isExpanded.value
        ? (panel.style.maxHeight = panel.scrollHeight + "px")
        : (panel.style.maxHeight = null);
    };

    watch(isExpanded, () => togglePanel());
    onMounted(() => togglePanel());
    return { isExpanded, panelId };
  },
  props: {
    // Test properties
    title: {
      type: String,
      required: true,
    },

    // Style properties
    reversed: {
      type: Boolean,
      required: false,
      default: false,
    },

    roundedTop: {
      type: Boolean,
      required: false,
      default: false,
    },

    roundedBottom: {
      type: Boolean,
      required: false,
      default: false,
    },

    expanded: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style scoped>
.topside {
  display: flex;
  flex-direction: column;
}

.reverse {
  display: flex;
  flex-direction: column-reverse;
}

.q-accordion-button {
  width: 100%;
  background-color: var(--background-color-secondary);
  padding: var(--gap-lg);
  font-size: var(--text-size-lg);
  color: var(--text-color-primary);
  text-align: left;
  border: none;
  cursor: pointer;
}

.expanded:after {
  content: "+";
  transition: transform var(--duration-quickest);
  transform: rotate(45deg);
  float: right;
}

.collapsed:after {
  content: "+";
  transition: transform var(--duration-quickest);
  float: right;
}

.q-rounded-top {
  border-top-left-radius: var(--gap-xs);
  border-top-right-radius: var(--gap-xs);
}

.q-rounded-bottom {
  border-bottom-left-radius: var(--gap-xs);
  border-bottom-right-radius: var(--gap-xs);
}

.q-accordion-body {
  background-color: var(--background-color-tartiary);
  max-height: 0;
  overflow: hidden;
  transition: max-height var(--duration-quickest) ease-in-out;
  padding: 0 var(--gap-lg);
}
</style>