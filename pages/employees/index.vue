<script setup>
import { PlusCircleIcon } from "@heroicons/vue/24/outline";

const employees = ref([]);
const searchTerm = ref("");
const searchArchived = ref(false);
const loading = ref(false);
const modalOpen = ref(false);
const modalMode = ref("CREATE")
const currUser = ref();

function openCreateModal() {
  modalMode.value = "CREATE";
  modalOpen.value = true;
  console.log("modal opened in create mode");
}

function openEditModal(user) {
  modalMode.value = "EDIT"
  currUser.value = user;
  modalOpen.value = true;
  console.log("modal opened in edit mode");
}

function closeModal() {
  modalOpen.value = false;
  getEmployees();
  console.log("modal closed");
}

async function getEmployees() {
  loading.value = true;
  const { data } = await useFetch("/api/user/get/employees", {
    query: {
      searchTerm: searchTerm,
      searchArchived: searchArchived,
    },
  });
  employees.value = data._rawValue.body;
  console.log("employees.value", employees.value);
  loading.value = false;
}

watch([searchTerm, searchArchived], () => {
  getEmployees();
});

getEmployees();
</script>

<template>
  <div class="m-3 font-thin text-4xl">Employees</div>
  <div class="md:flex flex-col md:items-center m-10">
    <div class="flex md:w-1/2">
      <button v-on:click="openCreateModal" title="Create Employee">
        <div class="border p-2 rounded hover:border-gray-500 hover:bg-gray-100">
          <PlusCircleIcon class="h-6 w-6" />
        </div>
      </button>
      <InputUser
        :isOpen="modalOpen"
        :mode="modalMode"
        :userType="'EMPLOYEE'"
        :user="currUser"
        @close-modal="closeModal"
      />
      <input
        v-model.trim="searchTerm"
        class="border rounded grow p-2 m-2 shadow text-center hover:border-gray-500 focus:bg-gray-100 outline-none focus:border-gray-700"
        placeholder="Search"
      />
      <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" v-model="searchArchived" class="sr-only peer" />
        <span
          class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 hidden md:block"
          >Search Archived</span
        >
        <div
          class="relative mx-2 w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
        ></div>
      </label>
    </div>
    <UserTable
      :users="employees"
      :userType="'EMPLOYEE'"
      :loading="loading"
      class="md:w-1/2"
      @open-edit-modal="openEditModal"
    />
  </div>
</template>
