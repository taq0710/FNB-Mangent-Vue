import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductStore = defineStore("productStore", () => {
  const products = ref([]);

  function addProduct(product) {
    products.value.push(product);
  }

  function deleteProduct(productId) {
    const index = products.value.findIndex((p) => p.id === productId);
    if (index > -1) {
      products.value.splice(index, 1);
    }
  }

  function updateProduct(productId, updatedProduct) {
    const index = products.value.findIndex((p) => p.id === productId);
    if (index > -1) {
      products.value[index] = { ...products.value[index], ...updatedProduct };
    }
  }

  return { products, addProduct, deleteProduct, updateProduct };
});
