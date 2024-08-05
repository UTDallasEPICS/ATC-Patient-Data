<script setup>
import { computed, defineProps, ref, watch } from "vue";

const props = defineProps({
  sessionID: Number,
  behaviorID: Number,
  type: String,
  arrayCount: Number,
  submitted: Boolean,
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
  <div class="grid grid-cols-3 gap-3">
    <div
      v-for="i in verifiedCount"
      :key="i"
      class="flex items-center justify-center border-2 rounded border-gray-200 bg-gray-900 p-2"
    >
      <div v-if="type.includes('TRIAL')" class="space-y-1">
        <label class="text-center font-medium">
          {{ verifiedCount === 1 ? "Trial" : `Trial ${i}` }}
        </label>
        <div class="space-x-5">
          <input
            type="radio"
            title="true"
            value="true"
            :disabled="submitted"
            v-model="data[i - 1]"
            class="scale-150"
          />
          <input
            type="radio"
            title="false"
            value="false"
            :disabled="submitted"
            v-model="data[i - 1]"
            class="scale-150"
          />
        </div>
      </div>
      <div v-if="type.includes('COUNT')" class="space-y-1">
        <div class="text-center">
        <label class="font-medium">
          {{ verifiedCount === 1 ? "Count" : `Count ${i}` }}
        </label>
        </div>
        <div>
        <input
          type="number"
          :disabled="submitted"
          v-model.number="data[i - 1]"
          class="w-24 text-black text-center border-2 border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:bg-blue-100 rounded p-1 outline-none [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]"
        />
        </div>
      </div>
    </div>
  </div>
</template>
