<template>
    <v-footer style="background-color: #001220">
      <v-row justify="center" no-gutters>
        <v-btn
            v-for="link in links"
            :key="link"
            @click="changePage(link)"
            color="white"
            variant="text"
            class="mx-2"
            rounded="xl"
        >
          {{ link }}
        </v-btn>
        <v-col class="text-center mt-4" cols="12">
          {{ new Date().getFullYear() }} — <strong>Kevin HUET</strong>
        </v-col>
      </v-row>
    </v-footer>
</template>

<script lang="ts">
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
  }),
  methods: {
    changePage (value: any) {
      this.$emit('changePage', value)
    }
  }
}
</script>

<style scoped>

</style>
