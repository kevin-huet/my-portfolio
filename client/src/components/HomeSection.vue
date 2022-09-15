<template>
  <div class="home-section" style="padding-top: 20vh; padding-bottom: 32vh" id="home">
    <v-row align="center">
      <v-col order="2" order-lg="1" cols="10" lg="5" offset="1" offset-lg="2" class="">
        <v-card class=""
                dark
                color="#001d33"
                elevation="1"
                shaped
        >
          <v-card-title class="">
            <h1 class="pt-4">Hi, i'm Kevin</h1>
          </v-card-title>
          <v-card-text>
            <p style="font-size: 15px">Hello ! My name is Kevin Huet, I am a 24 years old developer, mainly interested
              in
              web development but always curious and open to other technologies and different areas of development.<br>
              I have had the opportunity on multiple occasions to work on technologies such as PHP, Symfony, Java, or
              NodeJS in my professional career or in other personal projects.<br>
              My goal is to evolve, to progress while appreciating the technologies that I use every day.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col order="1" order-lg="2" offset="4" offset-md="5" offset-sm="5" offset-lg="1" cols="4" sm="2" md="2" lg="2">
        <BlobProfileImage></BlobProfileImage>
      </v-col>
      <v-col cols="12" lg="8" offset="1" offset-lg="2" order="3">
        <v-btn
          class="align-center"
          rounded
          dark
          color="#001d33"
          @click="nextPage"
        >
          <v-icon>mdi-star</v-icon>&nbsp;&nbsp;Discover me&nbsp;&nbsp;<v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BlobProfileImage from '@/components/BlobProfileImage'
import { pageName } from '@/utils/data'

export default {
  name: 'HomeSection',
  components: { BlobProfileImage },
  methods: {
    nextPage () {
      this.$emit('next-page', pageName.HOME)
    }
  }
}
</script>

<style scoped>

</style>
