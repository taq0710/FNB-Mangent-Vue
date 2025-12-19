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

const priceFilter = ref("");
const dateSort = ref<"none" | "oldest" | "newest">("none");
const priceSort = ref<"none" | "low" | "high">("none");

const filteredAndSortedProducts = computed(() => {
  let result = [...products.value];

  if (priceFilter.value) {
    const filterValue = Number(priceFilter.value);
    result = result.filter((p) => p.price <= filterValue);
  }

  if (dateSort.value !== "none") {
    result.sort((a, b) => {
      const dateA = new Date(a.importDate).getTime();
      const dateB = new Date(b.importDate).getTime();
      return dateSort.value === "oldest" ? dateA - dateB : dateB - dateA;
    });
  }

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
  <div class="overflow-x-auto bg-white rounded shadow-sm md:rounded-lg">
    <div class="p-5 bg-gray-50 border-b border-gray-200 flex flex-col gap-5 items-end md:flex-row md:flex-wrap">
      <div class="flex flex-col gap-2 min-w-[200px]">
        <label class="text-xs font-semibold text-gray-700">Lọc theo giá tối đa:</label>
        <NumberInput
          v-model="priceFilter"
          placeholder="Nhập giá tối đa"
          label=""
        />
      </div>

      <div class="flex flex-col gap-2 min-w-[200px]">
        <label class="text-xs font-semibold text-gray-700">Sắp xếp theo ngày:</label>
        <select 
          v-model="dateSort" 
          class="w-full p-2.5 border border-gray-300 rounded text-sm bg-white cursor-pointer transition-colors box-border focus:outline-none focus:border-primary"
        >
          <option value="none">Không sắp xếp</option>
          <option value="oldest">Cũ nhất → Mới nhất</option>
          <option value="newest">Mới nhất → Cũ nhất</option>
        </select>
      </div>

      <div class="flex flex-col gap-2 min-w-[200px]">
        <label class="text-xs font-semibold text-gray-700">Sắp xếp theo giá:</label>
        <select 
          v-model="priceSort" 
          class="w-full p-2.5 border border-gray-300 rounded text-sm bg-white cursor-pointer transition-colors box-border focus:outline-none focus:border-primary"
        >
          <option value="none">Không sắp xếp</option>
          <option value="low">Thấp → Cao</option>
          <option value="high">Cao → Thấp</option>
        </select>
      </div>

      <Button @click="resetFilters" variant="primary" class="reset-btn">
        Đặt lại
      </Button>
    </div>

    <table class="w-full border-collapse text-xs md:text-sm">
      <thead class="bg-gradient-to-r from-primary to-primary-dark text-white">
        <tr>
          <th class="py-2.5 px-2 text-left font-semibold uppercase text-xs tracking-wider md:p-4">Mã</th>
          <th class="py-2.5 px-2 text-left font-semibold uppercase text-xs tracking-wider md:p-4">Tên</th>
          <th class="py-2.5 px-2 text-left font-semibold uppercase text-xs tracking-wider md:p-4">Số lượng</th>
          <th class="py-2.5 px-2 text-left font-semibold uppercase text-xs tracking-wider md:p-4">Đơn vị</th>
          <th class="py-2.5 px-2 text-left font-semibold uppercase text-xs tracking-wider md:p-4">Giá</th>
          <th class="py-2.5 px-2 text-left font-semibold uppercase text-xs tracking-wider md:p-4">Ngày nhập</th>
          <th class="py-2.5 px-2 text-left font-semibold uppercase text-xs tracking-wider md:p-4">Thao tác</th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="!filteredAndSortedProducts || filteredAndSortedProducts.length === 0">
          <td colspan="7" class="p-10 text-center">
            <div class="text-gray-400 italic">
              Chưa có dữ liệu sản phẩm. Vui lòng thêm sản phẩm hoặc đợi dữ liệu
              được tải.
            </div>
          </td>
        </tr>
        <template v-for="product in filteredAndSortedProducts" :key="product.id">
          <tr 
            v-if="editingProduct !== product.id" 
            class="border-b border-gray-200 transition-colors hover:bg-gray-50 last:border-b-0"
          >
            <td class="py-2.5 px-2 text-left font-semibold text-primary font-mono md:p-3.5 md:px-4">{{ product.id }}</td>
            <td class="py-2.5 px-2 text-left font-semibold text-gray-800 md:p-3.5 md:px-4">{{ product.name }}</td>
            <td class="py-2.5 px-2 text-left font-semibold text-emerald-600 md:p-3.5 md:px-4">{{ product.quantity }}</td>
            <td class="py-2.5 px-2 text-left text-gray-800 md:p-3.5 md:px-4">{{ product.unit }}</td>
            <td class="py-2.5 px-2 text-left font-semibold text-danger-dark md:p-3.5 md:px-4">{{ formatPrice(product.price) }}</td>
            <td class="py-2.5 px-2 text-left text-gray-500 text-xs md:p-3.5 md:px-4">{{ formatDate(product.importDate) }}</td>
            <td class="py-2.5 px-2 whitespace-nowrap md:p-3.5 md:px-4">
              <Button @click="showDetails(product)" variant="primary" size="small" class="mr-1.5">
                Chi tiết
              </Button>
              <template v-if="isUserAdmin">
                <Button @click="startEdit(product)" variant="edit" size="small" class="mr-1.5">
                  Sửa
                </Button>
                <Button @click="deleteProduct(product.id)" variant="delete" size="small" class="mr-1.5">
                  Xóa
                </Button>
              </template>
            </td>
          </tr>
          <tr v-else class="border-b border-gray-200">
            <td class="p-2 font-semibold text-primary font-mono">{{ product.id }}</td>
            <td class="p-2">
              <div class="mb-0">
                <BaseInput
                  v-model="editForm.name"
                  label=""
                  placeholder="Tên sản phẩm"
                />
              </div>
            </td>
            <td class="p-2">
              <div class="mb-0">
                <NumberInput
                  v-model="editForm.quantity"
                  label=""
                  placeholder="Số lượng"
                  class="mb-3"
                />
              </div>
            </td>
            <td class="p-2">
              <div class="mb-0">
                <BaseInput
                  v-model="editForm.unit"
                  label=""
                  placeholder="Đơn vị"
                />
              </div>
            </td>
            <td class="p-2">
              <div class="mb-0">
                <NumberInput
                  v-model="editForm.price"
                  label=""
                  placeholder="Giá"
                  class="mb-3"
                />
              </div>
            </td>
            <td class="p-2">
              <div class="mb-0">
                <DateInput v-model="editForm.importDate" label="" />
              </div>
            </td>
            <td class="p-2 whitespace-nowrap">
              <Button @click="saveEdit(product.id)" variant="save" size="small" class="mr-1.5">
                Lưu
              </Button>
              <Button @click="cancelEdit" variant="cancel" size="small" class="mr-1.5">
                Hủy
              </Button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <Modal
      :show="showDetailModal"
      title="Chi tiết sản phẩm"
      @close="showDetailModal = false"
    >
      <div v-if="selectedProduct" class="flex flex-col gap-3">
        <div class="flex justify-between pb-2 border-b border-gray-100">
          <label class="font-semibold text-gray-500">Mã sản phẩm:</label>
          <span class="text-gray-800">{{ selectedProduct.id }}</span>
        </div>
        <div class="flex justify-between pb-2 border-b border-gray-100">
          <label class="font-semibold text-gray-500">Tên sản phẩm:</label>
          <span class="text-gray-800">{{ selectedProduct.name }}</span>
        </div>
        <div class="flex justify-between pb-2 border-b border-gray-100">
          <label class="font-semibold text-gray-500">Số lượng:</label>
          <span class="text-gray-800">{{ selectedProduct.quantity }} {{ selectedProduct.unit }}</span>
        </div>
        <div class="flex justify-between mt-2 border-b-0 text-lg">
          <label class="font-semibold text-gray-500">Đơn giá:</label>
          <span class="text-danger-dark font-bold">{{ formatPrice(selectedProduct.price) }}</span>
        </div>
        <div class="flex justify-between pb-2 border-b border-gray-100">
          <label class="font-semibold text-gray-500">Ngày nhập:</label>
          <span class="text-gray-800">{{ formatDate(selectedProduct.importDate) }}</span>
        </div>
      </div>
    </Modal>
  </div>
</template>

<style scoped>
.filter-controls :deep(.mb-3) {
  margin-bottom: 0;
}
</style>
