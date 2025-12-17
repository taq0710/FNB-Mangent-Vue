<script setup>
import { ref } from "vue";
import { useEmployeeStore } from "../../store/employeeStore";
import BaseInput from "../common/BaseInput.vue";
import NumberInput from "../common/NumberInput.vue";
import DateInput from "../common/DateInput.vue";
import Button from "../common/Button.vue";

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
    <NumberInput
      v-model="monthlyHours"
      placeholder="Giờ làm/tháng"
      label="Giờ làm/tháng"
    />

    <Button @click="submit" variant="primary" full-width class="submit-button">
      Thêm
    </Button>
  </div>
</template>


