<script setup>
import { useEmployeeStore } from "../../store/employeeStore";
const employees = useEmployeeStore().employees;
</script>
<template>
  <table border="1" cellpadding="10">
    <thead>
      <tr>
        <th>Mã</th>
        <th>Tên</th>
        <th>Ngày sinh</th>
        <th>CCCD</th>
        <th>Lương/giờ</th>
        <th>Giờ làm</th>
        <th>Tổng lương</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="e in employees" :key="e.employeeId">
        <td>{{ e.employeeId }}</td>
        <td>{{ e.name }}</td>
        <td>{{ e.birthDate }}</td>
        <td>{{ e.citizenId }}</td>
        <td>{{ e.salaryPerHour }}</td>
        <td>{{ e.monthlyHours }}</td>
        <td>{{ e.totalSalary.toLocaleString() }}</td>
      </tr>
    </tbody>
  </table>
</template>


