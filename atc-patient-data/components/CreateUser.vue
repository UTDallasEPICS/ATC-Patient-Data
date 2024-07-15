<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { ref } from "vue";

const employeeNames = ref({});

const props = defineProps({
  isOpen: Boolean,
  userType: String,
  closeModal: Function,
});

const localIsOpen = ref(props.isOpen); //need b/c error: v-model cannot be used on a prop, because local prop bindings are not writable.

watchEffect(() => {
  localIsOpen.value = props.isOpen;
});

const sentenceCaseUserType = computed(() => {
  if (!props.userType) return "";
  return props.userType.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
});

async function getEmployeeNames() {
  const res = await useFetch("/api/user/get/employeeNames");
  employeeNames.value = res.data._rawValue;
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
