<template>
  <div class="home-section" style="padding-top: 10vh; padding-bottom: 10vh" id="skills">
    <v-row>
      <v-col cols="12">
        <h2 class="white--text text-center">Skills</h2>
      </v-col>
      <v-col offset="1" offset-lg="3" cols="10" lg="6">
        <v-divider dark></v-divider>
      </v-col>
      <v-col order="1" order-md="1" cols="4" offset="4" md="3" lg="2" offset-md="1" offset-lg="3">
        <BlobImage>
          <image href="/assets/images/js.webp" height="200" width="100%"/>
        </BlobImage>
      </v-col>
      <v-col order="2" order-md="2" cols="10" md="7" lg="4" offset="1" offset-lg="0" offset-md="0" class="mt-6">
        <v-card dark color="#001d33"
                elevation="1"
                class="rounded-ts-xl rounded-be-xl">
          <v-card-title  class="text-center">
            <v-spacer></v-spacer>
            <h5>Langages</h5>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-divider dark></v-divider>
          <v-card-text  class="text-center">
            <p style="font-size: 15px">
              Php, Javascript, C, C++, Java, HTML, CSS, Python, SQL
            </p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col order="4" order-md="3" cols="10" offset="1" md="7" lg="4" offset-lg="3" class="mt-6">
        <v-card dark color="#001d33"
                elevation="1"
                class="rounded-ts-xl rounded-be-xl">
          <v-card-title  class="text-center">
            <v-spacer></v-spacer>
            <h5>Librairies, Framework and Engines</h5>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-divider dark></v-divider>
          <v-card-text class="text-center">
            <p style="font-size: 15px">
              Symfony, Electron, NodeJS, ExpressJS, JavaEE, Flask
              CSFML, SFML, Godot Game Engine
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col order="3" order-md="4" cols="4" offset="4" md="3" lg="2" offset-md="0" offset-lg="0">
        <BlobImage>
          <image href="/assets/images/language.webp" height="200" width="100%"/>
        </BlobImage>
      </v-col>

      <v-col order="5" order-md="5" cols="4" offset="4" md="3" lg="2" offset-md="1" offset-lg="3">
        <BlobImage>
          <image href="/assets/images/db.webp" height="200" width="95%"/>
        </BlobImage>
      </v-col>
      <v-col order="6" order-md="6" cols="10" md="7" lg="4" offset="1" offset-md="0" offset-lg="0" class="mt-6">
        <v-card dark color="#001d33"
                elevation="1"
                class="rounded-ts-xl rounded-be-xl">
          <v-card-title  class="text-center">
            <v-spacer></v-spacer>
            <h5>Databases</h5>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-divider dark></v-divider>
          <v-card-text class="text-center">
            <p style="font-size: 15px">
              MongoDB, MariaDB, MySQL, PostgreSQL
            </p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col order="8" order-md="7" cols="10" offset="1" md="7" lg="4" offset-lg="3" class="mt-6">
        <v-card dark color="#001d33"
                elevation="1"
                class="rounded-ts-xl rounded-be-xl">
          <v-card-title class="text-center">
            <h5>Systems and sofwares</h5>
          </v-card-title>
          <v-divider dark></v-divider>
          <v-card-text class="text-center">
            <p style="font-size: 15px">
              UNIX Systems, Windows, MacOSX, Git, Docker, PM2, Photoshop, Clip Studio Paint
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col order="7" order-md="8" cols="4" offset="4" md="3" lg="2" offset-md="0" offset-lg="0">
        <BlobImage>
          <image href="/assets/images/computer.webp" height="200" width="95%"/>
        </BlobImage>
      </v-col>
    </v-row>
  </div>
</template>

<script>


import BlobImage from "./BlobImage.vue";

export default {
  name: 'Skills',
  components: { BlobImage },
  methods: {
    changePage (args) {
      (args.action === 'next') ? this.$emit('next-page', args.value)
        : this.$emit('previous-page', args.value)
    }
  }
}
</script>

<style scoped>

</style>
