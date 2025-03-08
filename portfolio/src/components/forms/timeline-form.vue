<script lang="ts">
import {ref} from "vue";
import {timelineService} from "@/services/timeline.service";

export default {
  name: "TimelineForm",
  props: ['action'],
  setup(props: any) {
    const name = ref("");
    const desc = ref("");
    const startedAt = ref<string | undefined>(undefined);
    const endedAt = ref<string | undefined>(undefined);

    const submitForm =async () => {
      (props.action === 'create') ?
          timelineService.create({
            name: name.value,
            description: desc.value,
            startedAt: startedAt.value,
            endedAt: endedAt.value
          }).then((r: any) => {
            console.log(r)
          }).catch((err: any) => {console.log(err)}) :
          await timelineService.edit(name.value, desc.value, startedAt.value, endedAt.value);
    }

    return {
      name,
      desc,
      startedAt,
      endedAt,
      submitForm
    };
  }
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <v-text-field
        v-model="name"
        :counter="10"
        label="Name"
    ></v-text-field>

    <v-text-field
        v-model="desc"
        :counter="7"
        label="Desc"
    ></v-text-field>

    <v-date-input
        v-model="startedAt"
        label="Select a date"
    />
    <v-date-input
        v-model="endedAt"
        label="Select a date"
    />
    <v-btn
        class="me-4"
        type="submit"
    >
      submit
    </v-btn>
  </form>
</template>

<style scoped>

</style>