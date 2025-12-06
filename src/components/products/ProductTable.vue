<template>
  <table border="1" cellpadding="10">
    <thead>
      <tr>
        <th>Mã</th>
        <th>Tên</th>
        <th>Số lượng</th>
        <th>Đơn vị</th>
        <th>Ngày nhập</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="p in products" :key="p.id">
        <td>{{ p.id }}</td>
        <td>{{ p.name }}</td>
        <td>{{ p.quantity }}</td>
        <td>{{ p.unit }}</td>
        <td>{{ p.importDate }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { useProductStore } from "../../store/productStore";
const products = useProductStore().products;
</script>
