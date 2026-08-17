<template>
  <div>
    <!-- TOP : DEPARTMENT + DOCTOR -->
    <div class="container mx-auto px-4 mt-3">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

        <!-- Branch -->
        <div class="flex flex-col">
          <label class="mb-1 font-semibold text-gray-700">
            Branch *
          </label>

          <select v-model="form.branch" @change="onBranchChange"
            class="px-2 py-1 border rounded-lg focus:ring-2 focus:ring-[#065f7f]">
            <option value="">Select Branch</option>

            <option v-for="company in companies" :key="company.name" :value="company.name">
              {{ getBranchDisplayName(company.name) }}
            </option>
          </select>
        </div>
        <!-- Appointment Type -->
        <div class="flex flex-col">
          <label class="mb-1 font-semibold text-gray-700">
            Appointment Type *
          </label>

          <select v-model="form.appointment_type" @change="onAppointmentTypeChange"
            class="px-2 py-1 border rounded-lg focus:ring-2 focus:ring-[#065f7f]">
            <option value="">Select Appointment Type</option>

            <option v-for="type in appointment_types" :key="type.name" :value="type.appointment_type">
              {{ type.appointment_type }}
            </option>
          </select>
        </div>

        <!-- Doctor -->
        <div class="flex flex-col">
          <label class="mb-1 font-semibold text-gray-700">
            Doctor *
          </label>

          <select v-model="form.doctor" @change="onDoctorChange" :disabled="!form.appointment_type"
            class="px-2 py-1 border rounded-lg focus:ring-2 focus:ring-[#065f7f] disabled:bg-gray-100">
            <option value="">Select Doctor</option>

            <option v-for="doctor in doctors" :key="doctor.name" :value="doctor.name">
              {{ doctor.full_name || doctor.first_name }}
            </option>
          </select>
        </div>

      </div>
    </div>


    <!-- MAIN SECTION -->
    <section class="px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">

      <!-- LEFT : SLOT UI -->
      <div>
        <div v-show="availableDates.length" class="bg-white rounded-xl p-4 shadow">

          <h2 class="font-bold text-xl mb-2 text-[#065f7f]">
            Select Appointment Slots
          </h2>

          <h3 class="text-lg font-semibold mb-4">
            {{ selectedDoctor?.first_name }}
          </h3>

          <!-- Date Switch -->
          <div class="flex justify-center items-center gap-4 mb-6 relative">

            <!-- Prev -->
            <button @click="prevDate" class="w-8 h-8 border rounded-full" :disabled="selectedDateIndex === 0">
              ‹
            </button>

            <!-- Date pill -->
            <div class="px-6 py-2 rounded-full bg-green-100 text-green-700 font-semibold
               flex items-center gap-2 cursor-pointer select-none" @click="openCalendar">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z" />
              </svg>

              {{ formattedDate || "Select date" }}
            </div>

            <!-- Next -->
            <button @click="nextDate" class="w-8 h-8 border rounded-full"
              :disabled="selectedDateIndex === availableDates.length - 1">
              ›
            </button>

            <!-- Hidden calendar -->
            <input ref="hiddenDateInput" type="date" class="absolute opacity-0 pointer-events-none"
              style="width:1px;height:1px" :min="minDate" @change="onCalendarSelect($event.target.value)" />
          </div>

          <!-- Slots (FIXED & SCROLL-SAFE) -->
          <div class="h-[330px] overflow-y-scroll pr-1">

            <div class="grid grid-cols-3 gap-3 min-h-full">
              <div v-if="isFetchingSlots" class="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
                <div class="flex flex-col items-center gap-2">
                  <div class="w-8 h-8 border-4 border-[#065f7f] border-t-transparent rounded-full animate-spin"></div>
                  <p class="text-sm text-gray-600">Loading slots...</p>
                </div>
              </div>
              <!-- Slot buttons -->
              <button v-for="slot in availableTimes" :key="slot.id" type="button"
                @click="!slot.booked && selectSlot(slot)" :disabled="slot.booked" :class="[
                  'h-[76px] rounded-lg flex flex-col items-center justify-center',
                  'border transition-all duration-200',

                  slot.booked
                    ? 'bg-[#fff5f5] border-[#ff4d4d] text-gray-800 cursor-not-allowed'
                    : selectedSlot?.id === slot.id
                      ? 'bg-[#d9f7e8] border-[#16a765] text-gray-800 ring-2 ring-green-200'
                      : 'bg-[#f4fbf7] border-[#35b779] text-gray-800 hover:bg-[#e8f8ef] cursor-pointer'
                ]">

                <!-- TIME RANGE -->
                <span class="text-sm font-semibold">
                  {{ slot.time_range }}
                </span>

                <!-- AVAILABLE COUNT -->
                <span :class="[
                  'text-xs mt-1 flex items-center gap-1',
                  slot.booked
                    ? 'text-[#e31b23]'
                    : 'text-[#079455]'
                ]">

                  <span :class="[
                    'w-2 h-2 rounded-full',
                    slot.booked
                      ? 'bg-[#e31b23]'
                      : 'bg-[#079455]'
                  ]"></span>

                  {{ slot.booked ? 'Full' : `${slot.available_count} Available` }}

                </span>

              </button>

              <!-- Placeholder (keeps scroll alive) -->
              <div v-if="
                !isFetchingSlots &&
                availableTimes.length === 0
              " class="col-span-3 flex items-center justify-center
                     h-32 text-gray-400 text-sm">
                No slots available for selected date
              </div>

            </div>

          </div>


          <!-- LEGEND -->
          <div class="mt-5 p-3 rounded-lg bg-gray-50
                 flex items-center gap-6 text-sm">

            <div class="flex items-center gap-2">
              <span class="w-5 h-5 rounded bg-[#16b364]"></span>

              <span class="text-gray-700">
                Available
              </span>
            </div>


            <div class="flex items-center gap-2">
              <span class="w-5 h-5 rounded bg-red-500"></span>

              <span class="text-gray-700">
                Full / Unavailable
              </span>
            </div>

          </div>


          <!-- Selected slot -->
          <div v-if="selectedSlot" class="mt-3 text-center text-sm text-[#065f7f]">
            Selected:
            <strong>
              {{ selectedSlot.time_range }}
            </strong>
          </div>

        </div>
      </div>


      <!-- RIGHT : FORM -->
      <div class="  rounded-xl shadow">
        <form @submit.prevent="submitAppointment" class="bg-white p-6 rounded-xl shadow-md space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">

            <!-- Name -->
            <div class="flex flex-col">
              <label class="mb-1 font-semibold text-gray-700">Name *</label>
              <input v-model="form.name" required placeholder="Enter your name"
                class="px-2 py-1 border rounded-lg focus:ring-2 focus:ring-[#065f7f]" />
            </div>

            <!-- Phone -->
            <div class="flex flex-col">
              <label class="mb-1 font-semibold text-gray-700">Phone *</label>
              <input v-model="form.phone" @input="validatePhone" maxlength="10"
                placeholder="Enter 10 digit mobile number"
                class="px-2 py-1 border rounded-lg focus:ring-2 focus:ring-[#065f7f]" />
              <p v-if="errors.phone" class="text-red-500 text-sm mt-1">
                {{ errors.phone }}
              </p>
            </div>
            <!-- WhatsApp Checkbox (Full Width) -->
            <div class="md:col-span-2 flex items-center gap-2 mt-1">
              <input type="checkbox" v-model="form.whatsapp_different" id="whatsapp_check"
                class="w-3 h-3 accent-[#065f7f]" />
              <label for="whatsapp_check" class="text-sm text-gray-700 cursor-pointer">
                Alternative WhatsApp number
              </label>
            </div>

            <!-- Alternative WhatsApp Number (Only if Checked) -->
            <div v-if="form.whatsapp_different" class="flex flex-col md:col-span-2">
              <label class="mb-1 font-semibold text-gray-700">
                WhatsApp Number *
              </label>
              <input v-model="form.alternative_phone_number" maxlength="10" placeholder="Enter 10 digit WhatsApp number"
                class="px-2 py-1 border rounded-lg focus:ring-2 focus:ring-[#065f7f]" />
            </div>

            <!-- Age -->
            <div class="flex flex-col">
              <label class="mb-1 font-semibold text-gray-700">Age *</label>
              <input v-model="form.age" type="number" @input="validateAge" placeholder="Enter your age"
                class="px-2 py-1 border rounded-lg focus:ring-2 focus:ring-[#065f7f]" />
              <p v-if="errors.age" class="text-red-500 text-sm mt-1">
                {{ errors.age }}
              </p>
            </div>

            <!-- Gender -->
            <div class="flex flex-col">
              <label class="mb-1 font-semibold text-gray-700">Gender *</label>
              <select v-model="form.gender" class="px-2 py-1 border rounded-lg focus:ring-2 focus:ring-[#065f7f]">
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <!-- Email -->
            <div class="flex flex-col">
              <label class="mb-1 font-semibold text-gray-700">Email</label>
              <input v-model="form.email" type="email" placeholder="Enter your email"
                class="px-2 py-1 border rounded-lg focus:ring-2 focus:ring-[#065f7f]" />
            </div>

            <!-- Location -->
            <div class="flex flex-col md:col-span-2 h-20">
              <label class="mb-1 font-semibold text-gray-700">Location</label>
              <textarea v-model="form.custom_location" rows="3"
                class="px-2 py-1 border rounded-lg focus:ring-2 focus:ring-[#065f7f]"></textarea>
            </div>

            <!-- Message -->
            <div class="flex flex-col md:col-span-2 h-20">
              <label class="mb-1 font-semibold text-gray-700">Message</label>
              <textarea v-model="form.message" rows="3"
                class="px-2 py-1 border rounded-lg focus:ring-2 focus:ring-[#065f7f]"></textarea>
            </div>

          </div>

          <!-- Submit -->
          <button type="submit" :disabled="isLoading"
            class="w-full bg-color-blue text-white py-2 font-bold rounded-lg transition disabled:opacity-50">
            {{ isLoading ? "Submitting..." : "SUBMIT" }}
          </button>

          <!-- Errors -->
          <p v-if="slotError" class="text-red-500 text-sm mt-3 text-center">
            {{ slotError }}
          </p>
          <p v-if="apiError" class="text-red-600 text-sm mt-2 text-center">
            {{ apiError }}
          </p>
        </form>
      </div>

    </section>

    <!-- CALL CTA -->
    <div class="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6 text-center">
      <p class="text-gray-900 mb-4">
        To book an appointment directly, please call the number below.
      </p>

      <a href="tel:07969288000"
        class="inline-flex items-center justify-center w-full bg-color-blue text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition">
        Call 07969288000
      </a>
    </div>
  </div>
</template>


<script>

export default {
  name: "AppointmentPage",

  data() {
    return {
      isLoading: false,
      slotError: " ",
      apiError: "",
      departments: [],
      doctors: [],
      appointment_types: [],
      companies: [],
      selectedDoctor: null,
      selectedSlot: null,
      isFetchingSlots: false,
      selectedDateIndex: null,
      showCalendar: false,
      // Form data
      form: {
        name: "",
        gender: "",
        email: "",
        phone: "",
        age: "",
        department: "",
        doctor: "",
        date: "",
        time: "",
        token_no: "",
        message: "",
        appointment_type: "",
        branch: "",
        custom_branch: "",
        custom_time_slots: "",
        custom_location: "",
        whatsapp_different: false,
        alternative_phone_number: ""
      },
      // Validation errors
      errors: {
        phone: "",
        age: "",
      },

      // Schedule
      schedule: [],
      availableDates: [],
      availableTimes: [],

      message: { text: "", type: "" },
    };
  },

  async created() {
    try {

      // Load companies / branches
      await this.fetchCompanies();

      // Set department
      this.form.department = "Orthopaedics";

      const { doctor_id } = this.$route.query;

      // Load all doctors
      await this.fetchDoctors();

      // Auto select doctor if passed
      if (doctor_id) {
        this.form.doctor = doctor_id;
        this.selectedDoctor = await this.fetchDoctorById(doctor_id);
      }

    } catch (err) {
      console.error("Created hook error:", err);
    }
  },

  computed: {
    formattedDate() {
      const d = this.availableDates[this.selectedDateIndex];
      return d ? new Date(d.date).toDateString() : "Select date";
    },

    minDate() {
      return new Date().toISOString().split("T")[0];
    }
  },

  watch: {
    async "form.doctor"(doctorId) {
      if (!doctorId) return;

      this.selectedDoctor = await this.fetchDoctorById(doctorId);
      await this.fetchAppointmentTypes(doctorId);
      await this.fetchDoctorSchedule();
    }
  },

  mounted() {
    this.fetchDepartments();
    this.fetchAppointmentTypes();
  },

  methods: {
    formatTime(time) {
      if (!time) return "";

      // Handles: 09:00:00, 09:00:, 09:00
      const parts = time.split(":");
      return `${parts[0]}:${parts[1]}`; // ✅ HH:mm only
    },
    validatePhone() {
      this.form.phone = this.form.phone.replace(/\D/g, "");
      this.errors.phone =
        this.form.phone.length !== 10 ? "Enter valid 10 digit number" : "";
    },

    validateAge() {
      this.errors.age =
        !this.form.age || this.form.age <= 0 ? "Enter valid age" : "";
    },
    /* ---------------- DOCTOR DETAILS ---------------- */
    async fetchDoctorById(doctorId) {
      try {
        const res = await fetch(
          `/api/method/drheal_frontend.api.App_api.get_doctor?id=${doctorId}`
        );
        const data = await res.json();
        return data.message || null;
      } catch (err) {
        console.error("Doctor fetch error:", err);
        return null;
      }
    },

    /* ---------------- APPOINTMENT TYPES ---------------- */
    async fetchAppointmentTypes() {
      console.log("========== GET APPOINTMENT TYPES ==========");

      try {
        const url =
          "/api/method/drheal_frontend.api.Appointment_api.get_appointment_types";

        console.log("Calling Appointment Type API:", url);

        const res = await fetch(url);

        console.log("HTTP Status:", res.status);

        const data = await res.json();

        console.log("Appointment Type API Response:", data);

        if (data.message?.status === "success") {

          this.appointment_types = data.message.data || [];

          console.log(
            "Appointment Types Loaded:",
            this.appointment_types
          );

          console.log(
            "Appointment Type Count:",
            this.appointment_types.length
          );

        } else {

          this.appointment_types = [];

          console.error(
            "Appointment Type API Error:",
            data.message
          );
        }

      } catch (error) {

        console.error(
          "Appointment Type Fetch Error:",
          error
        );

        this.appointment_types = [];

      }

      console.log("==========================================");
    },
    async onAppointmentTypeChange() {
      console.log("========== APPOINTMENT TYPE CHANGE ==========");

      // Clear doctor
      this.form.doctor = "";

      this.doctors = [];

      this.selectedDoctor = null;
      this.selectedSlot = null;

      this.availableDates = [];
      this.availableTimes = [];
      this.schedule = [];
      this.selectedDateIndex = null;

      if (!this.form.appointment_type) {
        return;
      }

      if (!this.form.branch) {
        console.log("Branch not selected");
        return;
      }

      console.log("Branch:", this.form.branch);
      console.log(
        "Appointment Type:",
        this.form.appointment_type
      );

      // Fetch doctors based on
      // appointment type + branch
      await this.fetchDoctors();
    },
    async onDoctorChange() {

      if (!this.form.doctor) {
        this.selectedDoctor = null;
        return;
      }

      this.selectedDoctor = this.doctors.find(
        doctor => doctor.name === this.form.doctor
      );

      console.log("========== DOCTOR SELECTED ==========");
      console.log("Doctor:", this.selectedDoctor);
      console.log(
        "Appointment Type:",
        this.form.appointment_type
      );
      console.log("Branch:", this.form.branch);

      await this.fetchDoctorSchedule();
    },
    /* ---------------- company ---------------- */
    async fetchCompanies() {
      try {
        const res = await fetch(
          "/api/method/drheal_frontend.api.company.get_companies"
        );

        const data = await res.json();

        console.log("Company API Response:", data);

        if (data.message?.status === "success") {
          this.companies = data.message.data || [];
        } else {
          this.companies = [];
          console.error("Company API error:", data.message);
        }

      } catch (err) {
        console.error("Company fetch error:", err);
        this.companies = [];
      }
    },
    getBranchDisplayName(companyName) {
      if (!companyName) return "";

      if (companyName.includes("- BSK")) {
        return "Banashankari Branch";
      }

      if (companyName.includes("- HSR")) {
        return "HSR layout Branch";
      }

      return companyName;
    },

    /* ---------------- DEPARTMENTS ---------------- */
    async fetchDepartments() {
      const res = await fetch(
        "/api/method/drheal_frontend.api.Appointment_api.get_departments"
      );
      const data = await res.json();
      if (data.message?.status === "success") {
        this.departments = data.message.data.map(d => d.department);
      }
    },

    /* ---------------- DOCTORS BY hospital ---------------- */
    async fetchDoctors() {
      console.log("========== FETCH DOCTORS ==========");

      if (
        !this.form.department ||
        !this.form.branch ||
        !this.form.appointment_type
      ) {
        console.log("Missing required fields");
        this.doctors = [];
        return;
      }

      try {
        // -----------------------------------------
        // 1. FIND SELECTED APPOINTMENT TYPE
        // -----------------------------------------

        const selectedType = this.appointment_types.find(
          type =>
            type.appointment_type === this.form.appointment_type
        );

        console.log("Selected Appointment Type:", selectedType);

        if (!selectedType) {
          console.error(
            "Appointment type not found:",
            this.form.appointment_type
          );

          this.doctors = [];
          return;
        }

        // -----------------------------------------
        // 2. GET DOCTOR GROUP
        // -----------------------------------------

        const doctorGroup = selectedType.custom_doctor_group;

        console.log(
          "Doctor Group from Appointment Type:",
          doctorGroup
        );

        if (!doctorGroup) {
          console.error(
            "custom_doctor_group is missing:",
            selectedType
          );

          this.doctors = [];
          return;
        }

        // -----------------------------------------
        // 3. GET BRANCH CODE
        // -----------------------------------------

        let branchCode = "";

        if (this.form.branch.includes("- BSK")) {
          branchCode = "BSK";
        }

        if (this.form.branch.includes("- HSR")) {
          branchCode = "HSR";
        }

        console.log("Selected Branch:", this.form.branch);
        console.log("Branch Code:", branchCode);

        if (!branchCode) {
          console.error(
            "Could not identify branch:",
            this.form.branch
          );

          this.doctors = [];
          return;
        }

        // -----------------------------------------
        // 4. CREATE FINAL DOCTOR GROUP
        // -----------------------------------------

        const finalDoctorGroup =
          `${doctorGroup} - ${branchCode}`;

        console.log(
          "FINAL DOCTOR GROUP:",
          finalDoctorGroup
        );

        // -----------------------------------------
        // 5. CALL DOCTOR API
        // -----------------------------------------

        const url =
          `/api/method/drheal_frontend.api.Appointment_api.get_practitioners` +
          `?department=${encodeURIComponent(this.form.department)}` +
          `&hospital=${encodeURIComponent(this.form.branch)}` +
          `&doctor_group=${encodeURIComponent(finalDoctorGroup)}`;

        console.log("Doctor API URL:", url);

        const res = await fetch(url);

        const data = await res.json();

        console.log("Doctor API Response:", data);

        // -----------------------------------------
        // 6. SET DOCTORS
        // -----------------------------------------

        if (data.message?.status === "success") {

          this.doctors = data.message.data || [];

          console.log(
            `Doctors for ${finalDoctorGroup}:`,
            this.doctors
          );

        } else {

          this.doctors = [];

          console.error(
            "Doctor API Error:",
            data.message
          );
        }

      } catch (error) {

        console.error(
          "Doctor Fetch Error:",
          error
        );

        this.doctors = [];
      }

      console.log("==================================");
    },
    async onBranchChange() {
      console.log("========== BRANCH CHANGED ==========");
      console.log("Selected Branch:", this.form.branch);

      // Clear appointment type and doctor
      this.form.appointment_type = "";
      this.form.doctor = "";

      this.doctors = [];
      this.selectedDoctor = null;
      this.selectedSlot = null;

      this.availableDates = [];
      this.availableTimes = [];
      this.schedule = [];
      this.selectedDateIndex = null;

      if (!this.form.branch) {
        this.appointment_types = [];
        return;
      }

      // Load appointment types for selected branch
      await this.fetchAppointmentTypes();

      console.log("Appointment Types:", this.appointment_types);
    },

    /* ---------------- DOCTOR SCHEDULE ---------------- */
    async fetchDoctorSchedule() {
      // Reset state
      this.availableDates = [];
      this.availableTimes = [];
      this.selectedDateIndex = null;
      this.schedule = [];

      if (!this.form.doctor) return;

      try {
        const res = await fetch(
          `/api/method/drheal_frontend.api.Appointment_api.get_doctor_schedule` +
          `?practitioner=${encodeURIComponent(this.form.doctor)}`
        );

        const data = await res.json();
        if (!Array.isArray(data.message)) return;

        this.schedule = data.message;

        // Generate dates for which doctor has slots
        this.availableDates = this.generateNext3Months(this.schedule);

        // Clear slots
        this.availableTimes = [];

        // Select the first date automatically
        if (this.availableDates.length) {
          await this.selectDate(0);
        }
      } catch (err) {
        console.error("Error fetching doctor schedule:", err);
      }

    },

    generateNext3Months(schedule) {
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const dates = [];

      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(startDate.getMonth() + 3); // +3 months

      let currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        const day = days[currentDate.getDay()];

        // Include only if schedule has slots on this day
        if (schedule.some(s => s.day === day)) {
          dates.push({
            date: currentDate.toISOString().split("T")[0], // YYYY-MM-DD
            day
          });
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }

      return dates;
    },
    toggleCalendar() {
      this.showCalendar = !this.showCalendar;
    },
    openCalendar() {
      const input = this.$refs.hiddenDateInput;
      if (!input) return;

      // Chrome / Edge
      if (input.showPicker) {
        input.showPicker();
      } else {
        // Safari / fallback
        input.focus();
        input.click();
      }
    },

    onCalendarSelect(date) {
      this.showCalendar = false;

      const index = this.availableDates.findIndex(d => d.date === date);

      if (index !== -1) {
        this.selectDate(index);
      } else {
        // Doctor has NO slots on this date
        this.form.date = date;
        this.availableTimes = [];
        this.selectedSlot = null;
      }
    },
    /* ---------------- DATE / SLOT SELECTION ---------------- */
    async selectDate(i) {
      // Guard checks
      if (this.isFetchingSlots) return;
      if (!this.availableDates || !this.availableDates[i]) return;

      this.isFetchingSlots = true;

      // Reset state early
      this.availableTimes = [];
      this.selectedSlot = null;

      try {
        // Set selected date
        this.selectedDateIndex = i;
        this.form.date = this.availableDates[i].date;

        const res = await fetch(
          `/api/method/drheal_frontend.api.Appointment_api.get_doctor_schedule` +
          `?practitioner=${encodeURIComponent(this.form.doctor)}` +
          `&appointment_date=${this.form.date}`
        );

        const data = await res.json();

        // If API fails or returns no slots
        if (!data || !Array.isArray(data.message) || data.message.length === 0) {
          this.availableTimes = [];
          return;
        }

        // Remove duplicate slots
        const uniqueSlots = Array.from(
          new Map(
            data.message.map(slot => [
              `${slot.from_time}-${slot.to_time}`,
              slot
            ])
          ).values()
        );

        // Map slots for frontend
        this.availableTimes = uniqueSlots.map((s, idx) => {
          const tokenNumber = s.token_no ?? idx + 1;

          return {
            id: `${s.from_time}-${s.to_time}-${this.form.date}`,
            display: `${s.from_time} - ${s.to_time}`,
            time_range: `${this.formatTime(s.from_time)} - ${this.formatTime(s.to_time)}`,
            value: s.from_time,
            token_no: `${tokenNumber}`,
            available_count: s.available_count ?? 0,
            booked: Boolean(s.booked)
          };
        });

      } catch (error) {
        console.error("Error fetching slots:", error);
        this.availableTimes = [];
      } finally {
        this.isFetchingSlots = false;
      }
    },


    prevDate() {
      if (this.selectedDateIndex > 0) {
        this.selectDate(this.selectedDateIndex - 1);
      }
    },

    nextDate() {
      if (this.selectedDateIndex < this.availableDates.length - 1) {
        this.selectDate(this.selectedDateIndex + 1);
      }
    },

    selectSlot(slot) {
      if (slot.booked) return;

      this.selectedSlot = slot;

      this.form.time = slot.value;
      this.form.token_no = slot.token_no;

      this.form.custom_time_slots = slot.time_range;

      this.slotError = "";
    },

    /* ---------------- SUBMIT ---------------- */
    async submitAppointment() {

      // ---------------------------------------------------
      // 1. Validate Branch
      // ---------------------------------------------------
      if (!this.form.branch) {
        this.apiError = "Please select branch";
        return;
      }

      // ---------------------------------------------------
      // 2. Validate Appointment Type
      // ---------------------------------------------------
      if (!this.form.appointment_type) {
        this.apiError = "Please select appointment type";
        return;
      }

      // ---------------------------------------------------
      // 3. Validate Doctor
      // ---------------------------------------------------
      if (!this.form.doctor) {
        this.apiError = "Please select doctor";
        return;
      }

      // ---------------------------------------------------
      // 4. Validate Slot
      // ---------------------------------------------------
      if (!this.selectedSlot) {
        this.slotError = "Please select time slot";
        return;
      }

      this.slotError = "";
      this.apiError = "";
      this.isLoading = true;

      try {

        // ---------------------------------------------------
        // 5. WhatsApp Logic
        // ---------------------------------------------------
        let whatsappNumber = this.form.whatsapp_different
          ? this.form.alternative_phone_number
          : this.form.phone;

        if (this.form.whatsapp_different) {

          if (!this.form.alternative_phone_number) {
            this.apiError = "Please enter WhatsApp number";
            this.isLoading = false;
            return;
          }

          if (this.form.alternative_phone_number.length !== 10) {
            this.apiError = "Enter valid 10 digit WhatsApp number";
            this.isLoading = false;
            return;
          }
        }

        // ---------------------------------------------------
        // 6. Set Custom Appointment Values
        // ---------------------------------------------------

        // Company / Branch
        const customBranch = this.getBranchDisplayName(this.form.branch);
        // Selected time range
        const customTimeSlots = this.selectedSlot.time_range;

        console.log("========== APPOINTMENT SUBMIT ==========");
        console.log("Branch:", customBranch);
        console.log("Appointment Type:", this.form.appointment_type);
        console.log("Doctor:", this.form.doctor);
        console.log("Date:", this.form.date);
        console.log("Appointment Time:", this.form.time);
        console.log("Time Slot:", customTimeSlots);
        console.log("Token:", this.selectedSlot.token_no);

        // ---------------------------------------------------
        // 7. Create FormData
        // ---------------------------------------------------
        const formData = new FormData();

        formData.append(
          "name1",
          this.form.name
        );

        formData.append(
          "email",
          this.form.email || ""
        );

        formData.append(
          "gender",
          this.form.gender || ""
        );

        formData.append(
          "phone",
          this.form.phone
        );

        formData.append(
          "age",
          this.form.age
        );

        formData.append(
          "department",
          this.form.department
        );

        formData.append(
          "practitioner",
          this.form.doctor
        );

        formData.append(
          "appointment_type",
          this.form.appointment_type
        );

        formData.append(
          "appointment_date",
          this.form.date
        );

        // Start time
        formData.append(
          "appointment_time",
          this.form.time
        );

        formData.append(
          "notes",
          this.form.message || ""
        );

        // Token
        formData.append(
          "token_no",
          this.selectedSlot.token_no
        );

        // Location
        formData.append(
          "custom_location",
          this.form.custom_location || ""
        );

        // ---------------------------------------------------
        // NEW CUSTOM FIELDS
        // ---------------------------------------------------

        // Branch / Company
        formData.append(
          "custom_branch",
          customBranch
        );

        // Full selected time range
        formData.append(
          "custom_time_slots",
          customTimeSlots
        );

        // ---------------------------------------------------
        // WhatsApp
        // ---------------------------------------------------
        formData.append(
          "alternative_phone_number",
          whatsappNumber
        );

        formData.append(
          "whatsapp_number",
          this.form.whatsapp_different ? 1 : 0
        );

        // ---------------------------------------------------
        // Debug FormData
        // ---------------------------------------------------
        console.log("========== FORM DATA ==========");

        for (const [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }

        // ---------------------------------------------------
        // 8. API Call
        // ---------------------------------------------------
        const response = await fetch(
          "/api/method/drheal_frontend.api.Appointment_api.create_appointment",
          {
            method: "POST",
            body: formData
          }
        );

        const data = await response.json();

        console.log("Create Appointment Response:", data);

        // ---------------------------------------------------
        // 9. Backend Error
        // ---------------------------------------------------
        if (data?.message?.status === "error") {

          this.apiError =
            data.message.message ||
            "Unable to create appointment.";

          return;
        }

        // ---------------------------------------------------
        // 10. Success
        // ---------------------------------------------------
        if (data?.message?.status === "success") {

          const result = data.message;

          console.log(
            "Appointment Created Successfully:",
            result
          );

          this.resetForm();

          this.$router.push({
            path: "/thank-you",

            state: {
              appointmentId: result.appointment_id,

              appointmentDate:
                result.appointment_date,

              appointmentTime:
                result.appointment_time,

              customBranch:
                result.custom_branch,

              customTimeSlots:
                result.custom_time_slots,

              token_no:
                result.token_no,

              practitioner_id:
                result.practitioner
            }
          });

          return;
        }

        // ---------------------------------------------------
        // 11. Unexpected Response
        // ---------------------------------------------------
        this.apiError =
          "Unexpected response from appointment server.";

      } catch (error) {

        console.error(
          "Create Appointment Error:",
          error
        );

        this.apiError =
          "Something went wrong. Please contact directly through given phone number.";

      } finally {

        this.isLoading = false;
      }
    },

    resetForm() {
      this.form = {
        name: "",
        gender: "",
        email: "",
        phone: "",
        age: "",

        department: "Orthopaedics",

        branch: "",

        custom_branch: "",
        custom_time_slots: "",

        doctor: "",
        date: "",
        time: "",
        token_no: "",

        message: "",
        appointment_type: "",

        custom_location: "",

        whatsapp_different: false,
        alternative_phone_number: ""
      };

      this.doctors = [];
      this.selectedDoctor = null;
      this.selectedSlot = null;

      this.availableDates = [];
      this.availableTimes = [];
      this.schedule = [];

      this.selectedDateIndex = null;
    },
  },
};
</script>
