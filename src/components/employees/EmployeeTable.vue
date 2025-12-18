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

// Filter và Sort
const salaryFilter = ref("");
const birthDateSort = ref<"none" | "oldest" | "newest">("none");
const salarySort = ref<"none" | "low" | "high">("none");

const filteredAndSortedEmployees = computed(() => {
  let result = [...employees.value];

  // Filter theo lương
  if (salaryFilter.value) {
    const filterValue = Number(salaryFilter.value);
    result = result.filter((e) => e.totalSalary <= filterValue);
  }

  // Sort theo ngày sinh
  if (birthDateSort.value !== "none") {
    result.sort((a, b) => {
      const dateA = new Date(a.birthDate).getTime();
      const dateB = new Date(b.birthDate).getTime();
      return birthDateSort.value === "oldest" ? dateA - dateB : dateB - dateA;
    });
  }

  // Sort theo lương
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
  <div class="table-container">
    <!-- Filter và Sort Controls -->
    <div class="filter-controls">
      <div class="filter-group">
        <label>Lọc theo lương tối đa:</label>
        <NumberInput
          v-model="salaryFilter"
          placeholder="Nhập lương tối đa"
          label=""
        />
      </div>

      <div class="sort-group">
        <label>Sắp xếp theo ngày sinh:</label>
        <select v-model="birthDateSort" class="sort-select">
          <option value="none">Không sắp xếp</option>
          <option value="oldest">Cũ nhất → Mới nhất</option>
          <option value="newest">Mới nhất → Cũ nhất</option>
        </select>
      </div>

      <div class="sort-group">
        <label>Sắp xếp theo lương:</label>
        <select v-model="salarySort" class="sort-select">
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
          <th>Ngày sinh</th>
          <th>CCCD</th>
          <th>Lương/giờ</th>
          <th>Giờ làm</th>
          <th>Tổng lương</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="filteredAndSortedEmployees.length === 0" class="empty-row">
          <td colspan="8">
            <div class="empty-message">
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
            class="data-row"
          >
            <td class="code-cell">{{ employee.employeeId }}</td>
            <td class="name-cell">{{ employee.name }}</td>
            <td class="date-cell">{{ formatDate(employee.birthDate) }}</td>
            <td class="id-cell">{{ employee.citizenId }}</td>
            <td class="money-cell">
              {{ employee.salaryPerHour.toLocaleString("vi-VN") }} đ
            </td>
            <td class="number-cell">{{ employee.monthlyHours }}</td>
            <td class="money-cell total">
              {{ employee.totalSalary.toLocaleString("vi-VN") }} đ
            </td>
            <td class="action-cell">
              <Button @click="showDetails(employee)" variant="primary" size="small">
                Chi tiết
              </Button>
              <template v-if="isUserAdmin">
                <Button @click="startEdit(employee)" variant="edit" size="small">
                  Sửa
                </Button>
                <Button
                  @click="deleteEmployee(employee.employeeId)"
                  variant="delete"
                  size="small"
                >
                  Xóa
                </Button>
              </template>
            </td>
          </tr>
          <tr v-else class="edit-row">
            <td class="code-cell">{{ employee.employeeId }}</td>
            <td>
              <BaseInput
                v-model="editForm.name"
                label=""
                placeholder="Tên nhân viên"
              />
            </td>
            <td>
              <DateInput v-model="editForm.birthDate" label="" />
            </td>
            <td>
              <BaseInput
                v-model="editForm.citizenId"
                label=""
                placeholder="Số CCCD"
              />
            </td>
            <td>
              <NumberInput
                v-model="editForm.salaryPerHour"
                label=""
                placeholder="Lương/giờ"
              />
            </td>
            <td>
              <NumberInput
                v-model="editForm.monthlyHours"
                label=""
                placeholder="Giờ làm/tháng"
              />
            </td>
            <td class="money-cell total">
              {{
                (
                  Number(editForm.salaryPerHour) *
                  Number(editForm.monthlyHours)
                ).toLocaleString("vi-VN")
              }}
              đ
            </td>
            <td class="action-cell">
              <Button @click="saveEdit(employee.employeeId)" variant="save" size="small">
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
      title="Chi tiết nhân viên"
      @close="showDetailModal = false"
    >
      <div v-if="selectedEmployee" class="detail-content">
        <div class="detail-item">
          <label>Mã nhân viên:</label>
          <span>{{ selectedEmployee.employeeId }}</span>
        </div>
        <div class="detail-item">
          <label>Họ tên:</label>
          <span>{{ selectedEmployee.name }}</span>
        </div>
        <div class="detail-item">
          <label>Ngày sinh:</label>
          <span>{{ formatDate(selectedEmployee.birthDate) }}</span>
        </div>
        <div class="detail-item">
          <label>Số CCCD:</label>
          <span>{{ selectedEmployee.citizenId }}</span>
        </div>
        <div class="detail-item">
          <label>Lương mỗi giờ:</label>
          <span>{{ selectedEmployee.salaryPerHour.toLocaleString("vi-VN") }} đ</span>
        </div>
        <div class="detail-item">
          <label>Số giờ làm tháng:</label>
          <span>{{ selectedEmployee.monthlyHours }} giờ</span>
        </div>
        <div class="detail-item highlight">
          <label>Tổng lương:</label>
          <span>{{ selectedEmployee.totalSalary.toLocaleString("vi-VN") }} đ</span>
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
  color: #666;
}

.detail-item span {
  color: #333;
}

.detail-item.highlight {
  margin-top: 8px;
  border-bottom: none;
  font-size: 1.1em;
}

.detail-item.highlight span {
  color: #dc2626;
  font-weight: 700;
}

.table-container {
  overflow-x: auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.filter-controls {
  padding: 20px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
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
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s;
  box-sizing: border-box;
  height: 42px;
}

.sort-select:focus {
  outline: none;
  border-color: #42b883;
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

.date-cell {
  color: #6b7280;
  font-size: 13px;
}

.id-cell {
  font-family: "Courier New", monospace;
  color: #6b7280;
  font-size: 13px;
}

.money-cell {
  text-align: right;
  font-weight: 600;
  color: #059669;
}

.money-cell.total {
  color: #dc2626;
  font-size: 15px;
}

.number-cell {
  text-align: center;
  font-weight: 600;
  color: #059669;
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
