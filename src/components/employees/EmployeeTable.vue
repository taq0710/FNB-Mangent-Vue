<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useEmployeeStore } from "../../store/employeeStore";
import BaseInput from "../common/BaseInput.vue";
import NumberInput from "../common/NumberInput.vue";
import DateInput from "../common/DateInput.vue";

const employeeStore = useEmployeeStore();
const { employees } = storeToRefs(employeeStore);

const editingEmployee = ref(null);
const editForm = ref({
  name: "",
  birthDate: "",
  citizenId: "",
  salaryPerHour: "",
  monthlyHours: "",
});

function startEdit(employee) {
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

function saveEdit(employeeId) {
  employeeStore.updateEmployee(employeeId, {
    name: editForm.value.name,
    birthDate: editForm.value.birthDate,
    citizenId: editForm.value.citizenId,
    salaryPerHour: Number(editForm.value.salaryPerHour),
    monthlyHours: Number(editForm.value.monthlyHours),
  });
  cancelEdit();
}

function deleteEmployee(employeeId) {
  if (confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
    employeeStore.deleteEmployee(employeeId);
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
          <th>Ngày sinh</th>
          <th>CCCD</th>
          <th>Lương/giờ</th>
          <th>Giờ làm</th>
          <th>Tổng lương</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="employees.length === 0" class="empty-row">
          <td colspan="8">
            <div class="empty-message">
              Chưa có dữ liệu nhân viên. Vui lòng thêm nhân viên hoặc đợi dữ liệu được tải.
            </div>
          </td>
        </tr>
        <template v-for="employee in employees" :key="employee.employeeId">
          <tr v-if="editingEmployee !== employee.employeeId" class="data-row">
            <td class="code-cell">{{ employee.employeeId }}</td>
            <td class="name-cell">{{ employee.name }}</td>
            <td class="date-cell">{{ formatDate(employee.birthDate) }}</td>
            <td class="id-cell">{{ employee.citizenId }}</td>
            <td class="money-cell">{{ employee.salaryPerHour.toLocaleString("vi-VN") }} đ</td>
            <td class="number-cell">{{ employee.monthlyHours }}</td>
            <td class="money-cell total">{{ employee.totalSalary.toLocaleString("vi-VN") }} đ</td>
            <td class="action-cell">
              <button @click="startEdit(employee)" class="btn-edit">Sửa</button>
              <button @click="deleteEmployee(employee.employeeId)" class="btn-delete">Xóa</button>
            </td>
          </tr>
          <tr v-else class="edit-row">
            <td class="code-cell">{{ employee.employeeId }}</td>
            <td>
              <BaseInput v-model="editForm.name" label="" placeholder="Tên nhân viên" />
            </td>
            <td>
              <DateInput v-model="editForm.birthDate" label="" />
            </td>
            <td>
              <BaseInput v-model="editForm.citizenId" label="" placeholder="Số CCCD" />
            </td>
            <td>
              <NumberInput v-model="editForm.salaryPerHour" label="" placeholder="Lương/giờ" />
            </td>
            <td>
              <NumberInput v-model="editForm.monthlyHours" label="" placeholder="Giờ làm/tháng" />
            </td>
            <td class="money-cell total">
              {{ (Number(editForm.salaryPerHour) * Number(editForm.monthlyHours)).toLocaleString("vi-VN") }} đ
            </td>
            <td class="action-cell">
              <button @click="saveEdit(employee.employeeId)" class="btn-save">Lưu</button>
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
