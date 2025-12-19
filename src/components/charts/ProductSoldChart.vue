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
import Button from "../common/Button.vue";

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
    const data = store.productsSold?.[selectedPeriod.value] || [];

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

<template>
    <div class="bg-white p-5 rounded-lg shadow-sm mb-5">
        <h3 class="text-lg font-semibold mb-5">Sản phẩm bán ra</h3>
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
            <Bar :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>
