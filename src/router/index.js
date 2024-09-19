import { createRouter, createWebHistory } from "vue-router";
import Employee from "@/views/Employee.vue";
import NotFound from "@/components/NotFound.vue";
import Directory from "@/views/employee/Directory.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/employee/directory",
    },
    {
      path: "/employee",
      name: "employee",
      redirect: "/employee/directory",
      component: Employee,
      children: [
        {
          path: "directory",
          component: Directory,
        },
      ],
    },

    {
      path: "/:pathMatch(.*)*", // Catch all routes that don't match
      name: "NotFound",
      component: NotFound,
    },
  ],
});

export default router;
