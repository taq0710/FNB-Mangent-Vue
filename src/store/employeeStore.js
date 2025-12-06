import { defineStore } from "pinia";
import { ref } from "vue";

export const useEmployeeStore = defineStore("employeeStore", () => {
  const employees = ref([]);

  function addEmployee(emp) {
    employees.value.push(emp);
  }

  return { employees, addEmployee };
});
