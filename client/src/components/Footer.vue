<template>
  <v-footer
    dark
    color="#001d33"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-scroll-to="'#' + link.toLocaleLowerCase()"
        v-for="link in links"
        :key="link"
        text
        rounded
        class="my-2"
      >
        {{ link }}
      </v-btn>
      <v-col
        style="background: #001220"
        class="py-4 text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Kevin HUET</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',

  data: () => ({
    links: [
      'Home',
      'About',
      'Skills',
      'Timeline',
      'Contact'
    ]
  })
}
</script>

<style scoped>

</style>
