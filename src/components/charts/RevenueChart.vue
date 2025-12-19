<script setup>
import { computed, ref } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useChartStore } from "../../store/chartStore";
import Button from "../common/Button.vue";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const store = useChartStore();
const selectedPeriod = ref("week");

const periods = ["week", "month", "year"];
const periodLabels = {
  week: "Theo tuần",
  month: "Theo tháng",
  year: "Theo năm",
};

const chartData = computed(() => {
  const data = store.revenue?.[selectedPeriod.value] || [];

  if (selectedPeriod.value === "week") {
    return {
      labels: data.map((item) => {
        const date = new Date(item.date);
        return `${date.getDate()}/${date.getMonth() + 1}`;
      }),
      datasets: [
        {
          label: "Doanh thu (VNĐ)",
          data: data.map((item) => item.amount),
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.4,
        },
      ],
    };
  } else if (selectedPeriod.value === "month") {
    return {
      labels: data.map((item) => item.month),
      datasets: [
        {
          label: "Doanh thu (VNĐ)",
          data: data.map((item) => item.amount),
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.4,
        },
      ],
    };
  } else {
    return {
      labels: data.map((item) => item.year.toString()),
      datasets: [
        {
          label: "Doanh thu (VNĐ)",
          data: data.map((item) => item.amount),
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.4,
        },
      ],
    };
  }
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(context.parsed.y);
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function (value) {
          return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            notation: "compact",
          }).format(value);
        },
      },
    },
  },
};
</script>

<template>
  <div class="bg-white p-5 rounded-lg shadow-sm mb-5">
    <h3 class="text-lg font-semibold mb-5">Doanh thu</h3>
    <div class="flex gap-2.5 mb-5">
      <Button
        v-for="period in periods"
        :key="period"
        @click="selectedPeriod = period"
        :variant="selectedPeriod === period ? 'primary' : 'secondary'"
        size="small"
      >
        {{ periodLabels[period] }}
      </Button>
    </div>
    <div class="h-[300px]">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
