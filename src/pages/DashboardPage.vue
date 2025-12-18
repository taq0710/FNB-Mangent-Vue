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
    <h1>Dashboard</h1>

    <div class="cards">
      <div class="card">
        <h3>Tổng doanh thu</h3>
        <p class="amount">
          {{
            new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(totalRevenue)
          }}
        </p>
      </div>
      <div class="card">
        <h3>Sản phẩm bán ra</h3>
        <p class="amount">{{ totalProductsSold.toLocaleString("vi-VN") }}</p>
      </div>
      <div class="card">
        <h3>Nhân viên</h3>
        <p class="amount">{{ totalEmployees }}</p>
      </div>
    </div>

    <div class="charts">
      <RevenueChart />
      <ProductSoldChart />
    </div>
  </DefaultLayout>
</template>

<style scoped>
.cards {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.card {
  flex: 1;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card h3 {
  margin: 0 0 10px 0;
  color: #666;
  font-size: 14px;
  font-weight: normal;
}

.card .amount {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  color: #42b883;
}

.charts {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
