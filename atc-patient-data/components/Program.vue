<script setup>
// Define props
const props = defineProps(["user"]);

// Import icons and assets
import {
  XMarkIcon,
  PlusCircleIcon,
  ArrowLongRightIcon,
} from "@heroicons/vue/24/outline";
import BlockShuffle from "../../assets/blocks-shuffle-3.svg";

// Initialize state
const clickedRowId = ref(0);
const loadingBehavior = ref(false);
let selectedBehavior = reactive({ value: {} });
const searchTerm = ref("");
const searchGraduated = ref(false);
const createBehaviorClicked = ref(false);

// Fetch behaviors
const behaviors = await useFetch("/api/behavior/get/plural", {
  query: {
    searchTerm: searchTerm,
    searchGraduated: searchGraduated,
    id: props.user.data.value.id,
  },
});

// Watch for changes
watch([searchTerm, searchGraduated], () => {
  behaviors.refresh();
});

// Event handlers
function handleRowClicked(id) {
  clickedRowId.value = id;
  loadingBehavior.value = true;
  selectedBehavior.value = behaviors.data.value.body.find(
    (behavior) => behavior.id === id
  );
  loadingBehavior.value = false;
}

function clearRowClicked() {
  clickedRowId.value = 0;
}

function handleCreateBehaviorClicked() {
  createBehaviorClicked.value = true;
}

function clearCreateBehaviorClicked() {
  createBehaviorClicked.value = false;
}

// Log output
console.log("props.user", props.user);
console.log("behaviors", behaviors);
console.log("selectedBehavior.value", selectedBehavior.value);
console.log("title", selectedBehavior.value.title);
</script>

<template>
  <div
    class="flex flex-col md:flex-row p-3 md:justify-center h-full overflow-auto md:space-x-10 md:space-y-0 space-y-5"
  >
    <div class="md:w-1/2 w-full">
      <div class="flex">
        <button
          v-on:click="handleCreateBehaviorClicked"
          title="Create Behavior"
        >
          <div
            class="border p-2 rounded hover:border-gray-500 hover:bg-gray-100"
          >
            <PlusCircleIcon class="h-6 w-6" />
          </div>
        </button>
        <input
          v-model.trim="searchTerm"
          class="border rounded grow p-2 m-2 shadow text-center hover:border-gray-500 focus:bg-gray-100 outline-none focus:border-gray-700"
          placeholder="Search"
        />
        <label class="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            v-model="searchGraduated"
            class="sr-only peer"
          />
          <span
            class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 hidden md:block"
            >Search Graduated</span
          >
          <div
            class="relative mx-2 w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
          ></div>
        </label>
      </div>
      <div class="overflow-auto border border-gray-200 rounded-lg">
        <table class="min-w-full divide-y divide-gray-200 border">
          <thead class="bg-gray-300">
            <tr>
              <th
                class="px-6 py-3 text-center text-xs font-medium uppercase border"
              >
                Title
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="behavior in behaviors.data.value.body"
              :key="behavior.id"
              class="hover:bg-gray-100 hover:cursor-pointer text-center"
              @click="handleRowClicked(behavior.id)"
            >
              <td class="px-6 py-4 whitespace-nowrap border">
                <div class="text-sm text-gray-900">
                  {{ behavior.title }}
                </div>
              </td>
            </tr>
            <tr v-if="!behaviors.data.value.body.length">
              <td
                colspan="1"
                class="px-6 py-4 whitespace-nowrap border text-center"
              >
                <div class="text-sm text-gray-900">
                  No behaviors found for
                  {{ props.user.data && props.user.data.value.firstName }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div
      v-if="clickedRowId"
      class="flex flex-col w-full md:w-1/2 border border-gray-900 rounded-lg p-3"
    >
      <div>
        <div class="flex w-full justify-end">
          <button @click="clearRowClicked">
            <div
              class="border p-2 rounded hover:border-gray-500 hover:bg-gray-100"
            >
              <XMarkIcon class="h-6 w-6" />
            </div>
          </button>
        </div>
        <div class="flex justify-center text-xl">
          {{ selectedBehavior.value && selectedBehavior.value.title }}
        </div>
        <table class="table-auto w-full mt-5">
          <tbody>
            <tr>
              <td class="font-bold w-1/5">Type</td>
              <td>
                {{ selectedBehavior.value && selectedBehavior.value.type }}
              </td>
            </tr>
            <tr>
              <td class="font-bold w-1/5">Description</td>
              <td>
                {{ selectedBehavior.value && selectedBehavior.value.desc }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="loadingBehavior" class="flex items-center justify-center">
        <BlockShuffle />
      </div>
    </div>
    <div
      v-if="createBehaviorClicked"
      class="flex flex-col w-full md:w-1/2 border border-gray-900 rounded-lg p-3"
    >
      <div>
        <div class="flex w-full justify-end">
          <button @click="clearCreateBehaviorClicked">
            <div
              class="border p-2 rounded hover:border-gray-500 hover:bg-gray-100"
            >
              <XMarkIcon class="h-6 w-6" />
            </div>
          </button>
        </div>
        <div class="flex justify-center text-xl">Choose Template</div>
        <div class="flex justify-end mt-3">
          <button class="border flex space-x-1 p-1 rounded-lg text-gray-600 hover:border-gray-900 hover:text-gray-900">
            <span class="">create a new behavior</span>
            <span class=""><ArrowLongRightIcon class="h-6 w-6" /></span>
          </button>
        </div>
        <table class="table-auto w-full mt-5">
          <!-- <tbody>
            <tr>
              <td class="font-bold w-1/5">Type</td>
              <td>
                {{ selectedBehavior.value && selectedBehavior.value.type }}
              </td>
            </tr>
            <tr>
              <td class="font-bold w-1/5">Description</td>
              <td>
                {{ selectedBehavior.value && selectedBehavior.value.desc }}
              </td>
            </tr>
          </tbody> -->
        </table>
      </div>
      <!-- <div v-if="loadingBehavior" class="flex items-center justify-center">
        <BlockShuffle />
      </div> -->
    </div>
  </div>
</template>
