<script setup>
// import { logoutRedirectUrl } from '../server/api/auth/auth0';
import { UserGroupIcon } from "@heroicons/vue/24/outline";
import { AcademicCapIcon } from "@heroicons/vue/24/outline";
import { UserIcon } from "@heroicons/vue/24/outline";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/vue/24/outline";

// import { VTooltip } from "v-tooltip";
// import Vue from "vue";

// Vue.use(VTooltip);
async function logout() {
  const token = useCookie("token").value;
  // const logoutUrl = logoutRedirectUrl(token);
  try {
    await fetch("http://localhost:3000/api/auth/logout", {
      mode: "no-cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ token }),
    });
  } catch (error) {
    console.error("Error logging out:", error);
  }
  window.location.href = "http://localhost:3000/";
  // console.log("token", token);
  // console.log("logoutUrl", logoutUrl);
}

function studentsClick() {
  window.location.href = "http://localhost:3000/students";
}
function employeesClick() {
  window.location.href = "http://localhost:3000/employees";
}
function usersClick() {
  window.location.href = "http://localhost:3000/users";
}
</script>

<template>
  <nav class="bg-gray-800 flex space-x-10">
    <div class="bg-white rounded m-4 p-2 flex items-center justify-center">
      <img src="/atc-logo.png" alt="logo" class="h-8" draggable="false" />
    </div>
    <div class="flex grow">
      <div class="flex items-center">
        <button
          class="text-white px-3 py-2 hover:bg-gray-700 m-4 rounded"
          title="Students"
          @click="studentsClick"
        >
          <AcademicCapIcon class="h-6 w-6" />
        </button>
        <button
          class="text-white px-3 py-2 hover:bg-gray-700 m-4 rounded"
          title="Employees"
          @click="employeesClick"
        >
          <UserIcon class="h-6 w-6" />
        </button>
        <button
          class="text-white px-3 py-2 hover:bg-gray-700 m-4 rounded"
          title="User Management"
          @click="usersClick"
        >
          <UserGroupIcon class="h-6 w-6" />
        </button>
      </div>
      <div class="flex justify-end w-full">
        <button
          class="text-white px-3 py-2 hover:bg-gray-700 m-4 rounded"
          title="Logout"
          @click="logout"
        >
          <ArrowLeftStartOnRectangleIcon class="h-6 w-6" />
        </button>
      </div>
    </div>
  </nav>
</template>
