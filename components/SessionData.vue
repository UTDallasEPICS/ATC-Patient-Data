<script setup>
import Checkbox from 'primevue/checkbox';

const props = defineProps({
  //id: Int,  //? needed if saving inside this component
  type: String,
  arrayCount: Number,
  //save: Boolean //? needed if saving inside this component
});

const save = ref(0);

let verifiedCount;
if (props.type == "TRIAL" || props.type == "COUNT") {
  verifiedCount = 1;
}
else{
  verifiedCount = props.arrayCount;
}

const data = ref(Array(verifiedCount));

watch([save], () => {
  // call the save api with current data
});

</script>



<template>
  {{ data }}
  <div v-for="i in verifiedCount">
    <div v-if="type === 'TRIAL' || type === 'TRIAL_ARRAY'">
      <label v-if="type === 'TRIAL'">Trial: </label>
      <label v-else>Trial {{ i }}: </label>
      <input
        type="radio"
        title="true"
        value="true"
        v-model="data[i-1]"
      >
      <input
        type="radio"
        title="false"
        value="false"
        v-model="data[i-1]"
      >
    </div>
    <div v-if="type === 'COUNT' || type === 'COUNT_ARRAY'">
      <label v-if="type === 'COUNT'">Count: </label>
      <label v-else>Count {{ i }}: </label>
      <input
        v-model.number="data[i-1]"
      >
    </div>
  </div>
</template>
