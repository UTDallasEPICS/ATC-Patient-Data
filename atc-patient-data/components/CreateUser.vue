<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

const props = defineProps({
  isOpen: Boolean,
  userType: String,
});
const emit = defineEmits(["closeModal"]);

const sentenceCaseUserType = computed(() => {
  if (!props.userType) return "";
  return props.userType.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
});

const { data } = await useFetch("/api/user/get/employeeNames");
const names = ref(data.value);
const employeeTypes = { 1: "ADMIN", 2: "BCBA", 3: "TECH" };

const formData = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  dateOfBirth: "",
  assignedEmployee: (data.value && data.value[0]) || null,
  role: "TECH",
}) as {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: ""; //need to be stored as Date object
  assignedEmployee: { id: number; name: string } | null;
  role: string;
};

watch(formData, () => {
  console.log("formData", formData);
});

async function emitSubmit() {
  try {
    if (props.userType == "STUDENT") {
      await $fetch("/api/user/create/student", {
        method: "POST",
        body: formData,
      });
    } else {
      await $fetch("/api/user/create/employee", {
        method: "POST",
        body: formData,
      });
    }
    formData.firstName = "";
    formData.lastName = "";
    formData.email = "";
    formData.phoneNumber = "";
    formData.dateOfBirth = "";
    formData.assignedEmployee = (data.value && data.value[0]) || null;
    formData.role = "TECH";
    emit("closeModal");
  } catch (error) {
    if (props.userType == "STUDENT") {
      console.error("error in creating a student", error);
      alert("Error in creating a student");
    } else {
      console.error("error in creating a employee", error);
      alert("Error in creating a employee");
    }
  }
}

function emitClose() {
  formData.firstName = "";
  formData.lastName = "";
  formData.email = "";
  formData.phoneNumber = "";
  formData.dateOfBirth = "";
  formData.assignedEmployee = (data.value && data.value[0]) || null;
  formData.role = "TECH";
  emit("closeModal");
}
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="emitClose" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>
      <div class="fixed inset-0">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform rounded bg-white p-6 text-left transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Create {{ sentenceCaseUserType }}
              </DialogTitle>

              <div class="flex flex-col m-3">
                <label>First Name</label>
                <input
                  v-model="formData.firstName"
                  type="text"
                  class="outline-none border rounded p-1 hover:border-blue-300 focus:border-blue-500 focus:border-2 focus:bg-blue-100"
                />
              </div>

              <div class="flex flex-col m-3">
                <label>Last Name</label>
                <input
                  v-model="formData.lastName"
                  type="text"
                  class="outline-none border rounded p-1 hover:border-blue-300 focus:border-blue-500 focus:border-2 focus:bg-blue-100"
                />
              </div>

              <div class="flex flex-col m-3">
                <label>Email</label>
                <input
                  v-model="formData.email"
                  type="email"
                  class="outline-none border rounded p-1 hover:border-blue-300 focus:border-blue-500 focus:border-2 focus:bg-blue-100"
                />
              </div>

              <div class="flex flex-col m-3">
                <label>Phone Number</label>
                <input
                  v-model="formData.phoneNumber"
                  type="number"
                  class="outline-none border rounded p-1 hover:border-blue-300 focus:border-blue-500 focus:border-2 focus:bg-blue-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>

              <div v-if="props.userType == 'STUDENT'" class="flex flex-col m-3">
                <label>Date of Birth</label>
                <input
                  v-model="formData.dateOfBirth"
                  type="date"
                  class="outline-none border rounded p-1 hover:border-blue-300 focus:border-blue-500 focus:border-2 focus:bg-blue-100"
                />
              </div>

              <div v-if="props.userType == 'STUDENT'" class="flex flex-col m-3">
                <label>Assigned Employee</label>
                <Listbox v-model="formData.assignedEmployee">
                  <div class="relative">
                    <ListboxButton
                      class="outline-none relative w-full cursor-pointer rounded p-1 text-left border hover:border-blue-300 focus:border-blue-500 focus:border-2 focus:bg-blue-100"
                    >
                      <span class="block truncate">{{
                        formData.assignedEmployee &&
                        formData.assignedEmployee.name
                      }}</span>
                      <span
                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                      >
                        <ChevronUpDownIcon
                          class="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </ListboxButton>
                    <transition
                      leave-active-class="transition duration-100 ease-in"
                      leave-from-class="opacity-100"
                      leave-to-class="opacity-0"
                    >
                      <ListboxOptions
                        class="absolute p-1 w-full overflow-auto rounded bg-gray-100"
                      >
                        <ListboxOption
                          v-slot="{ active, selected }"
                          v-for="person in names"
                          :key="person.id"
                          :value="person"
                          as="template"
                        >
                          <li
                            :class="[
                              active
                                ? 'bg-blue-100 text-blue-900'
                                : 'text-gray-900',
                              'relative cursor-pointer select-none py-2 pl-10 pr-4',
                            ]"
                          >
                            <span
                              :class="[
                                selected ? 'font-medium' : 'font-normal',
                                'block truncate',
                              ]"
                              >{{ person.name }}</span
                            >
                            <span
                              v-if="selected"
                              class="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600"
                            >
                              <CheckIcon class="h-5 w-5" aria-hidden="true" />
                            </span>
                          </li>
                        </ListboxOption>
                      </ListboxOptions>
                    </transition>
                  </div>
                </Listbox>
              </div>

              <div
                v-if="props.userType == 'EMPLOYEE'"
                class="flex flex-col m-3"
              >
                <label>Assigned Employee</label>
                <Listbox v-model="formData.role">
                  <div class="relative">
                    <ListboxButton
                      class="outline-none relative w-full cursor-pointer rounded p-1 text-left border hover:border-blue-300 focus:border-blue-500 focus:border-2 focus:bg-blue-100"
                    >
                      <span class="block truncate">{{ formData.role }}</span>
                      <span
                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                      >
                        <ChevronUpDownIcon
                          class="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </ListboxButton>
                    <transition
                      leave-active-class="transition duration-100 ease-in"
                      leave-from-class="opacity-100"
                      leave-to-class="opacity-0"
                    >
                      <ListboxOptions
                        class="absolute p-1 w-full overflow-auto rounded bg-gray-100"
                      >
                        <ListboxOption
                          v-slot="{ active, selected }"
                          v-for="type in employeeTypes"
                          :value="type"
                          as="template"
                        >
                          <li
                            :class="[
                              active
                                ? 'bg-blue-100 text-blue-900'
                                : 'text-gray-900',
                              'relative cursor-pointer select-none py-2 pl-10 pr-4',
                            ]"
                          >
                            <span
                              :class="[
                                selected ? 'font-medium' : 'font-normal',
                                'block truncate',
                              ]"
                              >{{ type }}</span
                            >
                            <span
                              v-if="selected"
                              class="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600"
                            >
                              <CheckIcon class="h-5 w-5" aria-hidden="true" />
                            </span>
                          </li>
                        </ListboxOption>
                      </ListboxOptions>
                    </transition>
                  </div>
                </Listbox>
              </div>

              <div class="flex w-full p-3 justify-center">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                  @click="emitSubmit"
                >
                  Submit
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
