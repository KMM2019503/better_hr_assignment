<template>
  <div>
    <EmployeeDirectoryHeader
      :searchTerm="searchTerm"
      :deleteSelectedEmployee="deleteSelectedEmployee"
      :mdiArrowLeft="mdiArrowLeft"
      :mdiMagnify="mdiMagnify"
      :mdiTrashCan="mdiTrashCan"
      :mdiDotsVertical="mdiDotsVertical"
      @update:searchTerm="updateSearchTerm"
    />
    <EmployeeDataTable
      :selectedEmployee="selectedEmployee"
      :paginatedData="paginatedData"
      :columns="columns"
      :currentlyEditing="currentlyEditing"
      :updateDepartment="updateDepartment"
      :startEditing="startEditing"
      :closeSelect="closeSelect"
      :departments="departments"
      :mdiPencil="mdiPencil"
      :mdiClose="mdiClose"
      @update:selection="updateSelectedEmployee"
    />
    <EmployeePagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      :goToPage="goToPage"
      :previousPage="previousPage"
      :nextPage="nextPage"
      :changePage="changePage"
      :goToPageHandler="goToPageHandler"
      :mdiChevronLeft="mdiChevronLeft"
      :mdiChevronRight="mdiChevronRight"
      @update:goToPage="updateGoToPage"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  mdiArrowLeft,
  mdiDotsVertical,
  mdiMagnify,
  mdiChevronLeft,
  mdiChevronRight,
  mdiTrashCan,
  mdiPencil,
  mdiClose,
} from "@mdi/js";
import { employees, departments } from "@/constant/employees";
import { useToast } from "vue-toastification";
import EmployeePagination from "@/components/EmployeePagination.vue";
import EmployeeDataTable from "@/components/EmployeeDataTable.vue";
import EmployeeDirectoryHeader from "@/components/EmployeeDirectoryHeader.vue";

const toast = useToast();

const data = ref([...employees]);
const selectedEmployee = ref([]);
const searchTerm = ref("");
const currentPage = ref(1);
const rowsPerPage = 11;
const goToPage = ref(1);
const currentlyEditing = ref(null);

const columns = ref([
  {
    field: "employee",
    header: "Employee Name",
    minWidth: "200px",
    frozen: true,
    class: "shadow-2xl",
  },
  { field: "location", header: "Location", minWidth: "200px" },
  { field: "email", header: "Email", minWidth: "200px" },
  { field: "phone", header: "Phone", minWidth: "200px" },
  { field: "department", header: "Department", minWidth: "200px" },
  { field: "employeeCode", header: "#Code", minWidth: "100px" },
  { field: "position", header: "Position", minWidth: "200px" },
  { field: "customTags", header: "Custom Tags", minWidth: "200px" },
  { field: "NRC", header: "NRC", minWidth: "300px" },
  { field: "manager", header: "Manager", minWidth: "200px" },
  { field: "managerPosition", header: "Manager Position", minWidth: "200px" },
  { field: "joinnedDate", header: "Joinned Date", minWidth: "200px" },
  { field: "terminateDate", header: "Terminate Date", minWidth: "200px" },
]);

const updateSearchTerm = (newSearchTerm) => {
  searchTerm.value = newSearchTerm;
};

const filteredData = computed(() => {
  if (!searchTerm.value) return data.value;
  return data.value.filter((employee) => {
    const search = searchTerm.value.toLowerCase();
    return (
      employee.employee.toLowerCase().includes(search) ||
      employee.department.toLowerCase().includes(search) ||
      employee.location.toLowerCase().includes(search) ||
      employee.email.toLowerCase().includes(search)
    );
  });
});

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / rowsPerPage);
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  return filteredData.value.slice(start, end);
});

const previousPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const goToPageHandler = () => {
  if (goToPage.value >= 1 && goToPage.value <= totalPages.value) {
    currentPage.value = goToPage.value;
  }
};

const updateGoToPage = (newPage) => {
  console.log("updateGoToPage called with:", newPage);
  currentPage.value = newPage;
};

const updateSelectedEmployee = (newSelection) => {
  selectedEmployee.value = newSelection;
};

const startEditing = (employee) => {
  currentlyEditing.value = employee.employeeCode;
};

const closeSelect = () => {
  currentlyEditing.value = null;
};

const updateDepartment = (employee) => {
  const index = data.value.findIndex(
    (e) => e.employeeCode === employee.employeeCode
  );
  if (index !== -1) {
    data.value[index].department = employee.department;
    toast.success(`Department updated to ${employee.department}`);
    closeSelect();
  }
};

const deleteSelectedEmployee = () => {
  if (selectedEmployee.value && selectedEmployee.value.length) {
    data.value = data.value.filter(
      (employee) => !selectedEmployee.value.includes(employee)
    );
    toast(`Successfully deleted`);
    selectedEmployee.value = [];
  } else {
    toast(`Your need to select at least one employee`);
  }
};
</script>
