import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductStore = defineStore("productStore", () => {
  const products = ref([]);

  function addProduct(product) {
    products.value.push(product);
  }

  return { products, addProduct };
});
