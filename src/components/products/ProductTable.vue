<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useProductStore } from "../../store/productStore";
import BaseInput from "../common/BaseInput.vue";
import NumberInput from "../common/NumberInput.vue";
import DateInput from "../common/DateInput.vue";
import Button from "../common/Button.vue";
import Modal from "../common/Modal.vue";
import type { Product } from "../../store/productStore";
import { isAdmin } from "../../services/authService";

const productStore = useProductStore();
const { products } = storeToRefs(productStore);

const isUserAdmin = ref(false);
const showDetailModal = ref(false);
const selectedProduct = ref<Product | null>(null);

onMounted(async () => {
  isUserAdmin.value = await isAdmin();
});

function showDetails(product: Product) {
  selectedProduct.value = product;
  showDetailModal.value = true;
}

const editingProduct = ref<string | null>(null);
const editForm = ref({
  name: "",
  quantity: "",
  unit: "",
  price: "",
  importDate: "",
});

// Filter và Sort
const priceFilter = ref("");
const dateSort = ref<"none" | "oldest" | "newest">("none");
const priceSort = ref<"none" | "low" | "high">("none");

const filteredAndSortedProducts = computed(() => {
  let result = [...products.value];

  // Filter theo giá
  if (priceFilter.value) {
    const filterValue = Number(priceFilter.value);
    result = result.filter((p) => p.price <= filterValue);
  }

  // Sort theo ngày
  if (dateSort.value !== "none") {
    result.sort((a, b) => {
      const dateA = new Date(a.importDate).getTime();
      const dateB = new Date(b.importDate).getTime();
      return dateSort.value === "oldest" ? dateA - dateB : dateB - dateA;
    });
  }

  // Sort theo giá
  if (priceSort.value !== "none") {
    result.sort((a, b) => {
      return priceSort.value === "low" ? a.price - b.price : b.price - a.price;
    });
  }

  return result;
});

function startEdit(product: Product) {
  editingProduct.value = product.id;
  editForm.value = {
    name: product.name,
    quantity: product.quantity.toString(),
    unit: product.unit,
    price: product.price.toString(),
    importDate: product.importDate,
  };
}

function cancelEdit() {
  editingProduct.value = null;
  editForm.value = {
    name: "",
    quantity: "",
    unit: "",
    price: "",
    importDate: "",
  };
}

function saveEdit(productId: string) {
  productStore.updateProduct(productId, {
    name: editForm.value.name,
    quantity: Number(editForm.value.quantity),
    unit: editForm.value.unit,
    price: Number(editForm.value.price),
    importDate: editForm.value.importDate,
  });
  cancelEdit();
}

function deleteProduct(productId: string) {
  if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
    productStore.deleteProduct(productId);
  }
}

function formatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN");
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

function resetFilters() {
  priceFilter.value = "";
  dateSort.value = "none";
  priceSort.value = "none";
}
</script>

<template>
  <div class="table-container">
    <!-- Filter và Sort Controls -->
    <div class="filter-controls">
      <div class="filter-group">
        <label>Lọc theo giá tối đa:</label>
        <NumberInput
          v-model="priceFilter"
          placeholder="Nhập giá tối đa"
          label=""
        />
      </div>

      <div class="sort-group">
        <label>Sắp xếp theo ngày:</label>
        <select v-model="dateSort" class="sort-select">
          <option value="none">Không sắp xếp</option>
          <option value="oldest">Cũ nhất → Mới nhất</option>
          <option value="newest">Mới nhất → Cũ nhất</option>
        </select>
      </div>

      <div class="sort-group">
        <label>Sắp xếp theo giá:</label>
        <select v-model="priceSort" class="sort-select">
          <option value="none">Không sắp xếp</option>
          <option value="low">Thấp → Cao</option>
          <option value="high">Cao → Thấp</option>
        </select>
      </div>

      <Button @click="resetFilters" variant="primary" class="reset-btn">
        Đặt lại
      </Button>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th>Mã</th>
          <th>Tên</th>
          <th>Số lượng</th>
          <th>Đơn vị</th>
          <th>Giá</th>
          <th>Ngày nhập</th>
          <th>Thao tác</th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="!filteredAndSortedProducts || filteredAndSortedProducts.length === 0" class="empty-row">
          <td colspan="7">
            <div class="empty-message">
              Chưa có dữ liệu sản phẩm. Vui lòng thêm sản phẩm hoặc đợi dữ liệu
              được tải.
            </div>
          </td>
        </tr>
        <template v-for="product in filteredAndSortedProducts" :key="product.id">
          <tr v-if="editingProduct !== product.id" class="data-row">
            <td class="code-cell">{{ product.id }}</td>
            <td class="name-cell">{{ product.name }}</td>
            <td class="number-cell">{{ product.quantity }}</td>
            <td>{{ product.unit }}</td>
            <td class="price-cell">{{ formatPrice(product.price) }}</td>
            <td class="date-cell">{{ formatDate(product.importDate) }}</td>
            <td class="action-cell">
              <Button @click="showDetails(product)" variant="primary" size="small">
                Chi tiết
              </Button>
              <template v-if="isUserAdmin">
                <Button @click="startEdit(product)" variant="edit" size="small">
                  Sửa
                </Button>
                <Button @click="deleteProduct(product.id)" variant="delete" size="small">
                  Xóa
                </Button>
              </template>
            </td>
          </tr>
          <tr v-else class="edit-row">
            <td class="code-cell">{{ product.id }}</td>
            <td>
              <BaseInput
                v-model="editForm.name"
                label=""
                placeholder="Tên sản phẩm"
              />
            </td>
            <td>
              <NumberInput
                v-model="editForm.quantity"
                label=""
                placeholder="Số lượng"
              />
            </td>
            <td>
              <BaseInput
                v-model="editForm.unit"
                label=""
                placeholder="Đơn vị"
              />
            </td>
            <td>
              <NumberInput
                v-model="editForm.price"
                label=""
                placeholder="Giá"
              />
            </td>
            <td>
              <DateInput v-model="editForm.importDate" label="" />
            </td>
            <td class="action-cell">
              <Button @click="saveEdit(product.id)" variant="save" size="small">
                Lưu
              </Button>
              <Button @click="cancelEdit" variant="cancel" size="small">
                Hủy
              </Button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <!-- Detail Modal -->
    <Modal
      :show="showDetailModal"
      title="Chi tiết sản phẩm"
      @close="showDetailModal = false"
    >
      <div v-if="selectedProduct" class="detail-content">
        <div class="detail-item">
          <label>Mã sản phẩm:</label>
          <span>{{ selectedProduct.id }}</span>
        </div>
        <div class="detail-item">
          <label>Tên sản phẩm:</label>
          <span>{{ selectedProduct.name }}</span>
        </div>
        <div class="detail-item">
          <label>Số lượng:</label>
          <span>{{ selectedProduct.quantity }} {{ selectedProduct.unit }}</span>
        </div>
        <div class="detail-item highlight">
          <label>Đơn giá:</label>
          <span>{{ formatPrice(selectedProduct.price) }}</span>
        </div>
        <div class="detail-item">
          <label>Ngày nhập:</label>
          <span>{{ formatDate(selectedProduct.importDate) }}</span>
        </div>
      </div>
    </Modal>
  </div>
</template>

<style scoped>
.detail-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
}

.detail-item label {
  font-weight: 600;
  color: var(--text-muted);
}

.detail-item span {
  color: var(--text-main);
}

.detail-item.highlight {
  margin-top: 8px;
  border-bottom: none;
  font-size: 1.1em;
}

.detail-item.highlight span {
  color: var(--danger-dark);
  font-weight: 700;
}

.table-container {
  overflow-x: auto;
  background: var(--bg-card);
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
}

.filter-controls {
  padding: 20px;
  background: #f9fafb;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: flex-end;
}

.filter-controls .filter-group :deep(.input-wrapper),
.filter-controls .sort-group :deep(.input-wrapper) {
  margin-bottom: 0;
}

.filter-group,
.sort-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 200px;
}

.filter-group label,
.sort-group label {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

.sort-select {
  width: 100%;
  padding: 9px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.sort-select:focus {
  outline: none;
  border-color: var(--primary-color);
}

.reset-btn {
  width: auto;
  padding-inline: 16px;
  margin-left: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.data-table thead {
  background: var(--bg-table-header);
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
  border-bottom: 1px solid var(--border-color);
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
  color: var(--text-main);
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
  text-align: left;
  font-weight: 600;
  color: var(--primary-color);
}

.name-cell {
  text-align: left;
  font-weight: 600;
  color: #1f2937;
}

.number-cell {
  text-align: left;
  font-weight: 600;
  color: #059669;
}

.price-cell {
  text-align: left;
  font-weight: 600;
  color: var(--danger-dark);
}

.date-cell {
  color: var(--text-muted);
  font-size: 13px;
}

.action-cell {
  white-space: nowrap;
}

.action-cell .btn {
  margin-right: 6px;
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

  .filter-controls {
    flex-direction: column;
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
