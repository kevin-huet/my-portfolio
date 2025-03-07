<template>
  <div class="stripe-section" style="padding-top: 10vh; padding-bottom: 20vh" id="timeline" v-bind="$attrs">
    <v-dialog v-model="timelineModal" max-width="500">
      <v-card>
        <v-card-title class="headline">Timeline</v-card-title>
        <v-card-text>
          <TimelineForm categories="categories"/>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col cols="12">
        <h2 class="white--text text-center">Timeline</h2>
      </v-col>
      <v-col offset="1" cols="10" offset-lg="3" lg="6" class="mb-12">
        <v-divider dark></v-divider>
        <div class="d-flex justify-center mt-6">
          <v-btn dark v-if="isAuthenticated" @click="modalToggle('create')">Create</v-btn>
        </div>
      </v-col>
      <v-col cols="12" offset="0" sm="10" offset-sm="1" lg="8" offset-lg="2">
        <v-timeline dark>
          <v-timeline-item dark
                           v-for="data in timeline"
                           :key="data.id" small
          >
            <v-card class="rounded-ts-xl rounded-be-xl" elevation="2" color="#001220" dark shaped>
              <v-card-title class="text-h5" dark>
                {{ data.startedAt }} - {{ data.endedAt }}
              </v-card-title>
              <v-card-text v-html="data.desc">
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
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>
    <div style="margin-top: 4em">
    </div>
  </div>
</template>

<script lang="ts">

import TimelineForm from "@/components/forms/TimelineForm.vue";
import {onBeforeMount, onMounted, Ref, ref} from "vue";
import Api from '@/services/api';
import {TimelineDto} from "@/dto/timeline-dto";
export default {
  name: 'Timeline',
  components: {TimelineForm},
  props: ['isAuthenticated'],
  setup(props) {
    const isAuthenticated = props.isAuthenticated;
    const timelineModal = ref(false);
    const timeline: Ref<TimelineDto[]> = ref([]);
    const modalAction = ref('create');
    console.log(isAuthenticated);

    const modalToggle = async (action: string) => {
      modalAction.value = action;
      timelineModal.value = !timelineModal.value;
    }

    onMounted(async () => {
      Api.getTimeline().then((r : any) => {
        timeline.value = r.data;
        console.log(timeline);
      });
    });

    return {isAuthenticated, timeline, timelineModal, modalToggle};
  },
}
</script>

<style scoped>

</style>
