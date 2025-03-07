<script lang="ts">

export default {
  name: 'AppBar',
  emits: ['change-page-event'],
  data() {
    return {
      drawer: false,
      pages: [
        'Home',
        'About',
        'Skills',
        'Projects',
        'Timeline',
        'Contact'
      ]
    }
  },
  watch: {
    group () {
      this.drawer = false
    }
  },
}
</script>

<template>
  <v-app-bar
      app
      dark
      color="#001d33"
  >
    <v-app-bar-nav-icon aria-label="sidebar button" @click.stop="drawer = !drawer"
                        class="hidden-md-and-up"></v-app-bar-nav-icon>
    <v-toolbar-title style="font-family: Bang,serif; font-size: xx-large">&#60;Kevin Huet&#62;</v-toolbar-title>
    <v-spacer></v-spacer>
    <div class="hidden-sm-and-down">
      <v-btn v-for="page in pages" class="space-item" @click="$emit('change-page-event', page)" variant="outlined" color="#5C4FCC">{{ page }}</v-btn>
    </div>
  </v-app-bar>
  <v-navigation-drawer
      dark
      color="#001d33"
      v-model="drawer"
      absolute
      bottom
  >
    <v-list
        nav
        dense
    >
      <v-list-item v-for="page in pages">
        <v-list-item-title class="drawer-item" @click="() => {
          $emit('change-page-event', page)
          drawer = false
        }">{{ page }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
 .drawer-item {
   cursor: pointer;
 }
</style>