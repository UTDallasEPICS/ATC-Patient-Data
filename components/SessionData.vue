<script setup>
import { computed, defineProps, ref, watch } from "vue";

const props = defineProps({
  type: String,
  arrayCount: Number,
});

const verifiedCount =
  props.type === "TRIAL" || props.type === "COUNT" ? 1 : props.arrayCount;

const data = ref(Array(verifiedCount).fill(""));

const dataString = computed(() => data.value.join(","));

watch(verifiedCount, () => {
  console.log("Data String:", dataString.value);
});
</script>

<template>
  <div class="flex flex-col space-y-2">
    <div
      v-for="i in verifiedCount"
      :key="i"
      class="flex items-center justify-center"
    >
      <div v-if="type === 'TRIAL' || type === 'TRIAL_ARRAY'" class="space-y-2">
        <label v-if="verifiedCount === 1" class="text-center font-medium"
          >Trial</label
        >
        <label v-else class="text-center font-medium">Trial {{ i }}</label>
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
      <div v-if="type === 'COUNT' || type === 'COUNT_ARRAY'" class="space-y-2">
        <label v-if="verifiedCount === 1" class="text-center font-medium"
          >Count</label
        >
        <label v-else class="text-center font-medium">Count {{ i }}</label>
        <input
          v-model.number="data[i - 1]"
          class="w-24 text-black text-center border rounded p-1"
        />
      </div>
    </div>
  </div>
</template>
