<template>
  <div style="text-align: center">
    <v-btn
      style="width: 170px"
      class="align-center"
      rounded
      dark
      :color="colorBtn"
      @click="() => { this.$emit('change-page', { value: this.actualPage, action: 'previous' })}"
    >
      <v-icon>mdi-arrow-left</v-icon>&nbsp;&nbsp;Previous&nbsp;&nbsp;
    </v-btn>
    <v-btn
      style="margin-left: 4em; width: 170px;"
      rounded
      dark
      :color="colorBtn"
      @click="() => { this.$emit('change-page', { value: this.actualPage, action: 'next' })}"
    >
      <v-icon></v-icon>&nbsp;&nbsp;Next&nbsp;&nbsp;<v-icon>mdi-arrow-right</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'ControlBar',
  props: {
    actualPage: String,
    colorBtn: String
  }
}
</script>

<style scoped>

</style>
