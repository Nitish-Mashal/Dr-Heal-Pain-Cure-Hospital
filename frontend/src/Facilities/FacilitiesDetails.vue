<template>
    <div class="container-fluid mb-5">

        <!-- ================= BANNER ================= -->
        <div v-if="facility" class="relative w-full h-80 overflow-hidden mb-5 container-fluid rounded-4">
            <!-- Background Image -->
            <img :src="facilityImage" :alt="facility.name1" class="w-full h-full object-cover" />

            <!-- Overlay -->
            <div class="absolute inset-0 bg-[#38113B] opacity-70"></div>

            <!-- Title -->
            <div class="absolute inset-0 flex items-center justify-center z-10 px-6">
                <h1 class="text-white font-semibold text-center text-2xl md:text-4xl">
                    {{ facility.name1 }}
                </h1>
            </div>
        </div>

        <!-- ================= CONTENT ================= -->
        <div v-if="facility" class="container">
            <div class="row">
                <div class="col-12">
                    <div class="text-gray-700 leading-relaxed" v-html="facility.description"></div>
                </div>
            </div>
        </div>

        <!-- ================= LOADING ================= -->
        <div v-else class="text-center py-20 text-gray-500">
            Loading facility details...
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const facility = ref(null)
const facilities = ref([])

// Fetch all facilities (like services)
const fetchFacilities = async () => {
    try {
        const res = await fetch("/api/method/drheal_frontend.api.facilities.get_our_facilities")
        const data = await res.json()

        if (data.message?.status === "success") {
            facilities.value = data.message.data
            // Find facility that matches slug in URL
            facility.value = facilities.value.find(f => f.url === route.params.slug)
        }
    } catch (error) {
        console.error("Failed to fetch facilities", error)
    }
}

// Compute full image URL
const facilityImage = computed(() => {
    if (!facility.value?.thumnail_image) return ""
    return facility.value.thumnail_image.startsWith("http")
        ? facility.value.thumnail_image
        : `https://drheal.quantumberg.com${facility.value.thumnail_image}`
})

onMounted(fetchFacilities)
</script>
