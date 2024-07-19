<script setup>
//Props
const props = defineProps(["user"]);

//Imports
import { PlusCircleIcon } from "@heroicons/vue/24/outline";

//Refs
const searchTerm = ref("");
const searchArchived = ref(false);
const refresh = ref(0);

//Fetch Data
const sessions = await useFetch("/api/session/retrieve", {
  query: {
    userId: props.user.data.value.id,
    searchTerm: searchTerm,
    searchArchived: searchArchived,
  },
});

//Methods
async function createEmptySession() {
  console.log("studentId", props.user.data.value.id);
  console.log("employeeId", useCookie("userId").value);
  console.log("createdAt", new Date().toISOString());
  const res = await $fetch("/api/session/create", {
    method: "POST",
    body: {
      studentId: props.user.data.value.id,
      employeeId: useCookie("userId").value,
      createdAt: new Date().toISOString(),
    },
  });
  console.log("res", res);
  refresh.value++;
}

//Watches
watch([refresh, searchArchived], () => {
  sessions.refresh();
});
</script>

<template>
  <div
    class="flex flex-col md:flex-row p-3 md:justify-center h-full overflow-auto md:space-x-10 md:space-y-0 space-y-5"
  >
    <div class="md:w-1/2 w-full">
      <div class="flex">
        <button v-on:click="createEmptySession" title="Create Session">
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
                Date
              </th>
              <th
                class="px-6 py-3 text-center text-xs font-medium uppercase border"
              >
                Time
              </th>
              <th
                class="px-6 py-3 text-center text-xs font-medium uppercase border"
              >
                Supervising Employee
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="session in sessions.data.value.body"
              :key="session.id"
              class="hover:bg-gray-100 hover:cursor-pointer text-center"
              @click=""
            >
              <td class="px-6 py-4 whitespace-nowrap border">
                <div class="text-sm text-gray-900">
                  {{ session.createdAt.split("T")[0] }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap border">
                <div class="text-sm text-gray-900">
                  {{ session.createdAt.split("T")[1].split(".")[0] }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap border">
                <div class="text-sm text-gray-900">
                  {{ session.Employee.User && session.Employee.User.firstName }}
                  {{ session.Employee.User && session.Employee.User.lastName }}
                </div>
              </td>
            </tr>
            <tr v-if="sessions.data.value.body.length === 0">
              <td
                colspan="3"
                class="px-6 py-4 whitespace-nowrap border text-center"
              >
                <div class="text-sm text-gray-900">
                  No sessions found for
                  {{ props.user.data && props.user.data.value.firstName }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
