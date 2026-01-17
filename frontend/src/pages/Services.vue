<template>
  <!-- Hero Section -->
  <section
    class="mt-8 relative w-full bg-cover h-72"
    style="background-image: url('/files/doctorpatient.png'); background-position: center 25%;"
  >
    <div class="absolute inset-0 bg-white bg-opacity-50"></div>
    <div class="relative z-10 flex items-center justify-center h-full">
      <h1 class="text-7xl font-bold text-blue-900">Services</h1>
    </div>
  </section>

  <!-- Services Grid -->
  <section class="max-w-5xl mx-auto py-12 px-4">
    <div v-if="loading" class="text-center text-gray-600 py-12">
      Loading services...
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="(card, index) in services"
        :key="index"
        class="group bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition duration-300 hover:bg-blue-900 hover:text-white"
      >
        <img
          :src="card.custom_image ? card.custom_image : '/files/doctor-patient.jpg'"
          alt="Service"
          class="w-full h-48 object-cover transition duration-300 group-hover:opacity-30"
        />
        <div class="p-4">
          <h3 class="text-lg font-semibold text-gray-900 group-hover:text-white transition">
            {{ card.department }}
          </h3>
          <p
            class="mt-2 text-sm text-gray-600 group-hover:text-gray-200 transition line-clamp-2"
          >
            {{ getTwoLineDescription(card.description) }}
          </p>
<router-link
  :to="`/services/${card.department}`"
  class="mt-2 inline-flex items-center text-sm font-semibold text-blue-600 group-hover:text-white hover:underline transition"
>
  Learn More <i class="fa-solid fa-arrow-right ml-2"></i>
</router-link>


        </div>
      </div>
    </div>

    <div v-if="!loading && services.length === 0" class="text-center text-gray-500 py-12">
      No services found.
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";

const services = ref([]);
const loading = ref(true);

const getTwoLineDescription = (desc) => {
  if (!desc) return "";
  return desc.length > 120 ? desc.substring(0, 120) + "..." : desc;
};

const fetchServices = async () => {
  try {
    const res = await fetch("/api/method/healthcare_app.api.service_api.get_services");
    const data = await res.json();

    if (data.message) {
      // Map each service to include 'image' if exists
      services.value = data.message.map((item) => ({
        department: item.department,
        description: item.description,
        custom_image: item.custom_image || null, // Frappe API should return 'image' if available
      }));
    } else {
      console.error("No data returned from API");
    }
  } catch (err) {
    console.error("Error fetching services:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchServices();
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
