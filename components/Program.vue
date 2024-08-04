<script setup>
// Define props
const props = defineProps(["user"]);

// Import icons and assets
import {
  XMarkIcon,
  PlusCircleIcon,
  ArrowLongRightIcon,
  ArrowLeftIcon,
  CheckIcon,
  ChevronUpDownIcon,
} from "@heroicons/vue/24/outline";
import BlockShuffle from "../../assets/blocks-shuffle-3.svg";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

// Initialize state
const clickedRowId = ref(0);
const loadingBehavior = ref(false);
let selectedBehavior = reactive({ value: {} });
const searchBehaviors = ref("");
const searchBehaviorTemplates = ref("");
const searchGraduated = ref(false);
const searchArchived = ref(false);
const createBehaviorClicked = ref(false);
const createNewBehaviorNotClicked = ref(true);
const behaviorTypes = [
  { id: "TRIAL", name: "Trial" },
  { id: "COUNT", name: "Count" },
  { id: "TRIAL_ARRAY", name: "Trial Array" },
  { id: "COUNT_ARRAY", name: "Count Array" },
];
const makeIntoTemplateToo = ref(false);
const createBehaviorFormData = ref({
  title: "",
  desc: "",
  type: behaviorTypes[0],
  arrayCount: 0,
  studentId: props.user.data.value.id,
  makeIntoTemplateToo: makeIntoTemplateToo.value,
});

// Fetch Data
const behaviors = await useFetch("/api/behavior/get/plural", {
  query: {
    searchTerm: searchBehaviors,
    searchGraduated: searchGraduated,
    id: props.user.data.value.id,
  },
});

const behaviorTemplates = await useFetch("/api/behavior-template/plural", {
  query: {
    searchTerm: searchBehaviorTemplates,
    searchArchived: searchArchived,
  },
});

console.log("behaviorTemplates.data.value", behaviorTemplates.data.value);

// Watch for changes
watch([searchBehaviors, searchGraduated], () => {
  behaviors.refresh();
});

watch([searchBehaviorTemplates, searchArchived], () => {
  behaviorTemplates.refresh();
  console.log("behaviorTemplates.data look here", behaviorTemplates.data);
});

watch(createBehaviorFormData.value, () => {
  console.log("createBehaviorFormData.value", createBehaviorFormData.value);
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

function handleCreateNewBehaviorNotClicked() {
  createNewBehaviorNotClicked.value = false;
}

function clearCreateNewBehaviorNotClicked() {
  createNewBehaviorNotClicked.value = true;
  createBehaviorFormData.value = {
    title: "",
    desc: "",
    type: behaviorTypes[0],
    arrayCount: 0,
    studentId: props.user.data.value.id,
    makeIntoTemplateToo: false,
  };
}

async function submitNewBehavior() {
  console.log("createBehaviorFormData.value", createBehaviorFormData.value);
  await $fetch("/api/behavior/post/singular", {
    method: "POST",
    body: createBehaviorFormData.value,
  });
  clearCreateNewBehaviorNotClicked();
  behaviors.refresh();
  behaviorTemplates.refresh();
}

function editTemplate(id) {
  console.log("editTemplate id", id);
  const currTemplate = behaviorTemplates.data.value.body.find(
    (template) => template.id === id
  );
  console.log("currTemplate", currTemplate);
  createBehaviorFormData.value = {
    title: currTemplate.title,
    desc: currTemplate.desc,
    type: behaviorTypes.find((type) => {
      if (type.id === currTemplate.type) {
        // console.log("type", type);
        return type;
      }
    }),
    arrayCount: currTemplate.arrayCount,
    studentId: props.user.data.value.id,
    makeIntoTemplateToo: false,
  };
  console.log(
    "createBehaviorFormData.value after template click",
    createBehaviorFormData.value
  );
  createNewBehaviorNotClicked.value = false;
}

function isTypeArray(typeId) {
  if (typeId === "TRIAL_ARRAY" || typeId === "COUNT_ARRAY") {
    return true;
  }
  return false;
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
          v-model.trim="searchBehaviors"
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
                Behaviors
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
              <td class="font-bold w-1/5">Count</td>
              <td>
                {{
                  selectedBehavior.value && selectedBehavior.value.arrayCount
                }}
              </td>
            </tr>
            <tr>
              <td class="font-bold w-1/5">Description</td>
              <td>
                {{ selectedBehavior.value && selectedBehavior.value.desc }}
              </td>
            </tr>
            <tr>
              <td>graduate</td>
              <td>archive</td>
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
        <div v-if="createNewBehaviorNotClicked">
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
            <button
              class="border flex space-x-1 p-1 rounded-lg text-gray-600 hover:border-gray-900 hover:text-gray-900"
              @click="handleCreateNewBehaviorNotClicked"
            >
              <span class="">create a new behavior</span>
              <span class=""><ArrowLongRightIcon class="h-6 w-6" /></span>
            </button>
          </div>
          <div class="flex mt-10">
            <input
              v-model.trim="searchBehaviorTemplates"
              class="border rounded grow p-2 m-2 shadow text-center hover:border-gray-500 focus:bg-gray-100 outline-none focus:border-gray-700"
              placeholder="Search"
            />
            <label class="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                v-model="searchArchived"
                class="sr-only peer"
              />
              <span
                class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 hidden md:block"
                >Search Archived</span
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
                    Templates
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="template in behaviorTemplates.data.value.body"
                  :key="template.id"
                  class="hover:bg-gray-100 hover:cursor-pointer text-center"
                  @click="editTemplate(template.id)"
                >
                  <td class="px-6 py-4 whitespace-nowrap border">
                    <div class="text-sm text-gray-900">
                      {{ template.title }}
                    </div>
                  </td>
                </tr>
                <tr v-if="behaviorTemplates.data.value.body.length === 0">
                  <td
                    colspan="1"
                    class="px-6 py-4 whitespace-nowrap border text-center"
                  >
                    <div class="text-sm text-gray-900">
                      No behavior templates found
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-if="!createNewBehaviorNotClicked">
          <div class="flex w-full justify-start">
            <button @click="clearCreateNewBehaviorNotClicked">
              <div
                class="border p-2 rounded hover:border-gray-500 hover:bg-gray-100"
              >
                <ArrowLeftIcon class="h-6 w-6" />
              </div>
            </button>
          </div>
          <div class="flex justify-center text-xl">Create Behavior</div>
          <div class="flex justify-center">
            <form class="m-3 w-3/4">
              <div class="flex flex-col m-3">
                <label>Title</label>
                <input
                  v-model="createBehaviorFormData.title"
                  type="text"
                  class="outline-none border rounded p-1 hover:border-blue-300 focus:border-blue-500 focus:border-2 focus:bg-blue-100"
                />
              </div>
              <div class="flex flex-col m-3">
                <label>Description</label>
                <textarea
                  v-model="createBehaviorFormData.desc"
                  type="text"
                  class="outline-none border rounded p-1 hover:border-blue-300 focus:border-blue-500 focus:border-2 focus:bg-blue-100"
                />
              </div>
              <div class="flex flex-col m-3">
                <label>Type</label>
                <Listbox v-model="createBehaviorFormData.type">
                  <div class="relative">
                    <ListboxButton
                      class="outline-none relative w-full cursor-pointer rounded p-1 text-left border hover:border-blue-300 focus:border-blue-500 focus:border-2 focus:bg-blue-100"
                    >
                      <span class="block truncate">{{
                        createBehaviorFormData &&
                        createBehaviorFormData.type.name
                      }}</span>
                      <span
                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                      >
                        <ChevronUpDownIcon
                          class="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </ListboxButton>
                    <transition
                      leave-active-class="transition duration-100 ease-in"
                      leave-from-class="opacity-100"
                      leave-to-class="opacity-0"
                    >
                      <ListboxOptions
                        class="absolute p-1 w-full overflow-auto rounded bg-gray-100 z-10"
                      >
                        <ListboxOption
                          v-slot="{ active, selected }"
                          v-for="type in behaviorTypes"
                          :key="type.id"
                          :value="type"
                          as="template"
                        >
                          <li
                            :class="[
                              active
                                ? 'bg-blue-100 text-blue-900'
                                : 'text-gray-900',
                              'relative cursor-pointer select-none py-2 pl-10 pr-4',
                            ]"
                          >
                            <span
                              :class="[
                                selected ? 'font-medium' : 'font-normal',
                                'block truncate',
                              ]"
                              >{{ type.name }}</span
                            >
                            <span
                              v-if="selected"
                              class="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600"
                            >
                              <CheckIcon class="h-5 w-5" aria-hidden="true" />
                            </span>
                          </li>
                        </ListboxOption>
                      </ListboxOptions>
                    </transition>
                  </div>
                </Listbox>
              </div>
              <div
                class="flex flex-col m-3"
                v-if="isTypeArray(createBehaviorFormData.type.id)"
              >
                <label>Count</label>
                <input
                  v-model="createBehaviorFormData.arrayCount"
                  type="number"
                  class="outline-none border rounded p-1 hover:border-blue-300 focus:border-blue-500 focus:border-2 focus:bg-blue-100"
                />
              </div>
              <div class="flex w-full p-3 justify-between">
                <label class="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    v-model="createBehaviorFormData.makeIntoTemplateToo"
                    class="sr-only peer"
                  />
                  <span
                    class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 hidden md:block"
                    >Make into Template</span
                  >
                  <span
                    class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 block md:hidden"
                    >Template</span
                  >
                  <div
                    class="relative mx-2 w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                  ></div>
                </label>
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                  @click="submitNewBehavior"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
