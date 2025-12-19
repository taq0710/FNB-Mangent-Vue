import { defineStore } from "pinia";
import { ref } from "vue";

export interface Employee {
  employeeId: string;
  name: string;
  birthDate: string;
  citizenId: string;
  salaryPerHour: number;
  monthlyHours: number;
  totalSalary: number;
}

export const useEmployeeStore = defineStore("employeeStore", () => {
  const employees = ref<Employee[]>([]);

  function addEmployee(emp: Employee): void {
    employees.value.push(emp);
  }

  function deleteEmployee(employeeId: string): void {
    const index = employees.value.findIndex((e) => e.employeeId === employeeId);
    if (index > -1) {
      employees.value.splice(index, 1);
    }
  }

  function updateEmployee(employeeId: string, updatedEmployee: Partial<Employee>): void {
    const index = employees.value.findIndex((e) => e.employeeId === employeeId);
    if (index > -1) {
      employees.value[index] = {
        ...employees.value[index],
        ...updatedEmployee,
      };
      if (updatedEmployee.salaryPerHour || updatedEmployee.monthlyHours) {
        employees.value[index].totalSalary =
          employees.value[index].salaryPerHour *
          employees.value[index].monthlyHours;
      }
    }
  }

  return { employees, addEmployee, deleteEmployee, updateEmployee };
});

