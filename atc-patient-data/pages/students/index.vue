<script setup>

const employeeId = ref(3); // probably doesn't need to be a ref, should just get assigned when user hits page
const employeeRole = 'Admin'; // update to get if the users is admin - TESTING - TESTING - TESTING

const searchArchive = ref(false);

const studentId = ref('');
const studentFirst = ref('');
const studentLast = ref('');

const { data: idUser } = await useFetch('/api/user/StudentSearchId', { 
query: { 
  studentId: studentId, employeeId: employeeId,
  employeeRole: employeeRole, searchArchive: searchArchive,
}});
const { data: nameUsers } = await useFetch('/api/user/StudentSearchName', { 
query: { 
  studentFirst: studentFirst, studentLast: studentLast, employeeId: employeeId,
  employeeRole: employeeRole, searchArchive: searchArchive,
}});
const { data: allUsers } = await useFetch('/api/user/StudentSearchAll', { 
query: { 
  employeeId: employeeId, 
  employeeRole: employeeRole, searchArchive: searchArchive,
}}); 

function searchArchiveClick() { 
  if (this.searchArchive==false) { this.searchArchive = true }
  else { this.searchArchive = false }
}

function createStudentClick() {
    window.location.href = "http://localhost:3000/students/create"; // update to go to create student - TESTING - TESTING - TESTING
}

function viewStudentClick(id) {
    window.location.href = "http://localhost:3000/students/profile?" + id; // update to go to selected student - TESTING - TESTING - TESTING
}

</script>



<template>
  <div>
    <button
    title="Search Archived?"
    @click="searchArchiveClick()"
    >
      <div v-if="searchArchive==false"> Search Archived? </div>
      <div v-else> Don't Search Archived? </div>
      
    </button>
  </div>

    <!-- create user student button -->
    <div v-if="employeeRole=='Admin'">
      <button
      title="Create Student"
      @click="createStudentClick()"
      >
        Create Student
      </button>
    </div>
  
    <!-- search by id -->
    <div v-if="studentFirst=='' && studentLast==''">
      <!-- form -->
      <form class="search-form">
        <h3>Search Students by ID</h3>

        <input v-model.trim="studentId" placeholder="ID">

        <!-- <button title="Search">
          Search
        </button> -->
      </form>

      <!-- StudentSearchId api -->

      <!-- display result (button) -->
      <div class="search-results" v-if="studentId!==''">
              <button
                title="Select Student"
                @click="viewStudentClick(idUser.id)"
              >
                {{ idUser.id }} {{ idUser.firstName }} {{ idUser.lastName }} <!-- {{ user.StudentProfile.Sessions }} display num essions? -->
              </button>
      </div>
    </div>
  
    <!-- search by name -->
    <div v-if="studentId==''">
      <!-- form --> 
      <form class="search-form">
        <h3>Search Students by Name</h3>

        <input v-model.trim="studentFirst" placeholder="First Name">

        <input v-model.trim="studentLast" placeholder="Last Name">

        <!-- <button title="Search">
          Search
        </button> -->
      </form>

      <!-- StudentSearchName api -->

      <!-- display result (button) -->
      <div class="search-results" v-if="studentFirst!=='' || studentLast!==''">
        <ul>
            <li v-for="user in nameUsers" :key="user.id">
              <button
                title="Select Student"
                @click="viewStudentClick(user.id)"
              >
                {{ user.id }} {{ user.firstName }} {{ user.lastName }}  <!-- {{ user.StudentProfile.Sessions }} display num essions? -->
              </button>
            </li>
        </ul>
      </div>
    </div>
  
    <!-- display all users -->
    <div v-if="studentId=='' && studentFirst=='' && studentLast==''">
      <h3>All Students</h3>
      <!-- StudentSearchAll api -->
      <!-- display result (button) -->
      <div class="search-results">
        <ul>
            <li v-for="user in allUsers" :key="user.id">
              <button
                title="Select Student"
                @click="viewStudentClick(user.id)"
              >
                {{ user.id }} {{ user.firstName }} {{ user.lastName }}  <!-- {{ user.StudentProfile.Sessions }} display num essions? -->
              </button>
            </li>
        </ul>
      </div>
    </div>
  
  </template>
  