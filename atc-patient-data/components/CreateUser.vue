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

const { data: names } = useFetch("/api/user/get/employeeNames");
console.log("names outside", names);

const selected = ref<{ id: number; name: string }>({ id: 0, name: "" });
// watch(names, () => {
//   if () {
//     selected.value = names.value[0];
//   }
// });

const formData = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  dateOfBirth: "",
  assignedEmployee: "",
});

watch(formData, () => {
  console.log("formData", formData);
});
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="emit('closeModal')" class="relative z-10">
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
      <div class="fixed inset-0 overflow-auto">
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
              class="w-full max-w-md transform overflow-auto rounded bg-white p-6 text-left transition-all"
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

              <div class="flex flex-col m-3">
                <label>Date of Birth</label>
                <input
                  v-model="formData.dateOfBirth"
                  type="date"
                  class="outline-none border rounded p-1 hover:border-blue-300 focus:border-blue-500 focus:border-2 focus:bg-blue-100"
                />
              </div>

              <div class="flex flex-col m-3">
                <label>Assigned Employee</label>
                <Listbox v-model="selected">
                  <div class="relative">
                    <ListboxButton
                      class="outline-none relative w-full cursor-pointer rounded p-1 text-left border hover:border-blue-300 focus:border-blue-500 focus:border-2 focus:bg-blue-100"
                    >
                      <span class="block truncate">{{
                        selected && selected.name
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
                    <!-- <Teleport to="body"> -->
                    <transition
                      leave-active-class="transition duration-100 ease-in"
                      leave-from-class="opacity-100"
                      leave-to-class="opacity-0"
                    >
                      <ListboxOptions
                        class="absolute z-10 p-1 w-full overflow-auto rounded bg-gray-300"
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
                              'relative cursor-default select-none py-2 pl-10 pr-4',
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
                    <!-- </Teleport> -->
                  </div>
                </Listbox>
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal"
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
