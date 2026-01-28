<template>
  <section class="relative w-full bg-cover h-72"
    style="background-image: url('/files/DoctorsTeam.png'); background-position: center 25%;">
    <div class="absolute inset-0 bg-white bg-opacity-50"></div>
    <div class="relative z-10 flex items-center justify-center h-full">
      <h1 class="text-5xl md:text-7xl font-bold text-color-blue">Doctor Profile</h1>
    </div>
  </section>

  <div class="flex items-center justify-center bg-gray-50 p-3">
    <div class="w-full max-w-4xl bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
      <!-- Loading -->
      <div v-if="loading" class="p-10 text-center text-gray-600">
        Loading doctor profile...
      </div>

      <!-- Error -->
      <div v-else-if="error" class="p-10 text-center text-red-600">
        {{ error }}
      </div>

      <!-- Doctor Info -->
      <div v-else-if="doctor">
        <div class="flex flex-col md:flex-row items-center p-6 space-y-6 md:space-y-0 md:space-x-6">
          <img :src="doctor.image" :alt="doctor.first_name" class="w-44 h-52 object-cover rounded-lg shadow-sm" />

          <div class="flex-1 space-y-1">
            <h2 class="text-3xl font-bold text-gray-900">{{ doctor.first_name }}</h2>
            <p class="text-[15px] font-semibold text-gray-700 font-medium ">{{ doctor.custom_degree }}</p>
            <p class="text-[14px] text-black-700">Specialities in {{ doctor.department }}</p>

            <div class="border-t border-gray-200"></div>

            <div>
              <p class="font-semibold text-lg">Working At</p>
              <p class="text-[14px] text-gray-800">{{ doctor.custom_working_at || 'Not specified' }}</p>
            </div>

            <div class="border-t border-gray-200"></div>

            <!-- <div class="flex justify-between items-center">
              <p class="text-black-900 font-medium">Consultation Fee</p>
              <div class="text-right">
                <p class="text-color-blue font-semibold">
                  ₹{{ doctor.op_consulting_charge || 'N/A' }}
                  <span class="text-gray-500 text-sm">(Incl. VAT)</span>
                </p>
                <p class="text-gray-500 text-sm">Per consultation</p>
              </div>
            </div> -->
          </div>
        </div>

        <!-- Info Boxes -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-100 bg-white p-6">
          <div class="text-center py-4 rounded-xl text-white font-medium shadow-md"
            style="background: linear-gradient(to bottom, #30809D, #BFD2F8);">
            <p>Total Experience</p>
            <p class="font-semibold">{{ doctor.custom_experience || 'N/A' }}</p>
          </div>

          <div class="text-center py-4 rounded-xl text-white font-medium shadow-md"
            style="background: linear-gradient(to bottom, #30809D, #BFD2F8);">
            <p>UI-Number</p>
            <p class="font-semibold">{{ doctor.name || 'N/A' }}</p>
          </div>

          <div class="text-center py-4 rounded-xl text-white font-medium shadow-md"
            style="background: linear-gradient(to bottom, #30809D, #BFD2F8);">
            <p>Joining Date</p>
            <p class="font-semibold">{{ doctor.custom_joining_date || 'N/A' }}</p>
          </div>
        </div>

        <!-- Book Appointment -->
        <!-- Book Appointment -->
        <div class="px-6 pb-6">
          <button @click="bookAppointment" class="w-full bg-color-blue text-white font-semibold rounded-full py-2">
            Book Appointment Now
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewProfile",
  data() {
    return {
      doctor: null,
      loading: true,
      error: null,
    };
  },
  async created() {
    await this.fetchDoctor();
  },
  methods: {
    async fetchDoctor() {
      this.loading = true;
      try {
        const doctorId = this.$route.params.id;
        const res = await fetch(
          `/api/method/drheal_frontend.api.App_api.get_doctor?id=${doctorId}`
        );

        if (!res.ok) throw new Error("Failed to fetch doctor");

        const data = await res.json();
        this.doctor = data.message || null;
      } catch (err) {
        console.error("Error fetching doctor:", err);
        this.error = "Unable to load doctor profile.";
      } finally {
        this.loading = false;
      }
    },
    async fetchDoctor() {
      this.loading = true;
      try {
        const doctorId = this.$route.params.id;
        const res = await fetch(
          `/api/method/drheal_frontend.api.App_api.get_doctor?id=${doctorId}`
        );

        if (!res.ok) throw new Error("Failed to fetch doctor");

        const data = await res.json();
        this.doctor = data.message || null;
      } catch (err) {
        console.error("Error fetching doctor:", err);
        this.error = "Unable to load doctor profile.";
      } finally {
        this.loading = false;
      }
    },

    bookAppointment() {
      if (!this.doctor) return;

      this.$router.push({
        name: "AppointmentPage", // must match your router name
        query: {
          department: this.doctor.department,
          doctor_id: this.doctor.name,
          doctor_name: `${this.doctor.first_name || ''} ${this.doctor.last_name || ''}`.trim(),
        },
      });
    }

  },
};
</script>
