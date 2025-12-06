<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useProductStore } from "../../store/productStore";
import BaseInput from "../common/BaseInput.vue";
import NumberInput from "../common/NumberInput.vue";
import DateInput from "../common/DateInput.vue";

const productStore = useProductStore();
const { products } = storeToRefs(productStore);

const editingProduct = ref(null);
const editForm = ref({
  name: "",
  quantity: "",
  unit: "",
  importDate: "",
});

function startEdit(product) {
  editingProduct.value = product.id;
  editForm.value = {
    name: product.name,
    quantity: product.quantity.toString(),
    unit: product.unit,
    importDate: product.importDate,
  };
}

function cancelEdit() {
  editingProduct.value = null;
  editForm.value = {
    name: "",
    quantity: "",
    unit: "",
    importDate: "",
  };
}

function saveEdit(productId) {
  productStore.updateProduct(productId, {
    name: editForm.value.name,
    quantity: Number(editForm.value.quantity),
    unit: editForm.value.unit,
    importDate: editForm.value.importDate,
  });
  cancelEdit();
}

function deleteProduct(productId) {
  if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
    productStore.deleteProduct(productId);
  }
}

</script>
<template>
  <div class="table-container">
    <table class="data-table">
      <thead>
        <tr>
          <th>Mã</th>
          <th>Tên</th>
          <th>Số lượng</th>
          <th>Đơn vị</th>
          <th>Ngày nhập</th>
          <th>Thao tác</th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="!products || products.length === 0" class="empty-row">
          <td colspan="6">
            <div class="empty-message">
              Chưa có dữ liệu sản phẩm. Vui lòng thêm sản phẩm hoặc đợi dữ liệu được tải.
            </div>
          </td>
        </tr>
        <template v-for="product in products" :key="product.id">
          <tr v-if="editingProduct !== product.id" class="data-row">
            <td class="code-cell">{{ product.id }}</td>
            <td class="name-cell">{{ product.name }}</td>
            <td class="number-cell">{{ product.quantity }}</td>
            <td>{{ product.unit }}</td>
            <td class="date-cell">{{ formatDate(product.importDate) }}</td>
            <td class="action-cell">
              <button @click="startEdit(product)" class="btn-edit">Sửa</button>
              <button @click="deleteProduct(product.id)" class="btn-delete">Xóa</button>
            </td>
          </tr>
          <tr v-else class="edit-row">
            <td class="code-cell">{{ product.id }}</td>
            <td>
              <BaseInput v-model="editForm.name" label="" placeholder="Tên sản phẩm" />
            </td>
            <td>
              <NumberInput v-model="editForm.quantity" label="" placeholder="Số lượng" />
            </td>
            <td>
              <BaseInput v-model="editForm.unit" label="" placeholder="Đơn vị" />
            </td>
            <td>
              <DateInput v-model="editForm.importDate" label="" />
            </td>
            <td class="action-cell">
              <button @click="saveEdit(product.id)" class="btn-save">Lưu</button>
              <button @click="cancelEdit" class="btn-cancel">Hủy</button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
<script>
  export default {
  methods: {
    formatDate(dateString) {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN");
    },
  },
};

</script>

<style scoped>
.table-container {
  overflow-x: auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.data-table thead {
  background: linear-gradient(135deg, #42b883 0%, #35a372 100%);
  color: white;
}

.data-table th {
  padding: 16px;
  text-align: left;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.5px;
}

.data-table tbody tr {
  border-bottom: 1px solid #e5e7eb;
  transition: background-color 0.2s;
}

.data-table tbody tr:hover {
  background-color: #f9fafb;
}

.data-table tbody tr:last-child {
  border-bottom: none;
}

.data-table td {
  padding: 14px 16px;
  color: #374151;
}

.empty-row td {
  padding: 40px;
  text-align: center;
}

.empty-message {
  color: #9ca3af;
  font-style: italic;
}

.code-cell {
  font-weight: 600;
  color: #42b883;
  font-family: "Courier New", monospace;
}

.name-cell {
  font-weight: 500;
  color: #1f2937;
}

.number-cell {
  text-align: right;
  font-weight: 600;
  color: #059669;
}

.date-cell {
  color: #6b7280;
  font-size: 13px;
}

.action-cell {
  white-space: nowrap;
}

.btn-edit,
.btn-delete,
.btn-save,
.btn-cancel {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  margin-right: 6px;
  transition: all 0.2s;
}

.btn-edit {
  background: #42b883;
  color: white;
}

.btn-edit:hover {
  background: #35a372;
}

.btn-delete {
  background: #ef4444;
  color: white;
}

.btn-delete:hover {
  background: #dc2626;
}

.btn-save {
  background: #3b82f6;
  color: white;
}

.btn-save:hover {
  background: #2563eb;
}

.btn-cancel {
  background: #6b7280;
  color: white;
}

.btn-cancel:hover {
  background: #4b5563;
}

.edit-row td {
  padding: 8px;
}

.edit-row .base-input {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .table-container {
    border-radius: 4px;
  }

  .data-table {
    font-size: 12px;
  }

  .data-table th,
  .data-table td {
    padding: 10px 8px;
  }
}
</style>


