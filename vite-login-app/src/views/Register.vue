<template>
  <div id="register" class="q-mt-5">
    <q-snip-container>
      <q-card card-title="Sign up for a new account">
        <template v-slot:card-body>
          <form @submit.prevent="handleLogin">
            <input-group>
              <!-- Input for username -->
              <base-input
                minlength="6"
                type="text"
                label="Username"
                v-model="formRegister.username"
                required
              ></base-input>
              <!-- Input for username -->
              <base-input
                type="email"
                label="Email adress"
                v-model="formRegister.email"
                required
              ></base-input>
              <base-input
                minlength="6"
                :type="settings.cleartextPassword ? 'text' : 'password'"
                label="Password"
                v-model="formRegister.password"
                required
              ></base-input>
            </input-group>
            <base-button
              :loading="settings.loading"
              class="q-button-base q-form-input-button"
              label="Register"
            ></base-button>
            <base-button
              class="q-button-base"
              variant="link"
              label="Already have an account? Log in"
              @click.prevent="$router.push({ path: '/login' })"
            ></base-button>
          </form>
        </template>

        <template v-slot:card-footer> </template>
      </q-card>
    </q-snip-container>
  </div>
</template>

<script>
import QSnipContainer from "../components/Layout/Board/QSnipContainer.vue";
import QCard from "../components/UI/Cards/QCard.vue";
import BaseInput from "../components/Form/BaseInput.vue";
import BaseButton from "../components/Form/BaseButton.vue";
import InputGroup from "../components/Form/InputGroup.vue";

import { mapActions } from "vuex";

export default {
  components: {
    QSnipContainer,
    QCard,
    BaseInput,
    BaseButton,
    InputGroup,
  },

  data() {
    return {
      formRegister: {
        username: "",
        email: "",
        password: "",
      },
      settings: {
        loading: false,
        cleartextPassword: false,
      },
    };
  },

  methods: {
    ...mapActions(["registerUser", "alert"]),
    async handleLogin() {
      try {
        this.settings.loading = true;
        const payload = {
          username: this.formRegister.username,
          password: this.formRegister.password,
          email: this.formRegister.email,
        };

        const { title, message } = await this.registerUser(payload);
        this.alert({ title, message });
        this.formRegister = { username: "", password: "", email: "" };
        this.$router.push({ path: "/login" });
      } catch (err) {
        // TODO: Handle user already exists
        this.$emit("alertError", err);
      } finally {
        this.settings.loading = false;
      }
    },

    onTogglePassword() {
      this.settings.cleartextPassword = !this.settings.cleartextPassword;
    },
  },
};
</script>

<style>
.q-register-input:valid {
  transition: var(--duration-quick);
  border-bottom: var(--gap-xxs) solid var(--success-color);
}
</style>