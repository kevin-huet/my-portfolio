<template>
  <div class="stripe-section" style="padding-top: 10vh; padding-bottom: 20vh" id="timeline">
    <v-row>
      <v-col cols="12">
        <h2 class="white--text text-center">Timeline</h2>
      </v-col>
      <v-col offset="1" cols="10" offset-lg="3" lg="6" class="mb-12">
        <v-divider dark></v-divider>
      </v-col>
      <v-col cols="12" offset="0" sm="10" offset-sm="1" lg="8" offset-lg="2">
        <v-timeline dark>
          <v-timeline-item dark
                           v-for="data in timeline"
                           :key="data.index" small
          >
            <v-card class="rounded-ts-xl rounded-be-xl" elevation="2" color="#001220" dark shaped>
              <v-card-title class="text-h5" dark>
                {{ data.date }}
              </v-card-title>
              <v-card-text v-html="data.description">
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>
    <div style="margin-top: 4em">
    </div>
  </div>
</template>

<script>

export default {
  name: 'Timeline',
  data: () => ({
    timeline: [
      {
        date: 'Now',
        description: '<p>Designer / Developer in the company Bimeo, and student at ENI.<br> I mainly program in Php / Symfony during my professional activity</p>'
      },
      { date: '2020', description: 'Epitech 2nd year student' },
      { date: '2019', description: 'Fullstack developer at Bimeo (internship)' },
      { date: '2018 - 2019', description: 'Epitech 1st year student' },
      { date: 'Post 2018', description: 'Electro-technical baccalaureate student' }
    ]
  }),
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
