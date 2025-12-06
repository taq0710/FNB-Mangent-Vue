<script setup>
import { ref } from "vue";
import { useProductStore } from "../../store/productStore";

const store = useProductStore();

const name = ref("");
const quantity = ref("");
const unit = ref("");
const importDate = ref("");

function addProduct() {
  store.addProduct({
    id: "SP" + Math.floor(Math.random() * 9999),
    name: name.value,
    quantity: Number(quantity.value),
    unit: unit.value,
    importDate: importDate.value,
  });

  name.value = "";
  quantity.value = "";
  unit.value = "";
  importDate.value = "";
}
</script>

<template>
  <div class="form">
    <h3>Thêm sản phẩm</h3>

    <input v-model="name" placeholder="Tên sản phẩm" />
    <input v-model="quantity" type="number" placeholder="Số lượng" />
    <input v-model="unit" placeholder="Đơn vị" />
    <input v-model="importDate" type="date" />

    <button @click="addProduct">Thêm</button>
  </div>
</template>

<style>
.form {
  margin-bottom: 20px;
}
</style>
