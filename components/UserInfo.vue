<script setup>
const props = defineProps(["user", "userType"]);

function formatDate(dateString) {
  let date = new Date(dateString);
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}
</script>

<template>
  <div class="flex w-full h-full justify-center items-center text-lg">
    <table class="w-1/4 border-gray-900">
      <tr>
        <td class="font-semibold">Email</td>
        <td class="flex justify-center">{{ props.user.data.value.email }}</td>
      </tr>
      <tr>
        <td class="font-semibold">Phone</td>
        <td class="flex justify-center">
          <div v-if="props.user.data.value.phone">
            {{ props.user.data.vlue.phone }}
          </div>
          <div v-else class="font-mono">Not Provided</div>
        </td>
      </tr>
      <tr v-if="userType === 'STUDENT'">
        <td class="font-semibold">DoB</td>
        <td class="flex justify-center">
          <div v-if="props.user.data.value.StudentProfile.dob">
            {{ formatDate(props.user.data.value.StudentProfile.dob) }}
          </div>
          <div v-else class="font-mono">Not Provided</div>
        </td>
      </tr>
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
