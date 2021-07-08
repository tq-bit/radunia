<template>
  <div id="404" class="q-mt-5">
    <q-grid-container format="1/1/1">
      <q-grid-column></q-grid-column>
      <q-grid-column>
        <q-image
          :src="notFoundImage"
          width="360px"
          alt="an image to show that this page does not exist"
        />
        <router-link :to="redirect">
          <base-button
            label="It appears you are lost. Let's get you back on track"
          ></base-button>
        </router-link>
      </q-grid-column>
      <q-grid-column></q-grid-column>
    </q-grid-container>
  </div>
</template>

<script>
import QGridContainer from "../components/Layout/Grid/QGridContainer.vue";
import QGridColumn from "../components/Layout/Grid/QGridColumn.vue";
import BaseButton from "../components/Form/BaseButton.vue";
import QImage from "../components/UI/QImage.vue";
import notFoundImage from "../assets/img/404.png";

export default {
  data() {
    return {
      notFoundImage,
    };
  },
  components: {
    QGridContainer,
    QGridColumn,
    BaseButton,
    QImage,
  },
  props: {
    redirect: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
</style>