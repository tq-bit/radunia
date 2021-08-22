<template>
  <div id="login" class="q-mt-5">
    <q-snip-container>
      <q-card card-title="Login to access your profile">
        <template v-slot:card-body>
          <form @submit.prevent="handleLogin">
            <input-group>
              <!-- Input for username -->
              <base-input
                type="text"
                label="Username"
                title="Please fill in your username or email adress"
                v-model="formLogin.username"
                required
              ></base-input>
              <base-input
                :type="settings.cleartextPassword ? 'text' : 'password'"
                label="Password"
                title="Please type in your password"
                v-model="formLogin.password"
                required
              ></base-input>
            </input-group>
            <base-button
              :loading="settings.loading"
              label="Login"
            ></base-button>
            <base-button
              variant="link"
              label="Show password"
              @click.prevent="onTogglePassword"
            ></base-button>
            <base-button
              label="Not registered yet? Sign up"
              variant="link"
              @click.prevent="$router.push({ path: '/register' })"
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
      formLogin: {
        username: "",
        password: "",
      },
      settings: {
        loading: false,
        cleartextPassword: false,
      },
    };
  },

  methods: {
    ...mapActions(["login", "alert"]),
    async handleLogin() {
      try {
        this.settings.loading = true;
        const payload = {
          username: this.formLogin.username,
          password: this.formLogin.password,
        };

        const { status, title, message } = await this.login(payload);
        this.alert({ title, message });
        if (status === 'login-success') {
          this.$router.push({ path: `/profile` });
          this.formLogin = { username: "", password: "" };
        }
      } catch (err) {
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
