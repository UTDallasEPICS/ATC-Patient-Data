<script setup>

const searchArchive = ref(false);

const employeeFirst = ref('');
const employeeLast = ref('');

const { data: nameUsers } = await useFetch('/api/user/EmployeeSearchName', { 
query: { 
  employeeFirst: employeeFirst, employeeLast: employeeLast, searchArchive: searchArchive,
}});
const { data: allUsers } = await useFetch('/api/user/EmployeeSearchAll', { 
query: { 
  searchArchive: searchArchive,
}}); 

function searchArchiveClick() { 
  if (this.searchArchive==false) { this.searchArchive = true }
  else { this.searchArchive = false }
}

function createEmployeeClick() {
    window.location.href = "http://localhost:3000/employee/create"; 
}

const router = useRouter();

function viewEmployeeClick(id) {
    //window.location.href = "http://localhost:3000/employees/profile?id=" + id; // update to go to selected employee - TESTING - TESTING - TESTING
    router.push({ path: '/employees/profile', query: { id: id } });
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

    <!-- create user employee button -->
    <div>
      <button
      title="Create Employee"
      @click="createEmployeeClick()"
      >
        Create Employee
      </button>
    </div>
  
    <!-- search by name -->
    <div>
      <!-- form --> 
      <form class="search-form">
        <h3>Search Employees by Name</h3>

        <input v-model.trim="employeeFirst" placeholder="First Name">

        <input v-model.trim="employeeLast" placeholder="Last Name">

        <!-- <button title="Search">
          Search
        </button> -->
      </form>

      <!-- EmployeeSearchName api -->

      <!-- display result (button) -->
      <div class="search-results" v-if="employeeFirst!=='' || employeeLast!==''">
        <ul>
            <li v-for="user in nameUsers" :key="user.id">
              <button
                title="Select Employee"
                @click="viewEmployeeClick(user.id)"
              >
                {{ user.id }} {{ user.firstName }} {{ user.lastName }}  <!-- {{ user.EmployeeProfile.Sessions }} display num essions? -->
              </button>
            </li>
        </ul>
      </div>
    </div>
  
    <!-- display all users -->
    <div v-if="employeeFirst=='' && employeeLast==''">
      <h3>All Employees</h3>
      <!-- EmployeeSearchAll api -->
      <!-- display result (button) -->
      <div class="search-results">
        <ul>
            <li v-for="user in allUsers" :key="user.id">
              <button
                title="Select Employee"
                @click="viewEmployeeClick(user.id)"
              >
                {{ user.id }} {{ user.firstName }} {{ user.lastName }}  <!-- {{ user.EmployeeProfile.Sessions }} display num essions? -->
              </button>
            </li>
        </ul>
      </div>
    </div>
  
  </template>
  