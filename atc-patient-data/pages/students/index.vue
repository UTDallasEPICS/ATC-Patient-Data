<script setup>
import { PlusCircleIcon } from "@heroicons/vue/24/outline";

const students = ref([]);
const searchTerm = ref("");
const searchArchived = ref(false);
const loading = ref(false);
const createUserModalOpen = ref(false);

function openModal() {
  console.log("openModal");
  createUserModalOpen.value = true;
}

function closeModal() {
  createUserModalOpen.value = false;
}

async function getEmployees() {
  loading.value = true;
  const { data } = await useFetch("/api/user/get/employees", {
    query: {
      searchTerm: searchTerm,
      searchArchived: searchArchived,
    },
  });
  students.value = data._rawValue.body;
  console.log("students.value", students.value);
  loading.value = false;
}

watch([searchTerm, searchArchived], () => {
  getEmployees();
});

getEmployees();
</script>

<template>
  <div class="md:flex flex-col md:items-center m-10">
    <div class="flex md:w-1/2">
      <button v-on:click="openModal" title="Create Student">
        <div class="border p-2 rounded hover:border-gray-500 hover:bg-gray-100">
          <PlusCircleIcon class="h-6 w-6" />
        </div>
      </button>
      <CreateUser
        :isOpen="createUserModalOpen"
        :userType="'STUDENT'"
        :closeModal="closeModal"
      />
      <input
        v-model="searchTerm"
        class="border rounded grow p-2 m-2 shadow text-center hover:border-gray-500 focus:bg-gray-100 outline-none focus:border-gray-700"
        placeholder="Search"
      />
      <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" v-model="searchArchived" class="sr-only peer" />
        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
          >Search Archived</span
        >
        <div
          class="relative mx-2 w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
        ></div>
      </label>
    </div>
    <UserTable
      :users="students"
      :userType="'STUDENT'"
      :loading="loading"
      class="md:w-1/2"
    />
  </div>
</template>
