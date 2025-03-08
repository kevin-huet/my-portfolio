<template>
  <div class="home-section" style="padding-top: 10vh; padding-bottom: 10vh" id="skills">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2 class="white--text text-center">Projects</h2>
        </v-col>
        <v-col offset="1" cols="10" offset-lg="3" lg="6" class="mb-12">
          <v-divider dark></v-divider>
          <div class="d-flex justify-center mt-6">
            <v-btn dark v-if="isAuthenticated">Create</v-btn>
          </div>
        </v-col>
        <v-col v-for="project in projects" :key="project.id"
               cols="12" sm="12" md="6" lg="6" class="mt-6">
          <v-card dark color="#001d33"
                  elevation="1"
                  class="rounded-ts-xl rounded-be-xl">
            <v-card-title class="text-center">
              <h5>{{ project.name }}</h5>
            </v-card-title>
            <v-divider dark/>
            <v-card-text class="text-center overflow-y-auto" style="height: 110px">
              <p style="font-size: 15px; padding-bottom: 1em">
                {{ project.description }}
              </p>
            </v-card-text>
            <v-card-text class="text-center  overflow-y-auto">
              <v-divider dark/>
              <p style="padding-top: 1em">
                <template v-for="(techno, index) in project?.technologies" :key="index">{{ techno + ', ' }}</template>
              </p>
            </v-card-text>

            <v-card-actions v-if="isAuthenticated">
              <v-spacer></v-spacer>

              <v-btn
                  icon="mdi-pencil"
                  size="small"
              ></v-btn>

              <v-btn
                  icon="mdi-delete"
                  size="small"
                  @click="deleteProject(project.id)"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import {projectService} from "@/services/project.service";
import {onMounted, ref} from "vue";
import {ProjectDto} from "@/dto/project.dto";

export default {
  name: 'Projects',
  props: ['isAuthenticated'],
  setup(props) {
    const projects = ref<ProjectDto[]>([]);
    const deleteProject = (uuid?: string) => {
      if (uuid) {
        projectService.delete(uuid).then(() => {
          projects.value = projects.value.filter((item) => item.id !== uuid);
        }).catch();
      }
    };

    onMounted(() => {
      projectService.getAll().then((r: any) => {
        console.log(r.data);
        projects.value = r.data ? r.data : [];
      }).catch();
    });
    return { deleteProject, projects };
  },
}
</script>

<style scoped>

</style>