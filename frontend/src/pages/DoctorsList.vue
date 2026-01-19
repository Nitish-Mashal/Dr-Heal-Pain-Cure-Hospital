<template>
  <!-- Hero Section -->
  <section
    class=" relative w-full bg-cover h-72"
    style="background-image: url('/files/DoctorsTeam.png'); background-position: center 25%;"
  >
    <!-- White transparent overlay -->
    <div class="absolute inset-0 bg-white bg-opacity-50"></div>

    <!-- Content above overlay -->
    <div class="relative z-10 flex items-center justify-center h-full">
      <h1 class="text-7xl font-bold text-[#065f7f]">Doctors</h1>
    </div>
  </section>

  <!-- Doctors Grid -->
  <section class="py-6 px-4 max-w-5xl mx-auto">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="(doctor, index) in doctors"
        :key="index"
        class="bg-white shadow-md rounded-lg overflow-hidden"
      >
        <!-- Doctor Image -->
        <img
          :src="doctor.image || '/files/PlaceholderImages.png'"
          :alt="doctor.first_name"
          class="w-full h-64 object-cover"
          loading="lazy"
        />

        <!-- Info Section -->
        <div class="bg-blue-100 text-center py-2">
          <h4 class="text-gray-800 font-semibold text-3xl">{{ doctor.first_name }}</h4>
          <p class="text-blue-800 font-bold tracking-widest uppercase">
            {{ doctor.department }}
          </p>

          <!-- Social Icons -->
          <div class="flex justify-center space-x-4 mt-2">
            <a
              v-if="doctor.custom_linkedin"
              :href="doctor.custom_linkedin"
              target="_blank"
              class="text-gray-600 hover:text-blue-600"
            >
              <i class="fab fa-linkedin"></i>
            </a>
            <a
              v-if="doctor.custom_facebook"
              :href="doctor.custom_facebook"
              target="_blank"
              class="text-gray-600 hover:text-blue-600"
            >
              <i class="fab fa-facebook"></i>
            </a>
            <a
              v-if="doctor.custom_twitter"
              :href="doctor.custom_twitter"
              target="_blank"
              class="text-gray-600 hover:text-blue-600"
            >
              <i class="fab fa-twitter"></i>
            </a>
          </div>
        </div>

        <!-- Buttons -->
        <div class="bg-[#065f7f] grid grid-cols-2">
          <!-- View Profile -->
          <router-link
            :to="{ name: 'ViewProfile', params: { id: doctor.name } }"
            class="text-white py-2 text-md font-medium text-center hover:bg-blue-800 border-r border-blue-700"
          >
            View Profile
          </router-link>

          <!-- Book Now -->
          <button
            @click="bookAppointment(doctor)"
            class="text-white py-2 text-md font-medium text-center hover:bg-blue-800 w-full"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials Carousel -->
  <section
    class="mb-3 relative w-full bg-cover bg-center h-80 flex items-center justify-center"
    style="background-image: url('/files/DoctorHand.png');"
  >
    <!-- Overlay -->
    <div class="absolute inset-0 bg-[#065f7f] bg-opacity-70"></div>

    <!-- Carousel -->
    <div class="relative z-10 text-center px-6 max-w-2xl">
      <Carousel :items-to-show="1" :wrap-around="true" :autoplay="3000" :transition="1000">
        <Slide v-for="(testimonial, index) in testimonials" :key="index">
          <div class="flex flex-col items-center">
            <!-- Quote Icon -->
            <div class="text-[40px] text-white mb-4">"</div>

            <!-- Quote Text -->
            <p class="text-white md:text-4xl leading-relaxed">
              {{ testimonial.quote }}
            </p>

            <!-- Author -->
            <h3
              class="mt-4 text-white font-medium border-t border-white pt-2 inline-block"
            >
              {{ testimonial.author }}
            </h3>
          </div>
        </Slide>

        <!-- Pagination -->
        <template #addons>
          <Pagination />
        </template>
      </Carousel>
    </div>
  </section>
</template>

<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination } from "vue3-carousel";

export default {
  name: "DoctorGrid",
  components: {
    Carousel,
    Slide,
    Pagination,
  },
  data() {
    return {
      doctors: [],
      testimonials: [
        {
          quote:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare.",
          author: "John Doe",
        },
        {
          quote:
            "Velit nascetur consequat faucibus porttitor enim et. Quisque placerat scelerisque felis vitae tortor augue.",
          author: "Jane Smith",
        },
        {
          quote:
            "Consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare.",
          author: "Michael Johnson",
        },
      ],
      loading: true,
      error: null,
    };
  },
  mounted() {
    this.fetchDoctors();
  },
  methods: {
    async fetchDoctors() {
      try {
        const res = await fetch("/api/method/drheal_frontend.api.App_api.get_doctors");
        const data = await res.json();
        this.doctors = data.message || [];
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
        this.error = "Unable to load doctors.";
      } finally {
        this.loading = false;
      }
    },

    bookAppointment(doctor) {
      if (!doctor) return;

      this.$router.push({
        name: "AppointmentPage", // make sure this route exists
        query: {
          doctor_id: doctor.name,
          doctor_name: doctor.first_name,
          department: doctor.department,
        },
      });
    },
  },
};
</script>

<style scoped>
.carousel__pagination {
  display: flex;
  gap: var(--vc-pgn-gap);
  justify-content: center;
  left: 50%;
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  transform: translateX(-50%);
  bottom: -16px !important;
}
</style>