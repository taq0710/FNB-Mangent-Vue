<script setup>
import DefaultLayout from "../layouts/DefaultLayout.vue";
import EmployeeForm from "../components/employees/EmployeeForm.vue";
import EmployeeTable from "../components/employees/EmployeeTable.vue";
</script>

<template>
  <DefaultLayout>
    <div>
      <h1 class="title">Quản lý nhân viên</h1>

      <div class="wrapper">
        <EmployeeForm />
        <EmployeeTable />
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped>
.title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
}

.wrapper {
  margin-top: 20px;
}
</style>
