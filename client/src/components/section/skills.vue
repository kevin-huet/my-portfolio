<template>
  <div class="skill-section" style="padding-top: 10vh; padding-bottom: 10vh" id="skills">
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
      <v-col order="1" order-md="1" cols="4" offset="4" md="3" lg="2" offset-md="1" offset-lg="3">
        <BlobImage>
          <image href="/assets/images/js.webp" height="200" width="100%"/>
        </BlobImage>
      </v-col>
      <v-col order="2" order-md="2" cols="10" md="7" lg="4" offset="1" offset-lg="0" offset-md="0" class="mt-6">
        <v-card dark color="#001d33"
                elevation="1"
                class="rounded-ts-xl rounded-be-xl">
          <v-card-title  class="text-center">
            <v-spacer></v-spacer>
            <h5>Langages</h5>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-divider dark></v-divider>
          <v-card-text  class="text-center">
            <p style="font-size: 15px">
              Php, Javascript, C, C++, Java, HTML, CSS, Python, SQL
            </p>
          </v-card-text>
          <v-card-actions v-if="isAuthenticated">
            <v-spacer></v-spacer>

            <v-btn
                icon="mdi-pencil"
                size="small"
                @click="modalToggle('edit')"
            ></v-btn>

            <v-btn
                icon="mdi-delete"
                size="small"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col order="4" order-md="3" cols="10" offset="1" md="7" lg="4" offset-lg="3" class="mt-6">
        <v-card dark color="#001d33"
                elevation="1"
                class="rounded-ts-xl rounded-be-xl">
          <v-card-title  class="text-center">
            <v-spacer></v-spacer>
            <h5>Librairies, Framework and Engines</h5>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-divider dark></v-divider>
          <v-card-text class="text-center">
            <p style="font-size: 15px">
              Symfony, Electron, NodeJS, ExpressJS, JavaEE, Flask
              CSFML, SFML, Godot Game Engine
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col order="3" order-md="4" cols="4" offset="4" md="3" lg="2" offset-md="0" offset-lg="0">
        <BlobImage>
          <image href="/assets/images/language.webp" height="200" width="100%"/>
        </BlobImage>
      </v-col>

      <v-col order="5" order-md="5" cols="4" offset="4" md="3" lg="2" offset-md="1" offset-lg="3">
        <BlobImage>
          <image href="/assets/images/db.webp" height="200" width="95%"/>
        </BlobImage>
      </v-col>
      <v-col order="6" order-md="6" cols="10" md="7" lg="4" offset="1" offset-md="0" offset-lg="0" class="mt-6">
        <v-card dark color="#001d33"
                elevation="1"
                class="rounded-ts-xl rounded-be-xl">
          <v-card-title  class="text-center">
            <v-spacer></v-spacer>
            <h5>Databases</h5>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-divider dark></v-divider>
          <v-card-text class="text-center">
            <p style="font-size: 15px">
              MongoDB, MariaDB, MySQL, PostgreSQL
            </p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col order="8" order-md="7" cols="10" offset="1" md="7" lg="4" offset-lg="3" class="mt-6">
        <v-card dark color="#001d33"
                elevation="1"
                class="rounded-ts-xl rounded-be-xl">
          <v-card-title class="text-center">
            <h5>Systems and sofwares</h5>
          </v-card-title>
          <v-divider dark></v-divider>
          <v-card-text class="text-center">
            <p style="font-size: 15px">
              UNIX Systems, Windows, MacOSX, Git, Docker, PM2, Photoshop, Clip Studio Paint
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col order="7" order-md="8" cols="4" offset="4" md="3" lg="2" offset-md="0" offset-lg="0">
        <BlobImage>
          <image href="/assets/images/computer.webp" height="200" width="95%"/>
        </BlobImage>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">

import BlobImage from "./BlobImage.vue";
import {onMounted, ref, Ref} from "vue";
import Api from "@/services/api";
import TimelineForm from "@/components/forms/TimelineForm.vue";
import SkillForm from "@/components/forms/SkillForm.vue";
import CategoryForm from "@/components/forms/CategoryForm.vue";
export default {
  name: 'Skills',
  components: {CategoryForm, SkillForm, TimelineForm, BlobImage },
  props: ['isAuthenticated'],
  setup(props: any) {
    const skillModal = ref(false);
    const categories: Ref<any[]> = ref([]);
    const skills: Ref<any[]> = ref([]);
    const modalAction = ref('create');
    const formTarget = ref('skill');

    const modalToggle = (action: string, target: string = 'skill') => {
      modalAction.value = action;
      skillModal.value = !skillModal.value;
      formTarget.value = target;
    };

    onMounted(() => {
      Api.getSkills().then((r: any) => {
        skills.value = r.data
        console.log(skills)
      }).catch(() => {})
      Api.getCategories().then((r: any) => {
        categories.value = r.data
        console.log(categories)
      }).catch(() => {})
    });

    return {categories, skills, skillModal, modalAction, formTarget, modalToggle};
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
