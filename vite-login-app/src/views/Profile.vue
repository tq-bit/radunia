<template>
  <div class="q-mt-5">
    <!-- TODO: Create a component for this grid style -->

    <q-grid-container format="1/3">
      <q-grid-column class="q-mb-1">
        <q-user-card body-format="transparent">
          <template v-slot:card-body>
            <q-grid-container fluid :cols="1">
              <q-image
                rounded
                max-height="100px"
                max-width="100px"
                :src="`https://eu.ui-avatars.com/api/?name=${activeUserData.userName}&background=e39d3a&color=fff`"
              ></q-image>
              <div>
                <h3 class="center q-mt-1">
                  Welcome back {{ activeUserData.userName }}
                </h3>
                <p class="center q-mt-1">
                  Your last login was on {{ userLoginDate }}
                </p>
              </div>
            </q-grid-container>
          </template>
        </q-user-card>
      </q-grid-column>
      <q-grid-column>
        <q-user-card body-format="bright">
          <template v-slot:card-body>
            <q-grid-container fluid :cols="1">
              <div>
                <h3>Edit your Profile</h3>
                <p>Here is the place to change your profile information ...</p>
              </div>
              <hr />
              <q-textarea
                disabled
                v-if="!editBio"
                v-model="activeUserData.userBio"
              ></q-textarea>
              <q-textarea
                v-if="editBio"
                v-model="userData.userBio"
              ></q-textarea>
              <base-button
                @click="handleUpdateUserData"
                :label="editBio ? '💾 Update profile' : '📜 Change Bio'"
              ></base-button>
            </q-grid-container>
          </template>
          <template v-slot:card-footer> Footer </template>
        </q-user-card>
      </q-grid-column>
    </q-grid-container>
  </div>
</template>

<script>
import { DateTime } from "luxon";
import QGridContainer from "../components/Layout/Grid/QGridContainer.vue";
import QGridColumn from "../components/Layout/Grid/QGridColumn.vue";
import QImage from "../components/UI/QImage.vue";
import QUserCard from "../components/Layout/Cards/QUserCard.vue";
import BaseButton from "../components/Form/BaseButton.vue";
import QTextarea from "../components/Form/BaseTextarea.vue";

import { mapGetters, mapActions } from "vuex";
export default {
  async mounted() {
    await this.getUserData();
    this.userData = this.activeUserData;
  },
  components: {
    QGridContainer,
    QGridColumn,
    QImage,
    QUserCard,
    BaseButton,
    QTextarea,
  },

  data() {
    return {
      editBio: false,
      userData: {
        userBio: "",
      },
    };
  },

  methods: {
    ...mapActions(["getUserData", "updateUserData", "alert"]),
    async handleUpdateUserData() {
      if (this.editBio === true) {
        try {
          const { userBio } = this.userData;
          const { userBio: userBioPreChange } = this.activeUserData;
          if (userBio === userBioPreChange) {
            return this.alert({ message: "No changes have been made" });
          } else {
            const { title, message } = await this.updateUserData({ userBio });
            return this.alert({ title, message });
          }
        } catch (err) {
          console.error(err);
        } finally {
          this.editBio = false;
        }
      } else {
        this.editBio = true;
        this.userData = { ...this.activeUserData };
      }
    },
  },

  computed: {
    ...mapGetters(["activeUserData"]),
    userLoginDate() {
      const loginDate = DateTime.fromISO(this.userData.lastLogin);
      return loginDate.toLocaleString(DateTime.DATETIME_MED);
    },
  },
};
</script>

<style>
</style>