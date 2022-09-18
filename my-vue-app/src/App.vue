<template>
  <v-app>
    <v-app-bar
        app
        dark
        color="#001d33"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
      <v-toolbar-title style="font-family: Bang,serif; font-size: xx-large">&#60;Kevin Huet&#62;</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="hidden-sm-and-down">
        <v-btn class="space-item active" @click="changePage('Home')" variant="outlined" color="#5C4FCC">Home</v-btn>
        <v-btn class="space-item" @click="changePage('About')" variant="outlined" color="#5C4FCC">About Me</v-btn>
        <v-btn class="space-item" @click="changePage('Skills')" variant="outlined" color="#5C4FCC">Skills</v-btn>
        <v-btn class="space-item" @click="changePage('Timeline')" variant="outlined" color="#5C4FCC">Timeline</v-btn>
        <v-btn class="space-item" @click="changePage('Contact')" variant="outlined" color="#5C4FCC">Contact</v-btn>
      </div>
    </v-app-bar>
    <v-navigation-drawer
        dark
        color="#001d33"
        v-model="drawer"
        absolute
        bottom
        temporary="true"
    >
      <v-list
          nav
          dense
      >
        <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title @click="changePage('home')">Home</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title @click="changePage('about')">About Me</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title @click="changePage('skills')">Skills</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title @click="changePage('timeline')">Timeline</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title @click="changePage('contact')">Contact</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main style="background-color: #001220">
      <FadeInOut :duration="250" mode="out-in">
        <component @previous-page="changePage" @next-page="changePage" :is="this.dynamicComponent"></component>
      </FadeInOut>
    </v-main>
    <Footer @changePage="changePage"></Footer>
  </v-app>
</template>

<script>
import { pageName } from './utils/data'
import Footer from "./components/Footer.vue";
import Contact from "./components/Contact.vue";
import Timeline from "./components/Timeline.vue";
import Skills from "./components/Skills.vue";
import About from "./components/About.vue";
import Home from "./components/HomeSection.vue";
import {FadeInOut} from "vue3-transitions";

export default {
  name: 'App',
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'Kévin Huet'
    // all titles will be injected into this template
  },
  components: {FadeInOut, Footer, Contact, Timeline, Skills, About, Home },
  data () {
    return {
      dynamicComponent: 'home',
      target: pageName.HOME,
      drawer: false,
      group: null
    }
  },
  watch: {
    group () {
      this.drawer = false
    }
  },
  methods: {
    changePage (value) {
      this.dynamicComponent = value;
      this.drawer = false;
      console.log(`${value} to => ${this.dynamicComponent}`)
      window.scrollTo(0, 0)
    }
  }
}
</script>
<style lang="css">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  background-color: #001220!important;
  height: 100%!important;
}
@font-face {
  font-family: "Bang";
  src: local("Bang"),
  url('/assets/fonts/FreshLychee.otf')
}
.space-item {
  margin-right: 1em;
}

.home-section {
  background-image: url('/assets/svg/svgBackground.svg');
  background-size: cover
}
.stripe-section {
  background-image: url('/assets/svg/svgBackground2.svg');
  background-size: cover
}
</style>
