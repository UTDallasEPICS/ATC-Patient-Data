<script setup lang="ts">
import { AcademicCapIcon } from "@heroicons/vue/24/outline";
import { UserIcon } from "@heroicons/vue/24/outline";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/vue/24/outline";

const config = useRuntimeConfig();

async function logout() {
  try {
    await $fetch(`${config.public.BASEURL}/api/auth/logout`, {
      mode: "no-cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error logging out:", error);
  }
  window.location.href = `${config.public.BASEURL}`;
}

function studentsClick() {
  window.location.href = `${config.public.BASEURL}/students`;
}
function employeesClick() {
  window.location.href = `${config.public.BASEURL}/employees`;
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
