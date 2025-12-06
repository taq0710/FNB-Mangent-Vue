<template>
    <div class="chart-container">
        <h3>Sản phẩm bán ra</h3>
        <div class="chart-controls">
            <button v-for="period in periods" :key="period" @click="selectedPeriod = period"
                :class="{ active: selectedPeriod === period }">
                {{ periodLabels[period] }}
            </button>
        </div>
        <div class="chart-wrapper">
            <Bar :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { Bar } from "vue-chartjs";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { useChartStore } from "../../store/chartStore";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const store = useChartStore();
const selectedPeriod = ref("day");

const periods = ["day", "week", "month", "year"];
const periodLabels = {
    day: "Theo ngày",
    week: "Theo tuần",
    month: "Theo tháng",
    year: "Theo năm",
};

const chartData = computed(() => {
    const data = store.productsSold.value?.[selectedPeriod.value] || [];

    if (selectedPeriod.value === "day") {
        return {
            labels: data.map((item) => {
                const date = new Date(item.date);
                return `${date.getDate()}/${date.getMonth() + 1}`;
            }),
            datasets: [
                {
                    label: "Số lượng sản phẩm",
                    data: data.map((item) => item.quantity),
                    backgroundColor: "rgba(54, 162, 235, 0.6)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1,
                },
            ],
        };
    } else if (selectedPeriod.value === "week") {
        return {
            labels: data.map((item) => item.week),
            datasets: [
                {
                    label: "Số lượng sản phẩm",
                    data: data.map((item) => item.quantity),
                    backgroundColor: "rgba(54, 162, 235, 0.6)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1,
                },
            ],
        };
    } else if (selectedPeriod.value === "month") {
        return {
            labels: data.map((item) => item.month),
            datasets: [
                {
                    label: "Số lượng sản phẩm",
                    data: data.map((item) => item.quantity),
                    backgroundColor: "rgba(54, 162, 235, 0.6)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1,
                },
            ],
        };
    } else {
        return {
            labels: data.map((item) => item.year.toString()),
            datasets: [
                {
                    label: "Số lượng sản phẩm",
                    data: data.map((item) => item.quantity),
                    backgroundColor: "rgba(54, 162, 235, 0.6)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1,
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
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                stepSize: 1,
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
