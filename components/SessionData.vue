<script setup>
import Checkbox from 'primevue/checkbox';

const props = defineProps({
  //id: Int,  //? needed if saving inside this component
  type: String,
  arrayCount: Number,
  //save: Boolean //? needed if saving inside this component
});

let verifiedCount;
if (props.type == "TRIAL" || props.type == "COUNT") {
  verifiedCount = 1;
}
else{
  verifiedCount = props.arrayCount;
}

const data = ref(Array(verifiedCount));

watch([data], () => {
  // call the save api with current data
});

</script>



<template>
  <div class="relative grid items-center grid-cols-[repeat(auto-fit,minmax(100px,2fr))] bg-gray-300">
  <div v-for="i in verifiedCount" class="flex justify-center">
    <div v-if="type === 'TRIAL' || type === 'TRIAL_ARRAY'">
      <label v-if="verifiedCount==1" class="flex justify-center">Trial</label>
      <label v-else class="flex justify-center">Trial {{ i }}</label>
      <div class="flex justify-center">
        <div class="px-2 scale-125">
          <input
            type="radio"
            title="true"
            value="true"
            v-model="data[i-1]"
          >
        </div>
        <div class="px-2 scale-125">
          <input
            type="radio"
            title="false"
            value="false"
            v-model="data[i-1]"
          >
        </div>
      </div>
    </div>
    <div v-if="type === 'COUNT' || type === 'COUNT_ARRAY'">
      <label v-if="verifiedCount==1" class="flex justify-center">Count</label>
      <label v-else class="flex justify-center">Count {{ i }}</label>
      <input
        v-model.number="data[i-1]"
        class="w-24 text-black text-center"
      >
    </div>
  </div>
  </div>
</template>
