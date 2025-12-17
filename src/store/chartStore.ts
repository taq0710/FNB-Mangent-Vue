import { defineStore } from "pinia";
import { ref } from "vue";

interface RevenueData {
  week: Array<{ date: string; amount: number }>;
  month: Array<{ month: string; amount: number }>;
  year: Array<{ year: number; amount: number }>;
}

interface ProductsSoldData {
  day: Array<{ date: string; quantity: number }>;
  week: Array<{ week: string; quantity: number }>;
  month: Array<{ month: string; quantity: number }>;
  year: Array<{ year: number; quantity: number }>;
}

export const useChartStore = defineStore("chartStore", () => {
  const revenue = ref<RevenueData>({
    week: [],
    month: [],
    year: [],
  });

  const productsSold = ref<ProductsSoldData>({
    day: [],
    week: [],
    month: [],
    year: [],
  });

  return { revenue, productsSold };
});

