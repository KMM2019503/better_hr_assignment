import { createRouter, createWebHistory } from "vue-router";
import Employee from "@/views/Employee.vue";
import AboutView from "@/views/AboutView.vue";
import NotFound from "@/components/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "employee",
      component: Employee,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/:pathMatch(.*)*", // Catch all routes that don't match
      name: "NotFound",
      component: NotFound,
    },
  ],
});

export default router;
