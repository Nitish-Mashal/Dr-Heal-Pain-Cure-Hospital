<template>
  <!-- Hero Section -->
  <section
    class="mt-8 relative w-full bg-cover h-72"
    style="background-image: url('/files/SingleService.jpg'); background-position: center 25%;"
  >
    <div class="absolute inset-0 bg-white bg-opacity-50"></div>
    <div class="relative z-10 flex items-center justify-center h-full">
<h1 class="text-7xl font-bold text-blue-900">
  {{ selectedService?.department || "Our Services" }}
</h1>
    </div>
  </section>

  <div class="max-w-6xl mx-auto px-6 lg:px-12 py-6">
    <div class="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 items-start">
      
      <!-- Left Column - Scrollable Services -->
      <div class="flex flex-col max-h-[600px] overflow-y-auto space-y-2">
        <div
          v-for="(dept, index) in services"
          :key="dept.name || index"
          @click="selectService(dept)"
          :class="[
            'p-3 flex flex-col items-center border-t border-l border-r transition cursor-pointer group',
            selectedService?.department === dept.department
              ? 'bg-[#1F2B6C] text-white'
              : 'bg-white text-[#1F2B6C] hover:bg-[#1F2B6C] hover:text-white'
          ]"
        >
          <!-- Font Awesome Icon -->
          <i
            :class="getIconClass(dept.department) + ' text-3xl mb-2 transition group-hover:text-white'"
          ></i>

          <h3
            class="text-lg font-semibold mt-2"
            :class="selectedService?.department === dept.department
              ? 'text-white'
              : 'text-[#1F2B6C] group-hover:text-white'"
          >
            {{ dept.department }}
          </h3>
        </div>
      </div>

      <!-- Right Column - Content -->
      <div v-if="selectedService">
        <img
          :src="selectedService.custom_image || '/files/doctor-patient.jpg'"
          :alt="selectedService.department"
          class="w-full h-72 object-cover rounded-lg shadow-lg mb-4"
        />

        <p class="uppercase font-bold text-[20px] md:text-[24px] text-gray-900 mb-3">
          {{ selectedService.custom_tagline || 'A passion for putting patients first.' }}
        </p>

        <ul class="grid grid-cols-2 gap-4 list-disc list-inside">
            <li class="flex items-center">
              <span class="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              A Passion for Healing
            </li>
            <li class="flex items-center">
              <span class="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              All our best
            </li>
            <li class="flex items-center">
              <span class="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              Excellence in Every Care
            </li>
            <li class="flex items-center">
              <span class="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              Trusted 5-Star Healthcare
            </li>
            <li class="flex items-center">
              <span class="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
             Your Health, Our Priority
            </li>
            <li class="flex items-center">
              <span class="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              Compassionate Care, Always
            </li>
          </ul>

        <p class="text-gray-700 mt-3 text-sm md:text-base leading-relaxed">
          {{ selectedService.custom_description || 'Description not available.' }}
        </p>
      </div>

    </div>
  </div>

    <ServiceDoctor :department="department" />
</template>

<script>
import ServiceDoctor from "./ServiceDoctor.vue";

export default {
  name: "SingleServicePage",
  components: { ServiceDoctor },
    props: {
    department: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      services: [],          // all services for left scrollable list
      selectedService: null, // currently selected service
    };
  },
  async mounted() {
    await this.fetchServices();
    await this.fetchServiceByDepartment();
        console.log("Department received:", this.department);

  },
  watch: {
    // If route changes, fetch new service dynamically
    '$route.params.department': 'fetchServiceByDepartment'
  },
  methods: {
    async fetchServices() {
      try {
        const res = await fetch(
          "/api/method/healthcare_app.api.service_api.get_services"
        );
        const data = await res.json();
        this.services = data.message || [];
      } catch (err) {
        console.error("Failed to fetch services:", err);
      }
    },
    async fetchServiceByDepartment() {
      const department = this.$route.params.department;
      if (!department) return;

      try {
        const res = await fetch(
          `/api/method/healthcare_app.api.service_api.get_service?department=${encodeURIComponent(department)}`
        );
        const data = await res.json();
        if (data.message) {
          this.selectedService = data.message;
        } else {
          console.error("No data found for this department");
          this.selectedService = null;
        }
      } catch (err) {
        console.error("Failed to fetch service:", err);
        this.selectedService = null;
      }
    },
    selectService(dept) {
      this.selectedService = dept;
      // Update the URL without reloading the page
      this.$router.push({ name: 'SingleServicePage', params: { department: dept.department } });
    },
    getIconClass(department) {
      if (!department) return "fa-solid fa-hospital";
      const dept = department.toLowerCase();

      if (dept.includes("cardio")) return "fa-solid fa-heart-pulse";
      if (dept.includes("lab") || dept.includes("pathology")) return "fa-solid fa-vials";
      if (dept.includes("radiology")) return "fa-solid fa-x-ray";
      if (dept.includes("dental")) return "fa-solid fa-tooth";
      if (dept.includes("ortho")) return "fa-solid fa-bone";
      if (dept.includes("neuro")) return "fa-solid fa-brain";
      if (dept.includes("emergency")) return "fa-solid fa-truck-medical";
      if (dept.includes("blood")) return "fa-solid fa-droplet";
      if (dept.includes("pediatric")) return "fa-solid fa-baby";
      if (dept.includes("general")) return "fa-solid fa-stethoscope";

      return "fa-solid fa-hospital";
    },
  },
};
</script>

<style scoped>
/* Scrollbar styling for left column */
.flex::-webkit-scrollbar {
  width: 6px;
}

.flex::-webkit-scrollbar-thumb {
  background-color: rgba(31, 43, 108, 0.7);
  border-radius: 3px;
}

.flex::-webkit-scrollbar-track {
  background: transparent;
}
</style>
