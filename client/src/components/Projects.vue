<template>
  <div class="home-section" style="padding-top: 10vh; padding-bottom: 10vh" id="skills">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2 class="white--text text-center">Projects</h2>
        </v-col>
        <v-col offset="1" cols="10" offset-lg="3" lg="6" class="mb-12">
          <v-divider dark></v-divider>
        </v-col>
        <v-col v-for="project in this.projects" :key="project.name"
               cols="12" sm="12" md="6" lg="6" class="mt-6">
          <v-card dark color="#001d33"
                  elevation="1"
                  class="rounded-ts-xl rounded-be-xl">
            <v-card-title class="text-center">
              <h5>{{ project.name }}</h5>
            </v-card-title>
            <v-divider dark/>
            <v-card-text class="text-center overflow-y-auto" style="height: 110px">
              <p style="font-size: 15px; padding-bottom: 1em">
                {{ project.desc }}
              </p>
            </v-card-text>
            <v-card-text class="text-center  overflow-y-auto">
              <v-divider dark/>
              <p style="padding-top: 1em">
                <template v-for="(techno, index) in project?.technologies" :key="index">{{ techno + ', ' }}</template>
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Projects',
  data() {
    return {
      projects: []
    }
  },
  beforeMount() {
    axios.get(import.meta.env.VITE_APP_BASE_API_URL + '/projects').then(r => {
      console.log(r);
      this.projects =  r.data ? r.data : [];
    }).catch()
  },
  methods: {

  }
}
</script>

<style scoped>

</style>