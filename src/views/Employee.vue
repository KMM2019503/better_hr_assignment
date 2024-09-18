<template>
  <div class="h-screen max-h-screen w-full flex">
    <!-- Sidebar -->
    <ChildSidebar header="Employees" :routes="routes" />
    <!-- Main Content -->
    <div class="bg-[#FFFFFF] shadow-2xl w-full rounded-3xl p-2">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";

import ChildSidebar from "../components/ChildSidebar.vue";

const routes = [
  { url: "/employee/directory", name: "Directory" },
  { url: "/employee/update-request", name: "Update Request" },
  { url: "/employee/reporting-lines", name: "Reporting Lines" },
  { url: "/employee/department-structures", name: "Department structures" },
];
</script>
