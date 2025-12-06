import { defineStore } from "pinia";
import { ref } from "vue";

export const useEmployeeStore = defineStore("employeeStore", () => {
  const employees = ref([]);

  function addEmployee(emp) {
    employees.value.push(emp);
  }

  function deleteEmployee(employeeId) {
    const index = employees.value.findIndex((e) => e.employeeId === employeeId);
    if (index > -1) {
      employees.value.splice(index, 1);
    }
  }

  function updateEmployee(employeeId, updatedEmployee) {
    const index = employees.value.findIndex((e) => e.employeeId === employeeId);
    if (index > -1) {
      employees.value[index] = {
        ...employees.value[index],
        ...updatedEmployee,
      };
      // Recalculate total salary if salaryPerHour or monthlyHours changed
      if (updatedEmployee.salaryPerHour || updatedEmployee.monthlyHours) {
        employees.value[index].totalSalary =
          employees.value[index].salaryPerHour *
          employees.value[index].monthlyHours;
      }
    }
  }

  return { employees, addEmployee, deleteEmployee, updateEmployee };
});
