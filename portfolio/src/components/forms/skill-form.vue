<script lang="ts">

import {onMounted, ref} from "vue";
import {skillService} from "@/services/skill.service";
import {CategoryDto} from "@/dto/category.dto";
import {ca, de} from "vuetify/locale";
export default {
  name: "SkillForm",
  computed: {
    de() {
      return de
    }
  },
  props: ['categories', 'action'],
  setup(props) {
    //form
    const action = props.action;
    const name = ref("");
    const desc = ref("");
    const category = ref("");

    const submitForm = () => {
      console.log(category);
      skillService.create({
        name: name.value,
        description: desc.value,
        category: category.value
      }).then((r) => {
        console.log(r.data);

      }).catch((err) => {
        console.log(err);
      })
    }

    onMounted(() => {
    });

    return {action, name, desc, category, submitForm};
  }
}
</script>

<template>
  <form @submit.prevent="submitForm">
  <v-text-field v-model="name"></v-text-field>
    <v-text-field v-model="desc"></v-text-field>
  <v-select item-title="name" item-value="id" :items="categories" v-model="category"></v-select>
    <v-btn type="action">Submit</v-btn>
  </form>
</template>

<style scoped>

</style>