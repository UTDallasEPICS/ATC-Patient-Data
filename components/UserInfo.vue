<script setup>
import { ref } from 'vue';

// Define props
const props = defineProps(["user", "userType"]);

// Define a reactive variable for the toggle switch state
const isArchived = ref(false);

// Function to format date
function formatDate(dateString) {
  let date = new Date(dateString);
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

// Function to handle button click
function updateStudent() {
  alert('Update student button clicked!');
}

// Function to handle toggle change
function toggleArchive() {
  isArchived.value = !isArchived.value;
  // Handle the toggle action (e.g., update the student status)
  console.log('Archive status:', isArchived.value);
}
</script>

<template>
  <div class="flex w-full h-full justify-center items-center text-lg">
    <table class="w-1/4 border-gray-900">
      <!-- Button and Toggle Row -->
      <tr>
        <td colspan="2" class="py-11">
          <div class="flex items-center space-x-4">
            <!-- Update Student Button -->
            <button @click="updateStudent" class="bg-blue-500 text-white py-1 px-4 rounded">
              Update Student
            </button>
            <!-- Archive Student Toggle -->
            <label class="flex items-center space-x-2 cursor-pointer">
              <span class="text-gray-700">Archive Student</span>
              <input 
                type="checkbox" 
                v-model="isArchived" 
                @change="toggleArchive"
                class="hidden"
              />
              <div 
                class="relative inline-block w-10 h-6 bg-gray-400 rounded-full transition-colors duration-300"
                :class="{ 'bg-blue-500': isArchived }"
                @click="toggleArchive"
              >
                <div 
                  class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300"
                  :class="{ 'translate-x-4': isArchived }"
                ></div>
              </div>
            </label>
          </div>
        </td>
      </tr>
      <!-- Email Row -->
      <tr>
        <td class="font-semibold">Email</td>
        <td class="flex justify-center">{{ props.user.data.value.email }}</td>
      </tr>
      <!-- Phone Row -->
      <tr>
        <td class="font-semibold">Phone</td>
        <td class="flex justify-center">
          <div v-if="props.user.data.value.phone">
            {{ props.user.data.value.phone }}
          </div>
          <div v-else class="font-mono">Not Provided</div>
        </td>
      </tr>
      <!-- Date of Birth Row (for students) -->
      <tr v-if="userType === 'STUDENT'">
        <td class="font-semibold">DoB</td>
        <td class="flex justify-center">
          <div v-if="props.user.data.value.StudentProfile.dob">
            {{ formatDate(props.user.data.value.StudentProfile.dob) }}
          </div>
          <div v-else class="font-mono">Not Provided</div>
        </td>
      </tr>
      <!-- Assigned Employee Row (for students) -->
      <tr v-if="userType === 'STUDENT'">
        <td class="font-semibold">Assigned Employee</td>
        <td class="flex justify-center">
          <div
            v-if="props.user.data.value.StudentProfile.AssignedEmployee.User"
          >
            {{
              props.user.data.value.StudentProfile.AssignedEmployee.User
                .firstName
            }}
            {{
              props.user.data.value.StudentProfile.AssignedEmployee.User
                .lastName
            }}
          </div>
          <div v-else class="font-mono">Not Provided</div>
        </td>
      </tr>
    </table>
  </div>
</template>
