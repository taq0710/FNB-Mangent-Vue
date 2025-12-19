<script setup>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import EmployeeForm from "../components/employees/EmployeeForm.vue";
import EmployeeTable from "../components/employees/EmployeeTable.vue";
import { useEmployeeStore } from "../store/employeeStore";
import { loadInitialData } from "../services/dataService";
import { isAdmin } from "../services/authService";

const employeeStore = useEmployeeStore();
const { employees } = storeToRefs(employeeStore);
const isUserAdmin = ref(false);

onMounted(async () => {
  isUserAdmin.value = await isAdmin();
  if (employees.value.length === 0) {
    const data = await loadInitialData();
    employees.value = data.employees;
  }
});
</script>

<template>
  <DefaultLayout>
    <div>
      <h1 class="text-2xl font-bold mb-5">Quản lý nhân viên</h1>

      <div class="mt-5">
        <EmployeeForm v-if="isUserAdmin" />
        <EmployeeTable />
      </div>
    </div>
  </DefaultLayout>
</template>
