<template>
  <v-row>
    <v-col cols="12">
      <h2 class="white--text text-center">Contact</h2>
    </v-col>
    <v-col offset="1" cols="10" offset-lg="3" lg="6" class="mb-12">
      <v-divider dark></v-divider>
    </v-col>
    <v-col cols="10" offset="1" md="8" offset-md="2" lg="6" offset-lg="3">
      <v-card dark color="#001d33" shaped class="pa-4">
        <Alert :alert="(alert.error) || (alert.success)"
               :text="(alert.error) ? alert.errorMessage : alert.successMessage"
               :color="(alert.error) ? 'red' : 'green'"></Alert>
        <v-form
          @submit.prevent="sendForm"
        >
          <v-text-field
            v-model="form.name"
            @input="$v.form.name.$touch()"
            @blur="$v.form.name.$touch()"
            label="Name"
            required filled
            :error-messages="nameErrors"
            background-color="#001729"
          ></v-text-field>

          <v-text-field
            v-model="form.email"
            @input="$v.form.email.$touch()"
            @blur="$v.form.email.$touch()"
            label="E-mail"
            required filled
            :error-messages="emailErrors"
            background-color="#001729"
          ></v-text-field>

          <v-select
            dark
            v-model="form.reason"
            @change="$v.form.reason.$touch()"
            @blur="$v.form.reason.$touch()"
            :items="items"
            :error-messages="reasonErrors"
            label="Reason"
            required filled
            background-color="#001729"
          ></v-select>
          <v-textarea
            filled
            :error-messages="messageErrors"
            v-model="form.message"
            @input="$v.form.message.$touch()"
            @blur="$v.form.message.$touch()"
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
</template>

<script>
import Alert from '@/components/Alert'
import { required, maxLength, email } from 'vuelidate/lib/validators'
export default {
  name: 'Contact',
  components: { Alert },
  data () {
    return {
      name: '',
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
      email: { required, email },
      reason: { required },
      message: { required, maxLength: maxLength(1000) }
    }
  },
  methods: {
    sendForm () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.$http.post(process.env.VUE_APP_BASE_API_URL + '/contact', this.form).then(r => {
        console.log(r)
        if (r.data) {
          this.alert.successMessage = r.data.message
        }
        this.alert.success = true
        this.alert.error = false
      }).catch(err => {
        console.log(err)
        if (err.response && err.response.status === 429) {
          this.alert.errorMessage = 'You have sent too many messages, please wait several minutes before trying again.'
        } else {
          this.alert.errorMessage = err.response.data.message
        }
        this.alert.error = true
        this.alert.success = false
      })
    }
  },
  computed: {
    reasonErrors () {
      const errors = []
      if (!this.$v.form.reason.$dirty) return errors
      !this.$v.form.reason.required && errors.push('a reason is required.')
      return errors
    },
    messageErrors () {
      const errors = []
      if (!this.$v.form.message.$dirty) return errors
      !this.$v.form.message.required && errors.push('A message is required.')
      !this.$v.form.message.maxLength && errors.push('Name must be at most 1000 characters long')
      return errors
    },
    nameErrors () {
      const errors = []
      if (!this.$v.form.name.$dirty) return errors
      !this.$v.form.name.required && errors.push('Name is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.form.email.$dirty) return errors
      !this.$v.form.email.email && errors.push('Must be valid e-mail')
      !this.$v.form.email.required && errors.push('E-mail is required')
      return errors
    }
  }
}
</script>

<style scoped>

</style>
