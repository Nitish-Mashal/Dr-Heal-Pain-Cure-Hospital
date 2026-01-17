<template>
  <section class="py-6 bg-white">
    <!-- Heading -->
    <div class="text-center mb-10">
      <h4 class="text-sm font-bold tracking-widest text-blue-600 uppercase">
        Trusted Care
      </h4>
      <h2 class="text-[28px] font-bold text-gray-900">Our Doctors</h2>
    </div>

    <!-- If multiple doctors -->
    <Carousel
      v-if="filteredDoctors.length > 1"
      :items-to-show="3"
      :wrap-around="false"
      :breakpoints="{
        0: { itemsToShow: 1 },
        768: { itemsToShow: 2 },
        1024: { itemsToShow: 3 }
      }"
      class="max-w-5xl mx-auto"
    >
      <Slide v-for="(doctor, index) in filteredDoctors" :key="index">
        <div class="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
          <!-- 🩺 Image -->
          <div class="w-64 h-64 overflow-hidden bg-gray-100 flex justify-center items-start">
            <img
              :src="doctor.image || '/files/PlaceholderImages.png'"
              :alt="doctor.first_name"
              class="object-top object-cover w-full h-full"
              loading="lazy"
            />
          </div>

          <!-- 🧑‍⚕️ Info Section -->
          <div class="bg-blue-100 text-center py-3">
            <h3 class="text-gray-800 font-semibold text-lg">{{ doctor.first_name }}</h3>
            <p class="text-blue-800 font-bold tracking-widest uppercase text-sm">
              {{ doctor.department }}
            </p>

            <!-- 🔗 Social Links -->
            <div class="flex justify-center space-x-4 mt-2 text-gray-600">
              <a v-if="doctor.custom_linkedin" :href="doctor.custom_linkedin" target="_blank"><i class="fab fa-linkedin-in"></i></a>
              <a v-if="doctor.custom_facebook" :href="doctor.custom_facebook" target="_blank"><i class="fab fa-facebook-f"></i></a>
              <a v-if="doctor.custom_twitter" :href="doctor.custom_twitter" target="_blank"><i class="fab fa-twitter"></i></a>
            </div>
          </div>

          <!-- 🔍 View Profile -->
          <router-link
            :to="{ name: 'ViewProfile', params: { id: doctor.name } }"
            class="block w-full bg-blue-900 text-white py-2 font-medium text-center hover:bg-blue-800"
          >
            View Profile
          </router-link>
        </div>
      </Slide>

      <!-- Pagination Dots -->
      <template #addons>
        <Pagination />
      </template>
    </Carousel>

    <!-- If only 1 doctor -->
    <div v-else-if="filteredDoctors.length === 1" class="max-w-sm mx-auto">
      <div class="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
        <div class="w-full h-64 overflow-hidden bg-gray-100 flex justify-center items-start">
          <img
            :src="filteredDoctors[0].image || '/files/PlaceholderImages.png'"
            :alt="filteredDoctors[0].first_name"
            class="object-top object-cover w-full h-full"
            loading="lazy"
          />
        </div>
        <div class="bg-blue-100 text-center py-3">
          <h3 class="text-gray-800 font-semibold text-lg">{{ filteredDoctors[0].first_name }}</h3>
          <p class="text-blue-800 font-bold tracking-widest uppercase text-sm">
            {{ filteredDoctors[0].department }}
          </p>
        </div>
        <router-link
          :to="{ name: 'ViewProfile', params: { id: filteredDoctors[0].name } }"
          class="block w-full bg-blue-900 text-white py-2 font-medium text-center hover:bg-blue-800"
        >
          View Profile
        </router-link>
      </div>
    </div>

    <!-- If no doctors -->
    <div v-else class="text-center text-gray-600 mt-6">
      No doctors available for {{ department }} at the moment.
    </div>
  </section>
</template>

<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination } from "vue3-carousel";

export default {
  name: "DoctorsCarousel",
  components: { Carousel, Slide, Pagination },
  props: {
    department: { type: String, required: true },
  },
  data() {
    return {
      doctors: [],
      filteredDoctors: [],
    };
  },
  methods: {
    async fetchDoctors() {
      try {
        const res = await fetch("/api/method/healthcare_app.api.App_api.get_doctors");
        const data = await res.json();
        this.doctors = data.message || [];

        console.log("✅ All doctors:", this.doctors);
        console.log("🔍 Filtering for department:", this.department);

        // Match department ignoring case
        this.filteredDoctors = this.doctors.filter((doc) => {
          const dept =
            (doc.department_name || doc.department || doc.speciality || "")
              .trim()
              .toLowerCase();
          return dept === this.department.trim().toLowerCase();
        });

        console.log("🎯 Filtered doctors:", this.filteredDoctors);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
      }
    },
  },
  mounted() {
    this.fetchDoctors();
  },
};
</script>

<style scoped>

/* Image top alignment */
.object-top {
  object-position: top;
}
</style>
