<template>
    <button :class="{'active': active}" class="hamburger hamburger-cancel">
      <span class="icon"></span>
    </button>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      required: false,
      default: true,
    }
  }
}
</script>

<style scoped>
/* Styles for the hamburger icon */
.hamburger {
  font-size: 20px;
  display: inline-block;
  width: 1em;
  height: 0.8em;
  padding: 0;
  cursor: pointer;
  transition: transform var(--duration-quickest) ease-in-out;
  vertical-align: middle;

  border: 0 none;
  background: transparent;
}

.hamburger:before,
.hamburger:after {
  content: "";
}

.hamburger:before,
.hamburger .icon,
.hamburger:after {
  display: block;
  width: 100%;
  height: .20em;
  margin: 0 0 .2em;
  transition: transform var(--duration-quick) ease-in-out;
  border-radius: .05em;
  background: var(--accent-color-primary);
}

.hamburger.active:before,
.hamburger.active .icon,
.hamburger.active:after {
  background: var(--accent-color-primary);
}

.hamburger.hamburger-cancel.active .icon {
  transform: scale(0);
}

.hamburger.hamburger-cancel.active:before {
  transform: translateY(.4em) rotate(135deg);
}

.hamburger.hamburger-cancel.active:after {
  transform: translateY(-.4em) rotate(-135deg);
}
</style>