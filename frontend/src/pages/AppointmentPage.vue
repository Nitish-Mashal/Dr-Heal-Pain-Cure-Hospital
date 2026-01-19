<template>
  <!-- Banner -->
  <section
    class="relative w-full bg-cover h-72"
    style="background-image: url('/files/appointment-img.jpg');"
  >
    <div class="absolute inset-0 bg-white bg-opacity-50"></div>
    <div
      class="relative z-10 flex items-center justify-center h-full text-center px-4"
    >
      <h1 class="text-3xl md:text-5xl lg:text-7xl font-bold text-[#065f7f]">
        Book an Appointment
      </h1>
    </div>
  </section>



  <section class="px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-6">

    <div>
      <!-- Slot UI -->
      <div v-if="availableDates.length"
        class="bg-white rounded-lg p-4 shadow">

        <h2 class="font-bold text-xl mb-4 text-[#065f7f]">
          Select Appointment Slots

        </h2>
 <h3 class="text-xl font-bold leading-tight">
        {{ selectedDoctor.first_name }} {{selectedDoctor.department}}
      </h3>
        <!-- Date switch -->
        <div class="flex justify-center items-center gap-4 mb-6">
          <button @click="prevDate"
            class="w-8 h-8 border rounded-full">‹</button>

          <div class="px-6 py-2 rounded-full bg-green-100 text-green-700">
            {{ formattedDate }}
          </div>

          <button @click="nextDate"
            class="w-8 h-8 border rounded-full">›</button>
        </div>

        <!-- Slots -->
        <div class="grid grid-cols-3 gap-3">
<button
  v-for="slot in availableTimes"
  :key="slot.id"
  @click="!slot.booked && selectSlot(slot)"
  :disabled="slot.booked"
  :class="[
    'border rounded-lg py-2 text-sm transition w-full',
    slot.booked
      ? 'bg-red-500 text-white cursor-not-allowed'
      : selectedSlot?.id === slot.id
        ? 'bg-green-500 text-white'
        : 'bg-white hover:bg-green-50 cursor-pointer'
  ]"
>
  <div>{{ slot.display }}</div>
  <div class="text-xs">{{ slot.token_no }}</div>
</button>


        </div>
      </div>
    </div>

    <!-- RIGHT : FORM (YOUR FORM) -->
    <div class=" bg-[#BFD2F8] p-4 rounded shadow">
      <form @submit.prevent="submitAppointment" class="max-w-4xl mx-auto  bg-white p-6 rounded-xl shadow-md space-y-6">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
    <!-- Name -->
    <div class="flex flex-col">
      <label class="mb-1 font-semibold text-gray-700">Name *</label>
      <input v-model="form.name" required placeholder="Enter your name"
        class="px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#065f7f] transition"/>
    </div>

    <!-- Phone -->
    <div class="flex flex-col">
      <label class="mb-1 font-semibold text-gray-700">Phone *</label>
      <input v-model="form.phone" required placeholder="Enter your phone"
        class="px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#065f7f] transition"/>
    </div>

    <!-- Age -->
    <div class="flex flex-col">
      <label class="mb-1 font-semibold text-gray-700">Age *</label>
      <input v-model="form.age" type="number" required placeholder="Enter your age"
        class="px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#065f7f] transition"/>
    </div>

    <!-- Gender -->
    <div class="flex flex-col">
      <label class="mb-1 font-semibold text-gray-700">Gender *</label>
      <select v-model="form.gender" required
        class="px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#065f7f] transition">
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>
    </div>

    <!-- Department -->
    <div class="flex flex-col">
      <label class="mb-1 font-semibold text-gray-700">Department *</label>
      <select v-model="form.department" @change="fetchDoctors" required
        class="px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#065f7f] transition">
        <option value="">Select Department</option>
        <option v-for="d in departments" :key="d">{{ d }}</option>
      </select>
    </div>

    <!-- Doctor -->
    <div class="flex flex-col">
      <label class="mb-1 font-semibold text-gray-700">Doctor *</label>
      <select v-model="form.doctor" required
        class="px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#065f7f] transition">
        <option value="">Select Doctor</option>
        <option v-for="d in doctors" :key="d.name" :value="d.name">
          {{ d.full_name || d.first_name }}
        </option>
      </select>
    </div>

    <!-- Appointment Type -->
    <div class="flex flex-col">
      <label class="mb-1 font-semibold text-gray-700">Appointment Type *</label>
      <select v-model="form.appointment_type" required
        class="px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#065f7f] transition">
        <option value="">Select Type</option>
        <option v-for="t in appointment_types" :key="t.name">
          {{ t.appointment_type }}
        </option>
      </select>
    </div>

    <!-- Message (spans full width) -->
    <div class="flex flex-col md:col-span-2">
      <label class="mb-1 font-semibold text-gray-700">Message</label>
      <textarea v-model="form.message" rows="3" placeholder="Write your message"
        class="px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#065f7f] transition"></textarea>
    </div>
  </div>

  <!-- Submit Button -->
  <button type="submit"
    :disabled="!selectedSlot || isLoading"
    class="w-full bg-[#065f7f] text-white py-2 font-bold rounded-lg hover:bg-[#162059] transition">
    {{ isLoading ? 'Submitting...' : 'SUBMIT' }}
  </button>
</form>

    </div>

  </section>
<div class="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6 text-center">
  <p class="text-gray-900 mb-4">
To book an appointment directly, please call the number below.
  </p>

  <a
    href="tel:07969288000"
    class="inline-flex items-center justify-center w-full bg-[#065f7f] text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition"
  >
   Call 07969288000
  </a>
</div>

</template>

<script>

export default {
  name: "AppointmentPage",

  data() {
    return {
      isLoading: false,

      // Dropdown options
      departments: [],
      doctors: [],
      appointment_types: [],

      selectedDoctor: null,
      selectedSlot: null,
      isFetchingSlots: false,
    selectedDateIndex: null,

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
    const { department, doctor_id } = this.$route.query;

    if (department) this.form.department = department;

    if (doctor_id) {
      this.form.doctor = doctor_id;

      const doctor = await this.fetchDoctorById(doctor_id);
      if (doctor && !this.doctors.find(d => d.name === doctor.name)) {
        this.doctors.push(doctor);
      }
    }

    if (this.form.department && !this.form.doctor) {
      await this.fetchDoctors();
    }
  } catch (err) {
    console.error("Created hook error:", err);
  }
},

  computed: {
    formattedDate() {
      const d = this.availableDates[this.selectedDateIndex];
      return d ? new Date(d.date).toDateString() : "";
    }
  },

 watch: {
  async "form.doctor"(doctorId) {
    if (!doctorId) return;

    this.selectedDoctor = await this.fetchDoctorById(doctorId);
    await this.fetchDoctorSchedule(); // ✅ ONLY CALL
  }
},

  mounted() {
    this.fetchDepartments();
    this.fetchAppointmentTypes();
  },

  methods: {
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
      const res = await fetch(
        "/api/method/drheal_frontend.api.Appointment_api.get_appointment_types"
      );
      const data = await res.json();
      if (data.message?.status === "success") {
        this.appointment_types = data.message.data;
      }
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

    /* ---------------- DOCTORS BY DEPARTMENT ---------------- */
    async fetchDoctors() {
      if (!this.form.department) return;

      const res = await fetch(
        `/api/method/drheal_frontend.api.Appointment_api.get_practitioners?department=${encodeURIComponent(
          this.form.department
        )}`
      );
      const data = await res.json();
      if (data.message?.status === "success") {
        this.doctors = data.message.data;
      }
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
    this.availableDates = this.generateNext7Days(this.schedule);

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

generateNext7Days(schedule) {
  const today = new Date();
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const dates = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(today.getDate() + i);
    const day = days[d.getDay()];

    // Include only if schedule has slots on this day
    if (schedule.some(s => s.day === day)) {
      dates.push({
        date: d.toISOString().split("T")[0], // YYYY-MM-DD
        day
      });
    }
  }

  return dates;
},

/* ---------------- DATE / SLOT SELECTION ---------------- */
async selectDate(i) {
  if (!this.availableDates[i]) return;
  if (this.isFetchingSlots) return;

  this.isFetchingSlots = true;

  try {
    this.selectedDateIndex = i;
    this.form.date = this.availableDates[i].date;

    // Clear previous slots
    this.availableTimes = [];
    this.selectedSlot = null;

    // Fetch slots for the selected date
    const res = await fetch(
      `/api/method/drheal_frontend.api.Appointment_api.get_doctor_schedule` +
      `?practitioner=${encodeURIComponent(this.form.doctor)}` +
      `&appointment_date=${this.form.date}`
    );

    const data = await res.json();
    if (!Array.isArray(data.message)) return;

    // Remove duplicates using Map
    const uniqueSlots = Array.from(
      new Map(
        data.message.map(s => [`${s.from_time}-${s.to_time}`, s])
      ).values()
    );

    // Map to availableTimes
    this.availableTimes = uniqueSlots.map((s, idx) => ({
      id: `${s.token_no}-${s.from_time}-${s.to_time}-${this.form.date}`,
      display: `${s.from_time} - ${s.to_time}`,
      value: s.from_time,
      token_no: s.token_no || idx + 1,
      booked: !!s.booked
    }));
  } catch (err) {
    console.error("Error fetching slots:", err);
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
},

    /* ---------------- SUBMIT ---------------- */
    async submitAppointment() {
  this.isLoading = true

  try {
    const formData = new FormData()
    formData.append("name1", this.form.name)
    formData.append("email", this.form.email)
    formData.append("gender", this.form.gender)
    formData.append("appointment_type", this.form.appointment_type)
    formData.append("appointment_date", this.form.date)
    formData.append("appointment_time", this.form.time)
    formData.append("practitioner", this.form.doctor)
    formData.append("department", this.form.department)
    formData.append("notes", this.form.message || "")
    formData.append("phone", this.form.phone)
    formData.append("age", this.form.age)
    const response = await fetch(
      "/api/method/drheal_frontend.api.Appointment_api.create_appointment",
      {
        method: "POST",
        body: formData
      }
    )

    const data = await response.json()
    console.log("✅ API Response:", data)

    const result = data.message || data

    if (result.status === "success") {
     this.resetForm()
      this.$router.push({
        path: "/thank-you",
        state: {
          appointmentId: result.appointment_id,
          appointmentDate: result.appointment_date,
          appointmentTime: result.appointment_time
        }
      })
      return
    }
    this.message = {
      text: result.message || "Failed to book appointment",
      type: "error"
    }

  } catch (error) {
    console.error("Network/API Error:", error)
    this.message = {
      text: "Something went wrong. Please try again.",
      type: "error"
    }
  } finally {
    // ✅ALWAYS stop loading (success or fail)
    this.isLoading = false
  }
},

    resetForm() {
      this.form = {
        name: "",
        gender: "",
        email: "",
        phone: "",
        department: "",
        doctor: "",
        date: "",
        time: "",
        token_no: "",
        message: "",
        appointment_type: "",
      };
      this.doctors = [];
    },
  },
};
</script>

