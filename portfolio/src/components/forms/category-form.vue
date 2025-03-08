<script lang="ts">
 import {ref} from "vue";
 import {skillService} from "@/services/skill.service";
 import {CategoryDto} from "@/dto/category.dto";

 export default {
   name: 'CategoryForm',
   setup() {
       const name = ref('');

       const submitForm = () => {
         skillService.createCategory(name.value).then((r: any) => {
           console.log(r.data);
         });
       };


       return {
         name,
         submitForm
       }
   },
 }
</script>

<template>
  <form @submit.prevent="submitForm">
    <v-text-field label="name" v-model="name"></v-text-field>
    <v-btn type="submit">Create</v-btn>
  </form>
</template>

<style scoped>

</style>