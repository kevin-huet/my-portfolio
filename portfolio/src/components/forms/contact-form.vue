<script lang="ts">
import {DefineProps, reactive, SetupContext} from "vue";
import {email, helpers, maxLength, required} from "@vuelidate/validators";
import axios from "axios";
import {contactService} from "@/services/contact.service";

export default {
  name: "ContactForm",
  emits: ['alert'],
  setup(props: DefineProps<any, any>, ctx: SetupContext) {
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
        name: {required},
        email: {required, email},
        reason: {required},
        message: {
          required,
          maxLength: helpers.withMessage('Your message cannot be more than 10000 characters', maxLength(1000))
        }
      }
    });

    const sendForm = async () => {
      let success = false;
      let error = false;
      contactService.send({
        name: form.name,
        email: form.email,
        message: form.message,
        reason: form.reason
      }).then(r => {
        const successMessage = r?.data?.message
        success = true;
        error = false;
        ctx.emit('alert', {
          successMessage: successMessage,
          errorMessage: '',
          error: error,
          success: success
        });
      }).catch(err => {
        let errorMessage = "";
        if (err.response) {
          if (err.response.status === 429) {
            errorMessage = 'You have sent too many messages, please wait several minutes before trying again.';
          } else {
            errorMessage = err.response.data?.message;
          }
        }
        success = false
        error = true
        ctx.emit('alert', {
          successMessage: '',
          errorMessage: errorMessage,
          error: error,
          success: success
        });
      })
    }

    return {
      alert,
      form,
      items,
      validations,
      sendForm
    };
  },
}
</script>

<template>
  <v-form
      class="mt-4"
      @submit.prevent="sendForm"
  >
    <v-text-field
        v-model="form.name"
        label="Name"
        required filled
        background-color="#001729"
    ></v-text-field>

    <v-text-field
        v-model="form.email"
        label="E-mail"
        required filled
        background-color="#001729"
    ></v-text-field>

    <v-select
        dark
        v-model="form.reason"
        :items="items"
        label="Reason"
        required filled
        background-color="#001729"
    ></v-select>
    <v-textarea
        filled
        v-model="form.message"
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
</template>

<style scoped>

</style>