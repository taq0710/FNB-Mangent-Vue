<template>
  <div class="chart-container">
    <h3>Doanh thu</h3>
    <div class="chart-controls">
      <button
        v-for="period in periods"
        :key="period"
        @click="selectedPeriod = period"
        :class="{ active: selectedPeriod === period }"
      >
        {{ periodLabels[period] }}
      </button>
    </div>
    <div class="chart-wrapper">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

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
  const data = store.revenue.value?.[selectedPeriod.value] || [];

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

<style scoped>
.chart-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.chart-controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.chart-controls button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.chart-controls button:hover {
  background: #f0f0f0;
}

.chart-controls button.active {
  background: #42b883;
  color: white;
  border-color: #42b883;
}

.chart-wrapper {
  height: 300px;
}
</style>
