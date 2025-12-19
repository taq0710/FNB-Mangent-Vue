<script setup>
import { onMounted, ref } from "vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import ProductForm from "../components/products/ProductForm.vue";
import ProductTable from "../components/products/ProductTable.vue";
import { useProductStore } from "../store/productStore";
import { loadInitialData } from "../services/dataService";
import { storeToRefs } from "pinia";
import { isAdmin } from "../services/authService";

const productStore = useProductStore();
const { products } = storeToRefs(productStore);
const isUserAdmin = ref(false);

onMounted(async () => {
  isUserAdmin.value = await isAdmin();
  if (products.value.length === 0) {
    const data = await loadInitialData();
    products.value = data.products;
  }
});
const filterOptions = [
  { label: "Tất cả", value: "all" },
  { label: "Hôm nay", value: "today" },
  { label: "Tuần này", value: "week" },
  { label: "Tháng này", value: "month" },
];
</script>
<template>
  <DefaultLayout>
    <h1 class="text-2xl font-bold mb-5">Quản lý sản phẩm</h1>
    <ProductForm v-if="isUserAdmin" />
    
    <ProductTable />
  </DefaultLayout>
</template>
