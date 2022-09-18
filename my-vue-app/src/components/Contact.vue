<template>
  <div class="home-section" style="padding-top: 10vh; padding-bottom: 30vh" id="contact">
  <v-row>
    <v-col cols="12">
      <h2 class="white--text text-center">Contact</h2>
    </v-col>
    <v-col offset="1" cols="10" offset-lg="3" lg="6" class="mb-12">
      <v-divider dark></v-divider>
    </v-col>
    <v-col cols="10" offset="1" md="8" offset-md="2" lg="6" offset-lg="3">
      <v-card dark color="#001d33" shaped class="pa-4 rounded-ts-xl rounded-be-xl">
        <Alert :alert="(alert.error) || (alert.success)"
               :text="(alert.error) ? alert.errorMessage : alert.successMessage"
               :color="(alert.error) ? 'red' : 'green'"></Alert>
        <v-form
            class="mt-4"
          @submit.prevent="sendForm"
        >
          <v-text-field
            v-model="this.form.name"
            label="Name"
            required filled
            background-color="#001729"
          ></v-text-field>

          <v-text-field
            v-model="this.form.email"
            label="E-mail"
            required filled
            background-color="#001729"
          ></v-text-field>

          <v-select
            dark
            v-model="this.form.reason"
            :items="items"
            label="Reason"
            required filled
            background-color="#001729"
          ></v-select>
          <v-textarea
            filled
            v-model="this.form.message"
            label="Message"
            background-color="#001729"
          />
          <v-btn
            color="success"
            class="mr-4"
            @click="sendForm"
          >
            Send
          </v-btn>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
    <div style="margin-top: 4em;">
    </div>
  </div>
</template>

<script>
import Alert from "./Alert.vue";
import axios from 'axios';
import {email, helpers, maxLength, required} from "@vuelidate/validators";
export default {
  name: 'Contact',
  components: { Alert },
  data () {
    return {
      alert: {
        success: false,
        error: false,
        successMessage: '',
        errorMessage: ''
      },
      form: {
        name: '',
        email: '',
        message: '',
        reason: ''
      },
      items: [
        'Job',
        'Other'
      ]
    }
  },
  validations: {
    form: {
      name: { required },
      email: {  required, email },
      reason: { required },
      message: { required, maxLength: helpers.withMessage('Your message cannot be more than 10000 characters', maxLength(1000)) }
    }
  },
  methods: {
    changePage (args) {
      (args.action === 'next') ? this.$emit('next-page', args.value)
        : this.$emit('previous-page', args.value)
    },
    sendForm () {
      axios.post(import.meta.env.VITE_APP_BASE_API_URL + '/contact', this.form).then(r => {
        console.log(r)
        if (r.data) {
          this.alert.successMessage = r.data?.message
        }
        this.alert.success = true
        this.alert.error = false
      }).catch(err => {
        console.log(err)
        if (err.response) {
          if (err.response.status === 429) {
            this.alert.errorMessage = 'You have sent too many messages, please wait several minutes before trying again.'
          } else {
            this.alert.errorMessage = err.response.data?.message
          }
        }
        this.alert.error = true
        this.alert.success = false
      })
    }
  },
  computed: {
  }
}
</script>

<style scoped>

</style>
