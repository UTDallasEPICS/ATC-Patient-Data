<script setup>


const employeeId = ref(3); // probably doesn't need to be a ref, should just get assigned when user hits page
const employeeRole = 'Admin'; // update to get if the users is admin - TESTING - TESTING - TESTING

const searchArchive = ref(false);

const studentFirst = ref('');
const studentLast = ref('');

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

const router = useRouter();

function viewStudentClick(id) {
    //window.location.href = "http://localhost:3000/students/profile?id=" + id; // update to go to selected student - TESTING - TESTING - TESTING
    router.push({ path: '/students/profile', query: { id: id } });
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
  
    <!-- search by name -->
    <div>
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
    <div v-if="studentFirst=='' && studentLast==''">
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
  