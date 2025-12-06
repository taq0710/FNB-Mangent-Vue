<script setup>
import { ref } from "vue";
import { useEmployeeStore } from "../../store/employeeStore";
import BaseInput from "../common/BaseInput.vue";
import NumberInput from "../common/NumberInput.vue";
import DateInput from "../common/DateInput.vue";

const store = useEmployeeStore();

const employeeId = ref("");
const name = ref("");
const birthDate = ref("");
const citizenId = ref("");
const salaryPerHour = ref("");
const monthlyHours = ref("");

function submit() {
  store.addEmployee({
    employeeId: employeeId.value,
    name: name.value,
    birthDate: birthDate.value,
    citizenId: citizenId.value,
    salaryPerHour: Number(salaryPerHour.value),
    monthlyHours: Number(monthlyHours.value),
    totalSalary: Number(salaryPerHour.value) * Number(monthlyHours.value),
  });

  employeeId.value = "";
  name.value = "";
  birthDate.value = "";
  citizenId.value = "";
  salaryPerHour.value = "";
  monthlyHours.value = "";
}
</script>

<template>
  <div class="form">
    <h3>Thêm nhân viên</h3>

    <BaseInput v-model="employeeId" placeholder="Mã nhân viên" label="Mã nhân viên" />
    <BaseInput v-model="name" placeholder="Tên nhân viên" label="Tên nhân viên" />
    <DateInput v-model="birthDate" label="Ngày sinh" />
    <BaseInput v-model="citizenId" placeholder="Số CCCD" label="Số CCCD" />
    <NumberInput v-model="salaryPerHour" placeholder="Lương/giờ" label="Lương/giờ" />
    <NumberInput v-model="monthlyHours" placeholder="Giờ làm/tháng" label="Giờ làm/tháng" />

    <button @click="submit" class="submit-button">Thêm</button>
  </div>
</template>

<style scoped>
.form {
  margin-bottom: 20px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form h3 {
  margin-bottom: 20px;
  color: #333;
}

.submit-button {
  width: 100%;
  padding: 12px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 10px;
}

.submit-button:hover {
  background: #35a372;
}
</style>


