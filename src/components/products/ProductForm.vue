<script setup>
import { ref } from "vue";
import { useProductStore } from "../../store/productStore";
import BaseInput from "../common/BaseInput.vue";
import NumberInput from "../common/NumberInput.vue";
import DateInput from "../common/DateInput.vue";

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

    <BaseInput v-model="name" placeholder="Tên sản phẩm" label="Tên sản phẩm" />
    <NumberInput v-model="quantity" placeholder="Số lượng" label="Số lượng" />
    <BaseInput v-model="unit" placeholder="Đơn vị" label="Đơn vị" />
    <DateInput v-model="importDate" label="Ngày nhập" />

    <button @click="addProduct" class="submit-button">Thêm</button>
  </div>
</template>

<style scoped>
.form {
  margin-bottom: 20px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form h3 {
  margin-bottom: 20px;
  color: #333;
}

.submit-button {
  width: 100%;
  padding: 12px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 10px;
}

.submit-button:hover {
  background: #35a372;
}
</style>
