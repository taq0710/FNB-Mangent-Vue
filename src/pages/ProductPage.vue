<script setup>
  import { onMounted } from "vue";
  import DefaultLayout from "../layouts/DefaultLayout.vue";
  import ProductForm from "../components/products/ProductForm.vue";
  import ProductTable from "../components/products/ProductTable.vue";
  import { useProductStore } from "../store/productStore";
  import { loadInitialData } from "../services/dataService";
  import { storeToRefs } from "pinia";
  
  const productStore = useProductStore();
  const { products } = storeToRefs(productStore);
  onMounted(async () => {
    if (products.value.length === 0) {
    const data = await loadInitialData();
    products.value =data.products;
  }
  });
  </script>
<template>
  <DefaultLayout>
    <h1>Quản lý sản phẩm</h1>

    <ProductForm />
    <ProductTable />
  </DefaultLayout>
</template>


