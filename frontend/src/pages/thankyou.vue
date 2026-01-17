<template>
  <div class="relative min-h-screen bg-[#F5F9FF] flex flex-col items-center justify-center overflow-hidden">
        <div class="max-w-2xl w-full bg-white rounded-2xl shadow px-8 py-6 sm:px-12 sm:py-8 text-center">

            <!-- ✅ Success Icon -->
            <div class="flex justify-center mb-3">
                <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-100 flex items-center justify-center">
                    <svg class="w-8 h-8 sm:w-10 sm:h-10 text-green-600" fill="none" stroke="currentColor"
                        stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            </div>

            <!-- ✅ Title -->
            <h1 class="text-2xl sm:text-3xl font-bold text-[#001D55] mb-1">
                Appointment Confirmed!
            </h1>

            <!-- ✅ Subtitle -->
            <p class="text-gray-600 text-sm sm:text-base mb-3">
                Your appointment with the doctor has been successfully booked.
            </p>

            <!-- ✅ Appointment Details -->
            <div class="text-left mb-4 px-4">
                <p v-if="appointmentId" class="text-sm text-gray-700 mb-1">
                    <strong>Appointment ID:</strong>
                    <span class="text-[#001D55] font-semibold ml-1">
                        {{ appointmentId }}
                    </span>
                </p>
               
                <p v-if="appointmentDate" class="text-sm text-gray-700 mb-1">
                    <strong>Date:</strong>
                    <span class="ml-1">{{ appointmentDate }}</span>
                </p>
                <p v-if="appointmentTime" class="text-sm text-gray-700 mb-1">
                    <strong>Time:</strong>
                    <span class="ml-1">{{ appointmentTime }}</span>
                </p>
            </div>

            <!-- ✅ Info Box -->
            <div class="bg-[#F0F6FF] rounded-xl px-5 py-4 text-left">
                <p class="text-sm text-gray-700 mb-2">
                    <strong class="text-[#001D55]">What to do next?</strong>
                </p>

                <ul class="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>Our clinic will contact you to confirm your appointment.</li>
                    <li>Please arrive 10 minutes before your scheduled time.</li>
                    <li>Bring any previous reports or prescriptions if needed.</li>
                    <li>Your doctor will provide guidance and next steps after consultation.</li>
                </ul>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const appointmentId = ref(history.state?.appointmentId || "");
const appointmentDate = ref(history.state?.appointmentDate || "");
const appointmentTime = ref(history.state?.appointmentTime || "");


onMounted(() => {
  // 🚫 Prevent refresh or direct URL access
  if (!appointmentId.value) {
    router.replace("/");
  }
});
</script>