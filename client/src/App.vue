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
        <v-btn class="space-item active" @click="target = 'home'" outlined color="#5C4FCC">Home</v-btn>
        <v-btn class="space-item" @click="target = 'about'" outlined  color="#5C4FCC">About Me</v-btn>
        <v-btn class="space-item" @click="target = 'skills'" outlined  color="#5C4FCC">Skills</v-btn>
        <v-btn class="space-item" @click="target = 'timeline'" outlined  color="#5C4FCC">Timeline</v-btn>
        <v-btn class="space-item" @click="target = 'contact'" outlined  color="#5C4FCC">Contact</v-btn>
      </div>
    </v-app-bar>
    <v-navigation-drawer
      style="position:fixed; top:0; left:0;"
      v-model="drawer"
      absolute
      temporary
      color="#001d33"
    >
      <v-list dark
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title @click="target = 'home'">Home</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title @click="target = 'about'">About Me</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title @click="target = 'skills'">Skills</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title @click="target = 'timeline'">Timeline</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title @click="target = 'contact'">Contact</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <Home @change-page="changePage" :target="target"/>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>

import Footer from '@/components/Footer'
import Home from '@/views/Home'
import { pageName } from '@/utils/data'

export default {
  name: 'App',
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'Kévin Huet'
    // all titles will be injected into this template
  },
  components: { Home, Footer },
  data: () => ({
    target: pageName.HOME,
    drawer: false,
    group: null
  }),
  watch: {
    group () {
      this.drawer = false
    }
  },
  methods: {
    changePage (value) {
      this.target = value
      window.scrollTo(0, 0)
    }
  }
}
</script>
<style>
@font-face {
  font-family: "Bang";
  src: local("Bang"),
  url('assets/fonts/FreshLychee.otf')
}
.space-item {
  margin-right: 1em;
}
</style>
