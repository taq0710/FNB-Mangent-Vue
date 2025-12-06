import { defineStore } from "pinia";
import { ref } from "vue";

export const useChartStore = defineStore("chartStore", () => {
  const revenue = ref({
    week: [],
    month: [],
    year: [],
  });

  const productsSold = ref({
    day: [],
    week: [],
    month: [],
    year: [],
  });

  return { revenue, productsSold };
});
