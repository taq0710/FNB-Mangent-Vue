<template>
  <DefaultLayout>
    <h1>Quản lý sản phẩm</h1>

    <ProductForm />
    <ProductTable />
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from "../layouts/DefaultLayout.vue";
import ProductForm from "../components/products/ProductForm.vue";
import ProductTable from "../components/products/ProductTable.vue";
</script>
