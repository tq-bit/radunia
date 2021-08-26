<template>
  <div id="home">
    <q-flex-container :fluid="true">
      <q-flex-column :cols="4">Test</q-flex-column>
      <q-flex-column :cols="4">Test</q-flex-column>
      <q-flex-column :cols="4">Test</q-flex-column>
    </q-flex-container>
    <!-- <q-hero
      :heading="homeHero.heading"
      :text="homeHero.text"
      :actions="homeActions"
    >
    </q-hero>
    <q-paper-container :content="homeContentWelcome"> </q-paper-container>
    <q-grid-container format="1/1/1">
      <q-card
        v-for="card in homeCards"
        :key="card.title"
        :title="card.title"
      >
        <template v-slot:card-body>
          <p>{{ card.text }}</p>
        </template>
      </q-card>
    </q-grid-container>
    <q-paper-container :content="homeContentDescription"> </q-paper-container> -->
  </div>
</template>

<script>
// @ is an alias to /src
import QAccordion from "../components/UI/Accordion/QAccordion.vue";
import QAccordionItem from "../components/UI/Accordion/QAccordionItem.vue";
import QHero from "../components/UI/QHero.vue";
import QGridContainer from "../components/Layout/Grid/QGridContainer.vue";
import QPaperContainer from "../components/Layout/Board/QPaperContainer.vue";
import QCard from "../components/Layout/Cards/QCard.vue";
import QFlexContainer from "../components/Layout/Flex/QFlexContainer.vue";
import QFlexColumn from "../components/Layout/Flex/QFlexColumn.vue";

export default {
  components: {
    QAccordion,
    QAccordionItem,
    QHero,
    QGridContainer,
    QPaperContainer,
    QCard,
    QFlexContainer,
    QFlexColumn,
  },
  data() {
    return {
      urlSource: "https://github.com/tq-bit/radunia",
      homeHero: {
        heading: "🌇 Radunia",
        text: "A fullstack MVC webapp built with the MEVN - stack",
      },

      homeActions: [
        {
          title: "Try it out",
          function: () => this.$router.push({ path: "/register" }),
        },
        {
          title: "Check the source",
          function: () => window.open(this.urlSource),
        },
      ],

      homeContentWelcome: [
        {
          title: "Welcome to Radunia",
          text: `
          <p>
            You're looking at a project created by <a target="_blank" href="https://blog.q-bit.me/about">Tobias Quante</a>. It was built to
            put together a few of the core concepts of a MEVN - application, developing vue apps with vite and containerize them up.
            You can create an account and fill in some personal information about yourself. Once that's done, your data can be
            conveniently accessed from anywhere, using the app's own <a href="http://${window.location.hostname}:3001/v1/api-docs/#/">OpenAPI Specification</a>.
          </p>
          <p>
            The base structure includes:
          </p>
          `,
        },
      ],

      homeCards: [
        {
          title: "🎨  Layout, Forms & UI",
          text: "The components-folder structure is kept lean. It contains some basic files to get started with and a lot of space for extensions.",
        },
        {
          title: "🔐  Secured REST backend",
          text: "Powered by Node.js and a MongoDB instance of your choice. A simple, yet secure, middleware protects closed resources.",
        },
        {
          title: "📜  Docs & Docker",
          text: "Radunia is rounded up by an OpenAPI specification and setup with docker, ready to be deployed to -and accessed from- anywhere",
        },
      ],

      homeContentDescription: [
        {
          text: `
          <p>
            I've developed the app to learn a few ideas of putting together a bigger fullstack app - features like proper form
            components, state management, authorization and api - documentation with OpenAPI .
            The project uses a dockerized MEVN stack structure to run. Its repository
            can be used as a convenient entrypoint to kickstart new developments that are meant to be highly customizable.
          </p>

          <p>While developing, I picked up a lot of concepts on fullstack development, such as </p>

          <ul>
            <li>✅ Write an OpenAPI-proof backend and connect a frontend app to it</li>
            <li>✅ Create a simple, yet foolproof, identity provider workflow with mongodb</li>
            <li>✅ Scaffold first a Vue CLI project and transition to Vite.js later</li>
            <li>✅ Implement a proper view, component & css - styling structure</li>
            <li>✅ Containerize everything up </li>
          </ul>

          <p>
            Setting it up for yourself is as easy as cloning the git repos and following the .md file instructions <a href="#">Try it out</a>.
          </p>
          `,
        },
      ],
    };
  },
};
</script>
