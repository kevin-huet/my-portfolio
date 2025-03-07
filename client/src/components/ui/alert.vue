<template>
  <v-alert
    :model-value="alert"
    :color="color"
    :border="border"
    icon="mdi-star"
    transition="scale-transition"
    dark
  >
    {{ text }}
  </v-alert>
</template>

<script lang="ts">
export default {
  name: 'Alert',
  props: ['color', 'icon', 'border', 'alert', 'text']
}
</script>

<style scoped>

</style>
