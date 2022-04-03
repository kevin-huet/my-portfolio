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
        <v-btn outlined color="#5C4FCC" style="margin-right: 1em" v-scroll-to="'#home'">Home</v-btn>
        <v-btn outlined  color="#5C4FCC" style="margin-right: 1em" v-scroll-to="'#about'">About Me</v-btn>
        <v-btn outlined  color="#5C4FCC" style="margin-right: 1em" v-scroll-to="'#skills'">Skills</v-btn>
        <v-btn outlined  color="#5C4FCC" style="margin-right: 1em" v-scroll-to="'#timeline'">Timeline</v-btn>
        <v-btn outlined  color="#5C4FCC" style="margin-right: 1em" v-scroll-to="'#contact'">Contact</v-btn>
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
            <v-list-item-title v-scroll-to="'#home'">Home</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title v-scroll-to="'#about'">About Me</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title v-scroll-to="'#skills'">Skills</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title v-scroll-to="'#timeline'">Timeline</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title v-scroll-to="'#contact'">Contact</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view/>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>

import Footer from '@/components/Footer'
export default {
  name: 'App',
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'Kévin Huet'
    // all titles will be injected into this template
  },
  components: { Footer },
  data: () => ({
    drawer: false,
    group: null
  }),
  watch: {
    group () {
      this.drawer = false
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
</style>
