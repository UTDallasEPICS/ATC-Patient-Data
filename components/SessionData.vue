<script setup>
import { computed, defineProps, ref, watch } from "vue";

const props = defineProps({
  sessionID: Number,
  behaviorID: Number,
  type: String,
  arrayCount: Number,
  doSave: Number,
});

const emit = defineEmits(["saveData"]);

const isTrialOrCount = props.type === "TRIAL" || props.type === "COUNT";
const verifiedCount = isTrialOrCount ? 1 : props.arrayCount;

const data = ref(Array(verifiedCount).fill(""));

const dataString = computed(() => data.value.join(","));

const behaviorDataObject = await useFetch("/api/behavior-data/receive", {
  query: {
    sessionID: props.sessionID,
    behaviorID: props.behaviorID,
  },
});

const dataStringArray =
  behaviorDataObject &&
  behaviorDataObject.data &&
  behaviorDataObject.data.value &&
  behaviorDataObject.data.value.body &&
  behaviorDataObject.data.value.body.length > 0
    ? behaviorDataObject.data.value.body[0].data.split(",")
    : null;

if (dataStringArray !== null) {
  for (let i = 0; i < dataStringArray.length; i++) {
    if (dataStringArray[i] !== "") {
      data.value[i] = dataStringArray[i];
    }
  }
}

watch(props, () => {
  emit("saveData", dataString.value);
});

watch(dataString, () => {
  emit("saveData", dataString.value);
});
</script>

<template>
  <div class="flex flex-col space-y-2">
    <div
      v-for="i in verifiedCount"
      :key="i"
      class="flex items-center justify-center"
    >
      <div v-if="type.includes('TRIAL')" class="space-y-2">
        <label class="text-center font-medium">
          {{ verifiedCount === 1 ? "Trial" : `Trial ${i}` }}
        </label>
        <div class="flex justify-center space-x-2">
          <input
            type="radio"
            title="true"
            value="true"
            v-model="data[i - 1]"
            class="scale-125"
          />
          <input
            type="radio"
            title="false"
            value="false"
            v-model="data[i - 1]"
            class="scale-125"
          />
        </div>
      </div>
      <div v-if="type.includes('COUNT')" class="space-y-2">
        <label class="text-center font-medium">
          {{ verifiedCount === 1 ? "Count" : `Count ${i}` }}
        </label>
        <input
          v-model.number="data[i - 1]"
          class="w-24 text-black text-center border rounded p-1"
        />
      </div>
    </div>
  </div>
</template>
