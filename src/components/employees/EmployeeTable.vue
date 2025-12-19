<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useEmployeeStore } from "../../store/employeeStore";
import BaseInput from "../common/BaseInput.vue";
import NumberInput from "../common/NumberInput.vue";
import DateInput from "../common/DateInput.vue";
import Button from "../common/Button.vue";
import Modal from "../common/Modal.vue";
import type { Employee } from "../../store/employeeStore";
import { isAdmin } from "../../services/authService";

const employeeStore = useEmployeeStore();
const { employees } = storeToRefs(employeeStore);

const isUserAdmin = ref(false);
const showDetailModal = ref(false);
const selectedEmployee = ref<Employee | null>(null);

onMounted(async () => {
  isUserAdmin.value = await isAdmin();
});

function showDetails(employee: Employee) {
  selectedEmployee.value = employee;
  showDetailModal.value = true;
}

const editingEmployee = ref<string | null>(null);
const editForm = ref({
  name: "",
  birthDate: "",
  citizenId: "",
  salaryPerHour: "",
  monthlyHours: "",
});

const salaryFilter = ref("");
const birthDateSort = ref<"none" | "oldest" | "newest">("none");
const salarySort = ref<"none" | "low" | "high">("none");

const filteredAndSortedEmployees = computed(() => {
  let result = [...employees.value];

  if (salaryFilter.value) {
    const filterValue = Number(salaryFilter.value);
    result = result.filter((e) => e.totalSalary <= filterValue);
  }

  if (birthDateSort.value !== "none") {
    result.sort((a, b) => {
      const dateA = new Date(a.birthDate).getTime();
      const dateB = new Date(b.birthDate).getTime();
      return birthDateSort.value === "oldest" ? dateA - dateB : dateB - dateA;
    });
  }

  if (salarySort.value !== "none") {
    result.sort((a, b) => {
      return salarySort.value === "low"
        ? a.totalSalary - b.totalSalary
        : b.totalSalary - a.totalSalary;
    });
  }

  return result;
});

function startEdit(employee: Employee) {
  editingEmployee.value = employee.employeeId;
  editForm.value = {
    name: employee.name,
    birthDate: employee.birthDate,
    citizenId: employee.citizenId,
    salaryPerHour: employee.salaryPerHour.toString(),
    monthlyHours: employee.monthlyHours.toString(),
  };
}

function cancelEdit() {
  editingEmployee.value = null;
  editForm.value = {
    name: "",
    birthDate: "",
    citizenId: "",
    salaryPerHour: "",
    monthlyHours: "",
  };
}

function saveEdit(employeeId: string) {
  employeeStore.updateEmployee(employeeId, {
    name: editForm.value.name,
    birthDate: editForm.value.birthDate,
    citizenId: editForm.value.citizenId,
    salaryPerHour: Number(editForm.value.salaryPerHour),
    monthlyHours: Number(editForm.value.monthlyHours),
  });
  cancelEdit();
}

function deleteEmployee(employeeId: string) {
  if (confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
    employeeStore.deleteEmployee(employeeId);
  }
}

function formatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN");
}

function resetFilters() {
  salaryFilter.value = "";
  birthDateSort.value = "none";
  salarySort.value = "none";
}
</script>

<template>
  <div class="overflow-x-auto bg-white rounded shadow-sm md:rounded-lg">
    <div class="p-5 bg-gray-50 border-b border-gray-200 flex flex-col gap-5 items-end md:flex-row md:flex-wrap">
      <div class="flex flex-col gap-2 min-w-[200px]">
        <label class="text-xs font-semibold text-gray-700">Lọc theo lương tối đa:</label>
        <NumberInput
          v-model="salaryFilter"
          placeholder="Nhập lương tối đa"
          label=""
        />
      </div>

      <div class="flex flex-col gap-2 min-w-[200px]">
        <label class="text-xs font-semibold text-gray-700">Sắp xếp theo ngày sinh:</label>
        <select 
          v-model="birthDateSort" 
          class="w-full p-2.5 border border-gray-300 rounded text-sm bg-white cursor-pointer transition-colors box-border h-[42px] focus:outline-none focus:border-primary"
        >
          <option value="none">Không sắp xếp</option>
          <option value="oldest">Cũ nhất → Mới nhất</option>
          <option value="newest">Mới nhất → Cũ nhất</option>
        </select>
      </div>

      <div class="flex flex-col gap-2 min-w-[200px]">
        <label class="text-xs font-semibold text-gray-700">Sắp xếp theo lương:</label>
        <select 
          v-model="salarySort" 
          class="w-full p-2.5 border border-gray-300 rounded text-sm bg-white cursor-pointer transition-colors box-border h-[42px] focus:outline-none focus:border-primary"
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
          <th class="py-2.5 px-2 text-left font-semibold uppercase text-xs tracking-wider md:p-4">Ngày sinh</th>
          <th class="py-2.5 px-2 text-left font-semibold uppercase text-xs tracking-wider md:p-4">CCCD</th>
          <th class="py-2.5 px-2 text-left font-semibold uppercase text-xs tracking-wider md:p-4">Lương/giờ</th>
          <th class="py-2.5 px-2 text-left font-semibold uppercase text-xs tracking-wider md:p-4">Giờ làm</th>
          <th class="py-2.5 px-2 text-left font-semibold uppercase text-xs tracking-wider md:p-4">Tổng lương</th>
          <th class="py-2.5 px-2 text-left font-semibold uppercase text-xs tracking-wider md:p-4">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="filteredAndSortedEmployees.length === 0">
          <td colspan="8" class="p-10 text-center">
            <div class="text-gray-400 italic">
              Chưa có dữ liệu nhân viên. Vui lòng thêm nhân viên hoặc đợi dữ liệu
              được tải.
            </div>
          </td>
        </tr>
        <template
          v-for="employee in filteredAndSortedEmployees"
          :key="employee.employeeId"
        >
          <tr
            v-if="editingEmployee !== employee.employeeId"
            class="border-b border-gray-200 transition-colors hover:bg-gray-50 last:border-b-0"
          >
            <td class="py-2.5 px-2 text-left font-semibold text-primary font-mono md:p-3.5 md:px-4">{{ employee.employeeId }}</td>
            <td class="py-2.5 px-2 text-left font-semibold text-gray-800 md:p-3.5 md:px-4">{{ employee.name }}</td>
            <td class="py-2.5 px-2 text-left text-gray-500 text-xs md:p-3.5 md:px-4">{{ formatDate(employee.birthDate) }}</td>
            <td class="py-2.5 px-2 text-left text-gray-500 text-xs font-mono md:p-3.5 md:px-4">{{ employee.citizenId }}</td>
            <td class="py-2.5 px-2 text-left font-semibold text-emerald-600 md:p-3.5 md:px-4">
              {{ employee.salaryPerHour.toLocaleString("vi-VN") }} đ
            </td>
            <td class="py-2.5 px-2 text-left font-semibold text-emerald-600 md:p-3.5 md:px-4">{{ employee.monthlyHours }}</td>
            <td class="py-2.5 px-2 text-left font-semibold text-danger-dark text-base md:p-3.5 md:px-4">
              {{ employee.totalSalary.toLocaleString("vi-VN") }} đ
            </td>
            <td class="py-2.5 px-2 whitespace-nowrap md:p-3.5 md:px-4">
              <Button @click="showDetails(employee)" variant="primary" size="small" class="mr-1.5">
                Chi tiết
              </Button>
              <template v-if="isUserAdmin">
                <Button @click="startEdit(employee)" variant="edit" size="small" class="mr-1.5">
                  Sửa
                </Button>
                <Button
                  @click="deleteEmployee(employee.employeeId)"
                  variant="delete"
                  size="small"
                  class="mr-1.5"
                >
                  Xóa
                </Button>
              </template>
            </td>
          </tr>
          <tr v-else class="border-b border-gray-200">
            <td class="p-2 font-semibold text-primary font-mono">{{ employee.employeeId }}</td>
            <td class="p-2">
              <div class="mb-0">
                <BaseInput
                  v-model="editForm.name"
                  label=""
                  placeholder="Tên nhân viên"
                />
              </div>
            </td>
            <td class="p-2">
              <div class="mb-0">
                <DateInput v-model="editForm.birthDate" label="" />
              </div>
            </td>
            <td class="p-2">
              <div class="mb-0">
                <BaseInput
                  v-model="editForm.citizenId"
                  label=""
                  placeholder="Số CCCD"
                />
              </div>
            </td>
            <td class="p-2">
              <div class="mb-0">
                <NumberInput
                  v-model="editForm.salaryPerHour"
                  label=""
                  placeholder="Lương/giờ"
                />
              </div>
            </td>
            <td class="p-2">
              <div class="mb-0">
                <NumberInput
                  v-model="editForm.monthlyHours"
                  label=""
                  placeholder="Giờ làm/tháng"
                />
              </div>
            </td>
            <td class="p-2 text-left font-semibold text-danger-dark text-base">
              {{
                (
                  Number(editForm.salaryPerHour) *
                  Number(editForm.monthlyHours)
                ).toLocaleString("vi-VN")
              }}
              đ
            </td>
            <td class="p-2 whitespace-nowrap">
              <Button @click="saveEdit(employee.employeeId)" variant="save" size="small" class="mr-1.5">
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
      title="Chi tiết nhân viên"
      @close="showDetailModal = false"
    >
      <div v-if="selectedEmployee" class="flex flex-col gap-3">
        <div class="flex justify-between pb-2 border-b border-gray-100">
          <label class="font-semibold text-gray-500">Mã nhân viên:</label>
          <span class="text-gray-800">{{ selectedEmployee.employeeId }}</span>
        </div>
        <div class="flex justify-between pb-2 border-b border-gray-100">
          <label class="font-semibold text-gray-500">Họ tên:</label>
          <span class="text-gray-800">{{ selectedEmployee.name }}</span>
        </div>
        <div class="flex justify-between pb-2 border-b border-gray-100">
          <label class="font-semibold text-gray-500">Ngày sinh:</label>
          <span class="text-gray-800">{{ formatDate(selectedEmployee.birthDate) }}</span>
        </div>
        <div class="flex justify-between pb-2 border-b border-gray-100">
          <label class="font-semibold text-gray-500">Số CCCD:</label>
          <span class="text-gray-800">{{ selectedEmployee.citizenId }}</span>
        </div>
        <div class="flex justify-between pb-2 border-b border-gray-100">
          <label class="font-semibold text-gray-500">Lương mỗi giờ:</label>
          <span class="text-gray-800">{{ selectedEmployee.salaryPerHour.toLocaleString("vi-VN") }} đ</span>
        </div>
        <div class="flex justify-between pb-2 border-b border-gray-100">
          <label class="font-semibold text-gray-500">Số giờ làm tháng:</label>
          <span class="text-gray-800">{{ selectedEmployee.monthlyHours }} giờ</span>
        </div>
        <div class="flex justify-between mt-2 border-b-0 text-lg">
          <label class="font-semibold text-gray-500">Tổng lương:</label>
          <span class="text-danger-dark font-bold">{{ selectedEmployee.totalSalary.toLocaleString("vi-VN") }} đ</span>
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
