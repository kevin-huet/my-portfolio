<template>
  <div class="home-section" style="padding-top: 10vh; padding-bottom: 10vh" id="skills">
    <v-dialog v-model="skillModal" max-width="500">
      <v-card>
        <v-card-title class="headline">Timeline</v-card-title>
        <v-card-text>
          <SkillForm v-if="formTarget === 'skill'" :categories="categories" :action="modalAction"/>
          <CategoryForm v-if="formTarget === 'category'"/>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col cols="12">
        <h2 class="white--text text-center">Skills</h2>
      </v-col>
      <v-col offset="1" offset-lg="3" cols="10" lg="6">
        <v-divider dark></v-divider>
        <div class="d-flex justify-center mt-6">
          <v-btn dark v-if="isAuthenticated" @click="modalToggle('create')" class="mr-2" variant="flat" color="#5C4FCC">Create Skill</v-btn>
          <v-btn dark v-if="isAuthenticated" @click="modalToggle('create', 'category')" variant="flat" color="#5C4FCC">Create Category</v-btn>

        </div>
      </v-col>

      <template v-for="(skill, index) in skills" :key="index">
        <v-col
            v-if="index % 2 === 0"
            cols="4" offset="4" md="3" lg="2"
            :offset-md="index % 2 === 0 ? 1 : 0"
            :offset-lg="index % 2 === 0 ? 3 : 0"
        >
          <BlobImage>
            <image :href="images[index % images.length]" height="200" width="100%"/>
          </BlobImage>
        </v-col>

        <v-col
            cols="10" md="7" lg="4"
            :offset="index % 2 !== 0 ? 1 : 0"
            :offset-lg="index % 2 !== 0 ? 3 : 0"
            class="mt-6"
        >
          <v-card dark color="#001d33" elevation="1" class="rounded-ts-xl rounded-be-xl">
            <v-card-title class="text-center">
              <v-spacer></v-spacer>
              <h5>{{ skill.name }}</h5>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-divider dark></v-divider>
            <v-card-text class="text-center">
              <p style="font-size: 15px">{{ skill.description }}</p>
            </v-card-text>
            <v-card-actions v-if="isAuthenticated">
              <v-spacer></v-spacer>
              <v-btn icon="mdi-pencil" size="small" @click="modalToggle('edit')"></v-btn>
              <v-btn icon="mdi-delete" size="small"></v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col
            v-if="index % 2 !== 0"
            cols="4" offset="4" md="3" lg="2"
            :offset-md="index % 2 !== 0 ? 0 : 0"
            :offset-lg="index % 2 !== 0 ? 0 : 0"
        >
          <BlobImage>
            <image :href="images[index % images.length]" height="200" width="95%"/>
          </BlobImage>
        </v-col>
      </template>
    </v-row>
  </div>
</template>

<script lang="ts">

import BlobImage from "../blob-image.vue";
import {onMounted, ref, Ref} from "vue";
import TimelineForm from "@/components/forms/timeline-form.vue";
import SkillForm from "@/components/forms/skill-form.vue";
import CategoryForm from "@/components/forms/category-form.vue";
import {skillService} from "@/services/skill.service";
import {SkillDto} from "@/dto/skill.dto";
export default {
  name: 'Skills',
  components: {CategoryForm, SkillForm, TimelineForm, BlobImage },
  props: ['isAuthenticated'],
  setup(props: any) {
    const skillModal = ref(false);
    const categories: Ref<any[]> = ref([]);
    const skills: Ref<SkillDto[]> = ref([]);
    const modalAction = ref('create');
    const formTarget = ref('skill');
    const images = [
        '/assets/images/js.webp',
        '/assets/images/language.webp',
        '/assets/images/db.webp',
        '/assets/images/computer.webp'
    ];
    const modalToggle = (action: string, target: string = 'skill') => {
      modalAction.value = action;
      skillModal.value = !skillModal.value;
      formTarget.value = target;
    };

    const deleteSkill = (uuid: string) => {
      skillService.delete(uuid).then(() => {
        skills.value = skills.value.filter(item => item.id !== uuid)
      }).catch();
    };

    onMounted(() => {
      skillService.getAll().then((r: any) => {
        skills.value = r.data
        console.log(skills)
      }).catch(() => {})
      skillService.getAllCategories().then((r: any) => {
        categories.value = r.data
        console.log(categories)
      }).catch(() => {})
    });

    return {categories, skills, skillModal, modalAction, formTarget, modalToggle, deleteSkill, images};
  },
  methods: {
    changePage (args: any) {
      (args.action === 'next') ? this.$emit('next-page', args.value)
        : this.$emit('previous-page', args.value)
    }
  }
}
</script>

<style scoped>

</style>
