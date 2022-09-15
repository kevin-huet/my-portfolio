<template>
  <div class="stripe-section" style="padding-top: 10vh; padding-bottom: 10vh" id="about">
    <v-row align="center">
      <v-col cols="12">
        <h2 class="white--text text-center">About me</h2>
      </v-col>
      <v-col offset="1" offset-lg="3" cols="10" lg="6">
        <v-divider dark></v-divider>
      </v-col>
      <v-col offset="1" offset-lg="3" cols="10" lg="6" style="padding-top: 5vh; padding-bottom: 20vh">
        <v-card
          dark
          color="#001220"
          elevation="2"
          shaped>
          <v-card-text>
            <p style="font-size: 15px">
              I first took a professional baccalaureate in electrical engineering, particularly specialized in
              electricity and industrial maintenance.<br>
              At the end of this training, I realized that this job did not really suit me, so I made the choice to
              continue my studies in programming.<br>
              I made this choice because I have always been close to IT from a young age, it is a field that has always
              fascinated me, to the point where from high school I learned some basics on my own. in html, css and
              php<br>
              I then joined Epitech, a school particularly specialized in programming, where I was able to acquire in a
              very short time a very solid foundation in C, C ++ and various programming concepts in general.<br>
              After a successful 2 year at Epitech, I made the choice to change schools and opt for a training (still in
              programming) more oriented in a work-study framework and therefore a much closer experience with the world
              professional.<br><br>
              Currently student at ENI and developer at Bimeo.<br>
              I have had the opportunity on multiple occasions to work on technologies such as PHP, Symfony, Java, or
              NodeJS in my professional career or in other personal projects.<br>
              My goal is to evolve, to progress while appreciating the technologies that I use every day.<br><br>
              You can access my github here:<br>
              <a href="https://github.com/kevin-huet">GitHub</a>
            </p>
          </v-card-text>
        </v-card>
        <div style="margin-top: 4em;">
          <ControlBar @change-page="changePage" color-btn="#001220" actualPage="about"/>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import ControlBar from '@/components/ControlBar'

export default {
  name: 'About',
  components: { ControlBar },
  methods: {
    changePage (args) {
      (args.action === 'next') ? this.$emit('next-page', args.value)
        : this.$emit('previous-page', args.value)
    }
  }
}
</script>
