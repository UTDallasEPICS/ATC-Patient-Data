<script setup>
// import type {
//   User,
//   StudentProfile,
//   EmployeeProfile,
//   Behavior,
//   Session,
// } from "@prisma/client";
import { ArrowLeftIcon } from "@heroicons/vue/24/outline";

const route = useRoute();

const student = await useFetch(`/api/user/get/student`, {
  query: { id: route.params.id },
});

function getStudent() {
  student.refresh();
}

let currentTab = ref("sessions");

function switchTab(tabName) {
  currentTab.value = tabName;
}

function navigateBack() {
  navigateTo({ path: "/students" });
}

watch(currentTab, (newVal) => {
  console.log(newVal);
});

getStudent();
</script>

<template>
  <div class="flex flex-col h-[calc(100vh-5rem)] p-2">
    <div class="flex space-x-5 mb-2 items-center">
      <button
        class="p-2 rounded text-gray-400 border-2 hover:border-black hover:text-black"
        @click="navigateBack"
      >
        <ArrowLeftIcon class="h-6 w-6" />
      </button>
      <div class="text-2xl font-bold">
        {{ student.data.value && student.data.value.firstName }}
        {{ student.data.value && student.data.value.lastName }}
      </div>
    </div>
    <div class="flex space-x-1 border border-black rounded-t-lg bg-gray-300">
      <button
        :class="currentTab === 'sessions' ? 'bg-blue-900' : 'bg-blue-500'"
        class="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-t-lg"
        @click="switchTab('sessions')"
      >
        Sessions
      </button>
      <button
        :class="currentTab === 'program' ? 'bg-blue-900' : 'bg-blue-500'"
        class="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-t-lg"
        @click="switchTab('program')"
      >
        Program
      </button>
      <button
        :class="currentTab === 'userInfo' ? 'bg-blue-900' : 'bg-blue-500'"
        class="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-t-lg"
        @click="switchTab('userInfo')"
      >
        Student Info
      </button>
    </div>
    <div class="h-full border border-black rounded-b-lg overflow-auto">
      <Session v-if="currentTab === 'sessions'" :user="student" />
      <Program v-if="currentTab === 'program'" :user="student" />
      <UserInfo
        v-if="currentTab === 'userInfo'"
        :user="student"
        :userType="'STUDENT'"
        @refreshUser="getStudent"
      />
    </div>
  </div>
</template>
