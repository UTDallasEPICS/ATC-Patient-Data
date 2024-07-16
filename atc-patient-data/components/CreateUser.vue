<script setup>
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
import { ref, computed } from "vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

const props = defineProps({
  isOpen: Boolean,
  userType: String,
  closeModal: Function,
});
const localIsOpen = ref(props.isOpen); //need b/c error: v-model cannot be used on a prop, because local prop bindings are not writable.

const employeeNames = ref([]);
const selectedEmployee = ref({});
const filteredPeople = computed(() =>
  query.value === ""
    ? employeeNames.value
    : employeeNames.value.filter((person) => {
        return person.name.toLowerCase().includes(query.value.toLowerCase());
      })
);

const sentenceCaseUserType = computed(() => {
  if (!props.userType) return "";
  return props.userType.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
});

async function getEmployeeNames() {
  const res = await useFetch("/api/user/get/employeeNames");
  employeeNames.value = res.data._rawValue.map((name) => ({
    id: name.id,
    name: name.name,
  }));
  selectedEmployee.value = employeeNames.value[0];
}
getEmployeeNames();
</script>

<template>
  <TransitionRoot appear :show="localIsOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
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

      <div class="fixed inset-0 overflow-y-auto">
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
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
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
                  type="text"
                  class="outline-none border rounded p-1 hover:border-blue-300 focus:border-blue-500 focus:border-2 focus:bg-blue-100"
                />
              </div>

              <div class="flex flex-col m-3">
                <label>Last Name</label>
                <input
                  type="text"
                  class="outline-none border rounded p-1 hover:border-blue-300 focus:border-blue-500 focus:border-2 focus:bg-blue-100"
                />
              </div>

              <div class="flex flex-col m-3">
                <label>Email</label>
                <input
                  type="email"
                  class="outline-none border rounded p-1 hover:border-blue-300 focus:border-blue-500 focus:border-2 focus:bg-blue-100"
                />
              </div>

              <div class="flex flex-col m-3">
                <label>Phone Number</label>
                <input
                  type="number"
                  class="outline-none border rounded p-1 hover:border-blue-300 focus:border-blue-500 focus:border-2 focus:bg-blue-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>

              <div class="flex flex-col m-3">
                <label>Date of Birth</label>
                <input
                  type="date"
                  class="outline-none border rounded p-1 hover:border-blue-300 focus:border-blue-500 focus:border-2 focus:bg-blue-100"
                />
              </div>

              <div class="flex flex-col m-3">
                <label>Assigned Employee</label>
                <Listbox v-model="selectedEmployee">
                  <div class="relative mt-1">
                    <ListboxButton
                      class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm"
                    >
                      <span class="block truncate">{{
                        selectedEmployee.name
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
                        class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                      >
                        <ListboxOption
                          v-slot="{ active, selected }"
                          v-for="person in filteredPeople"
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
