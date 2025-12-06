<script setup>
    import { ref } from "vue";
    import { useEmployeeStore } from "../../store/employeeStore";

    const store = useEmployeeStore();

    const employeeId = ref("");
    const name = ref("");
    const birthDate = ref("");
    const citizenId = ref("");
    const salaryPerHour = ref("");
    const monthlyHours = ref("");

    function submit() {
    store.addEmployee({
        employeeId: employeeId.value,
        name: name.value,
        birthDate: birthDate.value,
        citizenId: citizenId.value,
        salaryPerHour: Number(salaryPerHour.value),
        monthlyHours: Number(monthlyHours.value),
        totalSalary: Number(salaryPerHour.value) * Number(monthlyHours.value)
    });

    employeeId.value = "";
    name.value = "";
    birthDate.value = "";
    citizenId.value = "";
    salaryPerHour.value = "";
    monthlyHours.value = "";
    }
</script><template>
  <div class="form">
    <h3>Thêm nhân viên</h3>

    <input v-model="employeeId" placeholder="Mã nhân viên" />
    <input v-model="name" placeholder="Tên nhân viên" />
    <input v-model="birthDate" type="date" />
    <input v-model="citizenId" placeholder="Số CCCD" />
    <input v-model="salaryPerHour" type="number" placeholder="Lương/giờ" />
    <input v-model="monthlyHours" type="number" placeholder="Giờ làm/tháng" />

    <button @click="submit">Thêm</button>
  </div>
</template>


