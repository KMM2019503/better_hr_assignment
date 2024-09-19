<template>
  <div
    class="min-w-[184px] max-h-screen overflow-y-auto bg-[#F5F5F5] py-6 px-4"
  >
    <!-- Header -->
    <div>
      <h3 class="text-lg font-semibold text-[#4A4A4A]">
        {{ props.header }}
      </h3>
    </div>
    <!-- Routes -->
    <div class="py-6 flex flex-col gap-6">
      <Route
        v-for="(route, index) in routes"
        :key="index"
        :name="route.name"
        :url="route.url"
      />
    </div>
  </div>
</template>

<script setup>
import Route from "./ui/Route.vue";

const props = defineProps({
  header: {
    type: String,
    required: true,
  },
  routes: {
    type: Array,
    required: true,
  },
});
</script>
