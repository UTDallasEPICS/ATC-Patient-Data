<script setup>
const props = defineProps(["user"]);
console.log("props.user", props.user);

import { PlusCircleIcon } from "@heroicons/vue/24/outline";
const searchTerm = ref("");
const searchGraduated = ref(false);
const behaviors = await useFetch("/api/behavior/get/plural", {
  query: {
    searchTerm: searchTerm,
    searchGraduated: searchGraduated,
    id: props.user.data.value.id,
  },
});
console.log("behaviors", behaviors);

watch([searchTerm, searchGraduated], () => {
  behaviors.refresh();
});

</script>

<template>
  <div class="md:flex flex-col md:items-center m-10">
    <div class="flex md:w-1/2">
      <button v-on:click="" title="Create Behavior">
        <div class="border p-2 rounded hover:border-gray-500 hover:bg-gray-100">
          <PlusCircleIcon class="h-6 w-6" />
        </div>
      </button>
      <input
        v-model.trim="searchTerm"
        class="border rounded grow p-2 m-2 shadow text-center hover:border-gray-500 focus:bg-gray-100 outline-none focus:border-gray-700"
        placeholder="Search"
      />
      <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" v-model="searchGraduated" class="sr-only peer" />
        <span
          class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 hidden md:block"
          >Search Graduated</span
        >
        <div
          class="relative mx-2 w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
        ></div>
      </label>
    </div>
    <div
      class="flex flex-col text-center border border-gray-500 rounded-lg bg-red-200"
    >
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200 border">
              <thead class="bg-gray-300">
                <tr>
                  <th
                    class="px-6 py-3 text-center text-xs font-medium uppercase border w-2/3"
                  >
                    Title
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="behavior in behaviors.data.value.body"
                  :key="behavior.id"
                  class="hover:bg-gray-100 hover:cursor-pointer"
                >
                  <td class="px-6 py-4 whitespace-nowrap border">
                    <div class="text-sm text-gray-900">
                      {{ behavior.title }}
                    </div>
                  </td>
                </tr>
                <tr v-if="!behaviors.data.value.body.length">
                  <td colspan="1" class="px-6 py-4 whitespace-nowrap border">
                    <div class="text-sm text-gray-900">No behaviors found</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
