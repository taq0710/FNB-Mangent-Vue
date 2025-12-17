<script setup>
import { reactive } from "vue";
import { useProductStore } from "../../store/productStore";
import BaseInput from "../common/BaseInput.vue";
import NumberInput from "../common/NumberInput.vue";
import DateInput from "../common/DateInput.vue";
import Button from "../common/Button.vue";

const store = useProductStore();

const form = reactive({
  name: "",
  quantity: "",
  unit: "",
  price: "",
  importDate: "",
});

function addProduct() {
  store.addProduct({
    id: "SP" + String(Math.floor(Math.random() * 9999)).padStart(4, "0"),
    name: form.name,
    quantity: Number(form.quantity),
    unit: form.unit,
    price: Number(form.price),
    importDate: form.importDate,
  });

  // Reset form
  Object.keys(form).forEach((key) => (form[key] = ""));
}
</script>

<template>
  <div class="form">
    <h3>Thêm sản phẩm</h3>

    <BaseInput
      v-model="form.name"
      placeholder="Tên sản phẩm"
      label="Tên sản phẩm"
    />
    <NumberInput
      v-model="form.quantity"
      placeholder="Số lượng"
      label="Số lượng"
    />
    <BaseInput v-model="form.unit" placeholder="Đơn vị" label="Đơn vị" />
    <NumberInput
      v-model="form.price"
      placeholder="Giá sản phẩm"
      label="Giá (VNĐ)"
    />
    <DateInput v-model="form.importDate" label="Ngày nhập" />

    <Button @click="addProduct" variant="primary" full-width class="submit-button">
      Thêm
    </Button>
  </div>
</template>