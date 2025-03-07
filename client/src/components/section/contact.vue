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
        <ContactForm @alert="alertEvent"/>
      </v-card>
    </v-col>
  </v-row>
    <div style="margin-top: 4em;">
    </div>
  </div>
</template>

<script lang="ts">
import Alert from "@/components/ui/alert.vue";
import axios from 'axios';
import {email, helpers, maxLength, required} from "@vuelidate/validators";
import ContactForm from "@/components/forms/contact-form.vue";
import {reactive} from "vue";
import {da} from "vuetify/locale";
export default {
  name: 'Contact',
  components: {ContactForm, Alert },
  setup() {
    const alert = reactive({
      success: false,
      error: false,
      successMessage: '',
      errorMessage: ''
    });

    const form = reactive({
      name: '',
      email: '',
      message: '',
      reason: ''
    });
    const items = ['Job', 'Other'];
    const validations = reactive({
      form: {
        name: { required },
        email: { required, email },
        reason: { required },
        message: { required, maxLength: helpers.withMessage('Your message cannot be more than 10000 characters', maxLength(1000)) }
      }
    });

    const alertEvent = (data: any) => {
      alert.errorMessage = data.errorMessage;
      alert.error = data.error;
      alert.successMessage = data.successMessage;
      alert.success = data.success;
    }

    return {
      alert,
      form,
      items,
      validations,
      alertEvent
    };
  },
  methods: {
    changePage (args: any) {
      (args.action === 'next') ? this.$emit('next-page', args.value)
        : this.$emit('previous-page', args.value)
    },

  },
  computed: {
  }
}
</script>

<style scoped>

</style>
