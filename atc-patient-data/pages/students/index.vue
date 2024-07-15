<script setup>
import { PlusCircleIcon } from "@heroicons/vue/24/outline";

// const employeeId = ref(3);
// const employeeRole = "Admin"; // update to get if the users is admin - TESTING - TESTING - TESTING

// const searchArchive = ref(false);
const students = ref([]);
const searchTerm = ref("");
const searchArchived = ref(false);

// const studentId = ref("");
// const studentFirst = ref("");
// const studentLast = ref("");

// const { data: idUser } = await useFetch("/api/user/StudentSearchId", {
//   query: {
//     studentId: studentId,
//     employeeId: employeeId,
//     employeeRole: employeeRole,
//     searchArchive: searchArchive,
//   },
// });
// const { data: nameUsers } = await useFetch("/api/user/StudentSearchName", {
//   query: {
//     studentFirst: studentFirst,
//     studentLast: studentLast,
//     employeeId: employeeId,
//     employeeRole: employeeRole,
//     searchArchive: searchArchive,
//   },
// });
// const { data: allUsers } = await useFetch("/api/user/StudentSearchAll", {
//   query: {
//     employeeId: employeeId,
//     employeeRole: employeeRole,
//     searchArchive: searchArchive,
//   },
// });

async function getEmployees() {
  const { data } = await useFetch("/api/user/get/employees", {
    query: {
      searchTerm: searchTerm,
      searchArchived: searchArchived,
    },
  });
  students.value = data._rawValue.body;
  console.log("students.value", students);
}

// function searchArchiveClick() {
//   if (this.searchArchive == false) {
//     this.searchArchive = true;
//   } else {
//     this.searchArchive = false;
//   }
// }

// function createStudentClick() {
//   window.location.href = "http://localhost:3000/students"; // update to go to create student - TESTING - TESTING - TESTING
// }

// function viewStudentClick(id) {
//   window.location.href = "http://localhost:3000/students?" + id; // update to go to selected student - TESTING - TESTING - TESTING
// }

watch(searchTerm, () => {
  getEmployees();
});

watch(searchArchived, () => {
  getEmployees();
  console.log("searchArchived", searchArchived.value);
});
getEmployees();
</script>

<template>
  <!-- <div class="bg-gray-700 flex space-x-10">fadf</div> -->
  <div class="md:flex flex-col md:items-center m-10">
    <div class="flex md:w-1/2">
      <button title="Create Student">
        <div class="border p-2 rounded hover:border-gray-500 hover:bg-gray-100">
          <PlusCircleIcon class="h-6 w-6" />
        </div>
      </button>
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
    <UserTable :users="students" :userType="'STUDENT'" class="md:w-1/2" />
  </div>
  <!--
  <div>
    <button title="Search Archived?" @click="searchArchiveClick()">
      <div v-if="searchArchive == false">Search Archived?</div>
      <div v-else>Don't Search Archived?</div>
    </button>
  </div> -->

  <!-- create user student button -->
  <!-- <div v-if="employeeRole == 'Admin'">
    <button title="Create Student" @click="createStudentClick()">
      Create Student
    </button>
  </div> -->

  <!-- search by id -->
  <!-- <div v-if="studentFirst == '' && studentLast == ''"> -->
  <!-- form -->
  <!-- <form class="search-form">
      <h3>Search Students by ID</h3>

      <input v-model.trim="studentId" placeholder="ID" />

      <button title="Search">
          Search
        </button>
    </form> -->

  <!-- StudentSearchId api -->

  <!-- display result (button) -->
  <!-- <div class="search-results" v-if="studentId !== ''">
      <button title="Select Student" @click="viewStudentClick(idUser.id)">
        {{ idUser.id }} {{ idUser.firstName }} {{ idUser.lastName }}
        {{ user.StudentProfile.Sessions }} display num essions?
      </button>
    </div>
  </div> -->

  <!-- search by name -->
  <!-- <div v-if="studentId == ''"> -->
  <!-- form -->
  <!-- <form class="search-form">
      <h3>Search Students by Name</h3>

      <input v-model.trim="studentFirst" placeholder="First Name" />

      <input v-model.trim="studentLast" placeholder="Last Name" />

      <button title="Search">
          Search
        </button>
    </form> -->

  <!-- StudentSearchName api -->

  <!-- display result (button) -->
  <!-- <div
      class="search-results"
      v-if="studentFirst !== '' || studentLast !== ''"
    >
      <ul>
        <li v-for="user in nameUsers" :key="user.id">
          <button title="Select Student" @click="viewStudentClick(user.id)">
            {{ user.id }} {{ user.firstName }} {{ user.lastName }}
            {{ user.StudentProfile.Sessions }} display num essions?
          </button>
        </li>
      </ul>
    </div>
  </div> -->

  <!-- display all users
  <div v-if="studentId == '' && studentFirst == '' && studentLast == ''">
    <h3>All Students</h3>
    StudentSearchAll api
    display result (button)
    <div class="search-results">
      <ul>
        <li v-for="user in allUsers" :key="user.id">
          <button title="Select Student" @click="viewStudentClick(user.id)">
            {{ user.id }} {{ user.firstName }} {{ user.lastName }}
            {{ user.StudentProfile.Sessions }} display num essions?
          </button>
        </li>
      </ul>
    </div>
  </div> -->
</template>
