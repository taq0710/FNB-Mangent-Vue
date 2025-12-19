<script setup>
import { computed, onMounted } from "vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import RevenueChart from "../components/charts/RevenueChart.vue";
import ProductSoldChart from "../components/charts/ProductSoldChart.vue";
import { useChartStore } from "../store/chartStore";
import { useProductStore } from "../store/productStore";
import { useEmployeeStore } from "../store/employeeStore";
import { loadInitialData } from "../services/dataService";

const chartStore = useChartStore();
const productStore = useProductStore();
const employeeStore = useEmployeeStore();

const totalRevenue = computed(() => {
  const yearData = chartStore.revenue?.year;
  if (yearData && yearData.length > 0) {
    return yearData[yearData.length - 1].amount;
  }
  return 0;
});

const totalProductsSold = computed(() => {
  const yearData = chartStore.productsSold?.year;
  if (yearData && yearData.length > 0) {
    return yearData[yearData.length - 1].quantity;
  }
  return 0;
});

const totalEmployees = computed(() => {
  return employeeStore.employees?.length || 0;
});

onMounted(async () => {
  const data = await loadInitialData();
  if (data) {
    if (data.products) {
      productStore.products = data.products;
    }

    if (data.employees) {
      employeeStore.employees = data.employees;
    }

    if (data.revenue) {
      chartStore.revenue = data.revenue;
    }

    if (data.productsSold) {
      chartStore.productsSold = data.productsSold;
    }
  }
});
</script>

<template>
  <DefaultLayout>
    <h1 class="text-2xl font-bold mb-5">Dashboard</h1>

    <div class="flex gap-5 mb-8">
      <div class="flex-1 p-5 bg-white rounded-lg shadow-sm">
        <h3 class="m-0 mb-2.5 text-gray-600 text-sm font-normal">Tổng doanh thu</h3>
        <p class="m-0 text-2xl font-bold text-primary">
          {{
            new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(totalRevenue)
          }}
        </p>
      </div>
      <div class="flex-1 p-5 bg-white rounded-lg shadow-sm">
        <h3 class="m-0 mb-2.5 text-gray-600 text-sm font-normal">Sản phẩm bán ra</h3>
        <p class="m-0 text-2xl font-bold text-primary">{{ totalProductsSold.toLocaleString("vi-VN") }}</p>
      </div>
      <div class="flex-1 p-5 bg-white rounded-lg shadow-sm">
        <h3 class="m-0 mb-2.5 text-gray-600 text-sm font-normal">Nhân viên</h3>
        <p class="m-0 text-2xl font-bold text-primary">{{ totalEmployees }}</p>
      </div>
    </div>

    <div class="flex flex-col gap-5">
      <RevenueChart />
      <ProductSoldChart />
    </div>
  </DefaultLayout>
</template>
