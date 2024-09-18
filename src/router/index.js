import { createRouter, createWebHistory } from "vue-router";
import Employee from "@/views/Employee.vue";
import Home from "@/views/Home.vue";
import NotFound from "@/components/NotFound.vue";
import Directory from "@/views/employee/Directory.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/employee",
      name: "employee",
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
