import { defineStore } from "pinia";
import { ref } from "vue";

export interface Product {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price: number;
  importDate: string;
}

export const useProductStore = defineStore("productStore", () => {
  const products = ref<Product[]>([]);

  function addProduct(product: Product): void {
    products.value.push(product);
  }

  function deleteProduct(productId: string): void {
    const index = products.value.findIndex((p) => p.id === productId);
    if (index > -1) {
      products.value.splice(index, 1);
    }
  }

  function updateProduct(productId: string, updatedProduct: Partial<Product>): void {
    const index = products.value.findIndex((p) => p.id === productId);
    if (index > -1) {
      products.value[index] = { ...products.value[index], ...updatedProduct };
    }
  }

  return { products, addProduct, deleteProduct, updateProduct };
});

