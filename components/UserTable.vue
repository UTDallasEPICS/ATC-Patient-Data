<script setup>
import BlockShuffle from "../../assets/blocks-shuffle-3.svg";

const props = defineProps({
  users: Array,
  userType: String,
  loading: Boolean,
});

const router = useRouter();

async function viewUser(id) {
  if (props.userType == "STUDENT") {
    await navigateTo({ path: `/students/student-profile/${id}` });
  } else {
    await navigateTo({ path: `/employees/employee-profile/${id}` });
  }
}
</script>

<template>
  <div class="relative">
    <div class="flex flex-col text-center border border-gray-500 rounded-lg">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200 border">
              <thead class="bg-gray-300">
                <tr>
                  <th
                    class="px-6 py-3 text-center text-xs font-medium uppercase border w-2/3"
                  >
                    Name
                  </th>
                  <th
                    class="px-6 py-3 text-center text-xs font-medium uppercase border w-2/3"
                  >
                    Email
                  </th>
                  <th
                    v-if="userType === 'STUDENT'"
                    class="px-6 py-3 text-center text-xs font-medium uppercase border"
                  >
                    Assigned Employee
                  </th>
                  <th
                    v-if="userType === 'EMPLOYEE'"
                    class="px-6 py-3 text-center text-xs font-medium uppercase border"
                  >
                    Role
                  </th>
                  <th
                    v-if="userType === 'EMPLOYEE'"
                    class="px-6 py-3 text-center text-xs font-medium uppercase border"
                  >
                    Phone Number
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="user in users"
                  :key="user.id"
                  class="hover:bg-gray-100 hover:cursor-pointer"
                  v-on:click="viewUser(user.id)"
                >
                  <td class="px-6 py-4 whitespace-nowrap border">
                    <div class="text-sm text-gray-900">
                      {{ user.firstName }} {{ user.lastName }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap border">
                    <div class="text-sm text-gray-900">
                      {{ user.email }}
                    </div>
                  </td>
                  <td
                    v-if=" userType === 'STUDENT'"
                    class="px-6 py-4 whitespace-nowrap border"
                  >
                    <div class="text-sm">
                      {{ user.StudentProfile.AssignedEmployee.User.firstName }}
                    </div>
                  </td>
                  <td
                    v-if=" userType === 'EMPLOYEE'"
                    class="px-6 py-4 whitespace-nowrap border"
                  >
                    <div class="text-sm">
                      {{ user.EmployeeProfile.role }}
                    </div>
                  </td>
                  <td
                    v-if=" userType === 'EMPLOYEE'"
                    class="px-6 py-4 whitespace-nowrap border"
                  >
                    <div class="text-sm">
                      {{ user.phoneNumber }}
                    </div>
                  </td>
                </tr>
                <tr v-if="!users.length && userType === 'STUDENT'">
                  <td colspan="3" class="px-6 py-4 whitespace-nowrap border">
                    <div class="text-sm text-gray-900">No students found</div>
                  </td>
                </tr>
                <tr v-if="!users.length && userType === 'EMPLOYEE'">
                  <td colspan="2" class="px-6 py-4 whitespace-nowrap border">
                    <div class="text-sm text-gray-900">No employee found</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="loading"
      class="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center"
    >
      <BlockShuffle />
    </div>
  </div>
</template>
