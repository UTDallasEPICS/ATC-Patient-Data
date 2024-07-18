<script setup lang="ts">
import type {
  User,
  StudentProfile,
  EmployeeProfile,
  Behavior,
  Session,
} from "@prisma/client";

const route = useRoute();
/*
  Import two compoents (create two files inside of components folder)
    1. sessions
      a. pass id
        i. api for getting student's sessions
    2. program
      a. pass id
        i. api for getting student's behaviors

*/

const student = await useFetch(`/api/user/get/student`, {
  query: { id: route.params.id },
});

let currentTab = ref("sessions");

function switchTab(tabName: string) {
  currentTab.value = tabName;
}

watch(currentTab, (newVal) => {
  console.log(newVal);
});
</script>

<template>
  <div class="flex flex-col h-[calc(100vh-5rem)] p-2">
    <div>
      <div class="text-2xl font-bold mb-3">
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
      <Session v-if="currentTab === 'sessions'" />
      <Program v-if="currentTab === 'program'" :user="student" />
      <UserInfo
        v-if="currentTab === 'userInfo'"
        :user="student"
        :userType="'STUDENT'"
      />
    </div>
  </div>
</template>
