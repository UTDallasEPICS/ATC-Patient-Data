<script setup>
import { ref } from 'vue';

// Define props
const props = defineProps(["user", "userType"]);
const emit = defineEmits(["refreshUser"]);
const modalOpen = ref(false);

function openModal() {
  modalOpen.value = true;
  console.log("edit modal opened");
}

function closeModal() {
  modalOpen.value = false;
  emit("refreshUser");
  console.log("edit modal closed");
}
</script>

<template>
  <div class="flex justify-center py-16  ">
    <button v-on:click="openModal" title="Update Student" class="bg-blue-500 text-white py-1 px-4 rounded">

        <span class="uppercase">Update Student</span>

    </button>
  </div>
  <div class="flex w-full h-half justify-center items-center text-lg">
    <table class="w-1/4 border-gray-900">
      <!-- Email Row -->
      <tr>
        <td class="font-semibold">Email</td>
        <td class="flex justify-center">{{ props.user.data.value.email }}</td>
      </tr>
      <!-- Phone Row -->
      <tr>
        <td class="font-semibold">Phone</td>
        <td class="flex justify-center">
          <div v-if="props.user.data.value.phoneNumber">
            {{ props.user.data.value.phoneNumber }}
          </div>
          <div v-else class="font-mono">Not Provided</div>
        </td>
      </tr>
      <!-- Date of Birth Row (for students) -->
      <tr v-if="userType === 'STUDENT'">
        <td class="font-semibold">DoB</td>
        <td class="flex justify-center">
          <div v-if="props.user.data.value.StudentProfile.dob">
            {{ (props.user.data.value.StudentProfile.dob).substring(0,10) }} <!-- can't use .toDateString() because of timezone -->
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
    <InputUser
      :isOpen="modalOpen"
      :mode="'EDIT'"
      :userType="'STUDENT'"
      :user="props.user.data.value"
      @close-modal="closeModal"
    />
  </div>
</template>
