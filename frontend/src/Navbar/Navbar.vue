<template>
    <header class="sticky top-0 z-50 w-full bg-white">
        <nav class="flex items-center justify-between px-6 md:px-20 py-2">

            <!-- LOGO -->
            <router-link to="/" class="flex items-center">
                <img src="https://drheal.quantumberg.com/files/DrHeal-Logo.webp" alt="Dr Heal Pain Cure Hospital"
                    class="h-14" />
            </router-link>

            <!-- ================= DESKTOP MENU ================= -->
            <ul class="hidden md:flex items-center space-x-6 text-[15px] font-medium">

                <li>
                    <router-link to="/"
                        class="hover:text-[#007f8c] transition text-gray-800 no-underline">Home</router-link>
                </li>

                <li>
                    <router-link to="/about-us" class="hover:text-[#007f8c] transition text-gray-800 no-underline">About
                        Us</router-link>
                </li>
                <!-- SERVICES -->
                <li class="relative group">
                    <div class="flex items-center gap-1 cursor-pointer hover:text-[#007f8c] text-gray-800 transition">
                        Services
                        <svg class="w-3 h-3 mt-[1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>

                    <ul class="absolute left-1/2 top-full -translate-x-1/2
           bg-white rounded-xl shadow-xl
           hidden group-hover:block
           px-6 py-4
           z-[9999]
           columns-3
           column-gap-10
           min-w-[720px]">
                        <li v-for="service in services" :key="service.url" class="break-inside-avoid mb-3">
                            <router-link :to="`/services/${service.url}`"
                                class="block text-[14px] font-medium text-gray-800 hover:text-[#007f8c] transition no-underline">
                                {{ service.name1 }}
                            </router-link>
                            <hr class="mt-2">
                        </li>
                    </ul>
                </li>


                <!-- DOCTORS -->
                <li>
                    <router-link to="/doctors-list"
                        class="hover:text-[#007f8c] text-gray-800 no-underline transition">Doctors</router-link>
                </li>

                <!-- FACILITIES -->
                <li class="relative group">
                    <div class="flex items-center gap-1 cursor-pointer hover:text-[#007f8c] text-gray-800 transition">
                        Facilities
                        <svg class="w-3 h-3 mt-[1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>

                    <ul class="absolute left-1/2 top-full -translate-x-1/2
           bg-white rounded-xl shadow-xl
           hidden group-hover:block
           px-6 py-4
           z-[9999]
           columns-3
           column-gap-10
           min-w-[720px]">
                        <li v-for="facility in facilities" :key="facility.url" class="break-inside-avoid mb-3">
                            <router-link :to="`/facilities/${facility.url}`"
                                class="block text-[14px] font-medium text-gray-800 hover:text-[#007f8c] transition no-underline">
                                {{ facility.name1 }}
                            </router-link>
                            <hr class="mt-2">
                        </li>
                    </ul>
                </li>



                <!-- MORE -->
                <li class="relative group">
                    <div class="flex items-center gap-1 cursor-pointer hover:text-[#007f8c] text-gray-800 transition">
                        More
                        <svg class="w-3 h-3 mt-[1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>

                    <ul class="absolute left-1/2 top-full -translate-x-1/2
           mt-0 min-w-[280px]
           bg-white rounded-xl shadow-xl
           hidden group-hover:flex flex-col
           px-5 py-4 space-y-4
           z-[9999]">
                        <li>
                            <router-link to="/careers"
                                class="block text-[14px] font-medium text-gray-800 hover:text-[#007f8c] transition no-underline">
                                Careers
                            </router-link>
                        </li>

                        <li>
                            <router-link to="/blog"
                                class="block text-[14px] font-medium text-gray-800 hover:text-[#007f8c] transition no-underline">
                                Blogs
                            </router-link>
                        </li>
                    </ul>
                </li>



                <li>
                    <router-link to="/contact-us"
                        class="hover:text-[#007f8c] transition text-gray-800 no-underline">Contact Us</router-link>
                </li>
            </ul>

            <!-- ================= DESKTOP BUTTONS ================= -->
            <div class="hidden md:flex items-center space-x-4">
                <div class="flex items-center gap-2 text-[#007f8c] font-semibold text-sm ">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24
           11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1
           A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1
           11.36 11.36 0 00.57 3.56 1 1 0 01-.24 1.01l-2.2 2.22z" />
                    </svg>
                    <a href="tel:07969288000" class="text-[#007f8c]">07969288000</a>
                </div>

                <router-link to="/doctors-list">
                    <button class="bg-color-blue text-white px-4 py-2 rounded-lg text-sm font-semibold">Book an
                        Appointment</button>
                </router-link>

                <a href="https://drheal.quantumberg.com/login"
                    class="bg-color-orange px-4 py-2 rounded-lg text-sm font-semibold text-white hover:bg-orange-600 transition no-underline">
                    Login
                </a>
            </div>

            <!-- MOBILE TOGGLE -->
            <button @click="toggleMenu" class="md:hidden text-gray-800">
                <svg v-if="!isMenuOpen" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </nav>

        <!-- ================= MOBILE BUTTONS OUTSIDE MENU ================= -->
        <div class="md:hidden px-4 py-2 flex gap-3 items-center">
            <router-link to="/doctors-list" class="flex-1">
                <button class="w-full bg-color-blue text-white py-2 rounded-lg text-sm font-semibold">
                    Book an Appointment
                </button>
            </router-link>

            <!-- PHONE NUMBER (replacing Login) -->
            <a href="tel:07969288000"
                class="flex-1 flex items-center justify-center gap-2 bg-color-orange text-white py-2 rounded-lg text-sm font-semibold no-underline">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24
        11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1
        A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1
        11.36 11.36 0 00.57 3.56 1 1 0 01-.24 1.01l-2.2 2.22z" />
                </svg>
                Call
            </a>
        </div>


        <!-- ================= MOBILE MENU ================= -->
        <div v-show="isMenuOpen" class="md:hidden bg-white px-3 pb-4 mobile-menu-wrapper relative z-[99999]">
            <ul class="flex flex-col space-y-3 text-[15px] font-medium text-gray-800">

                <li><router-link to="/" class="text-gray-800 no-underline">Home</router-link></li>
                <li><router-link to="/about-us" class="text-gray-800 no-underline">About Us</router-link></li>

                <!-- MOBILE SERVICES -->
                <li>
                    <button @click="activeMobileDropdown = 'services'" class="flex w-full gap-2 items-center">
                        Services
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </li>

                <!-- MOBILE DOCTORS -->
                <li><router-link to="/doctors-list" class="text-gray-800 no-underline">Doctors</router-link></li>

                <!-- MOBILE FACILITIES -->
                <li>
                    <button @click="activeMobileDropdown = 'facilities'" class="flex w-full gap-2 items-center">
                        Facilities
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </li>

                <!-- MOBILE MORE -->
                <li>
                    <button @click="activeMobileDropdown = 'more'" class="flex w-full gap-2 items-center">
                        More
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </li>

                <li><router-link to="/contact-us" class="text-gray-800 no-underline">Contact Us</router-link></li>

                <li>
                    <a href="https://drheal.quantumberg.com/login" class="block w-full text-gray-800 no-underline">
                        Login
                    </a>
                </li>

            </ul>
        </div>
        <!-- ================= MOBILE DROPDOWN CARD (COMPACT) ================= -->
        <div v-if="activeMobileDropdown"
            class="fixed inset-0 z-[100000] md:hidden flex items-start justify-center pt-24">
            <!-- Backdrop -->
            <div class="absolute inset-0 bg-black/30" @click="activeMobileDropdown = null"></div>

            <!-- Card -->
            <div class="relative bg-white w-[90%] max-w-[420px]
           rounded-xl shadow-2xl
           max-h-[65vh]
           flex flex-col">
                <!-- Header -->
                <div class="flex items-center justify-between px-4 py-3 border-b">
                    <h3 class="font-semibold text-sm uppercase tracking-wide">
                        {{ activeMobileDropdown }}
                    </h3>
                    <button @click="activeMobileDropdown = null" class="text-lg leading-none">
                        ✕
                    </button>
                </div>

                <!-- Scrollable List -->
                <div class="flex-1 overflow-y-auto overscroll-contain px-4 py-2">
                    <!-- SERVICES -->
                    <ul v-if="activeMobileDropdown === 'services'" class="divide-y">
                        <li v-for="service in services" :key="service.url">
                            <router-link :to="`/services/${service.url}`"
                                class="block py-3 text-[14px] font-medium text-gray-800 no-underline"
                                @click="activeMobileDropdown = null">
                                {{ service.name1 }}
                            </router-link>
                        </li>
                    </ul>

                    <!-- FACILITIES -->
                    <ul v-if="activeMobileDropdown === 'facilities'" class="divide-y">
                        <li v-for="facility in facilities" :key="facility.url">
                            <router-link :to="`/facilities/${facility.url}`"
                                class="block py-3 text-[14px] font-medium text-gray-800 no-underline"
                                @click="activeMobileDropdown = null">
                                {{ facility.name1 }}
                            </router-link>
                        </li>
                    </ul>

                    <!-- MORE -->
                    <ul v-if="activeMobileDropdown === 'more'" class="divide-y">
                        <li>
                            <router-link to="/careers"
                                class="block py-3 text-[14px] font-medium text-gray-800 no-underline"
                                @click="activeMobileDropdown = null">
                                Careers
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/blog"
                                class="block py-3 text-[14px] font-medium text-gray-800 no-underline"
                                @click="activeMobileDropdown = null">
                                Blogs
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>


    </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue"
import { useRouter } from "vue-router"

const activeMobileDropdown = ref(null)
const isMenuOpen = ref(false)
const mobileServices = ref(false)
const mobileFacilities = ref(false)
const mobileMore = ref(false)

const services = ref([])
const facilities = ref([])

// ========================= FETCH DATA =========================
const fetchServices = async () => {
    try {
        const res = await fetch("/api/method/drheal_frontend.api.our_services.get_our_services")
        const data = await res.json()
        if (data.message?.status === "success") services.value = data.message.data
    } catch (err) {
        console.error(err)
    }
}

const fetchFacilities = async () => {
    try {
        const res = await fetch("/api/method/drheal_frontend.api.facilities.get_our_facilities")
        const data = await res.json()
        if (data.message?.status === "success") facilities.value = data.message.data
    } catch (err) {
        console.error(err)
    }
}

// ========================= TOGGLE FUNCTIONS =========================
const toggleMenu = (event) => {
    event.stopPropagation() // <--- stop event bubbling to document
    isMenuOpen.value = !isMenuOpen.value
}

const toggleServices = () => (mobileServices.value = !mobileServices.value)
const toggleFacilities = () => (mobileFacilities.value = !mobileFacilities.value)
const toggleMore = () => (mobileMore.value = !mobileMore.value)

// ========================= CLICK OUTSIDE =========================
const handleClickOutside = (event) => {
    const mobileMenu = document.querySelector(".mobile-menu-wrapper")
    if (mobileMenu && !mobileMenu.contains(event.target)) {
        isMenuOpen.value = false
        mobileServices.value = false
        mobileFacilities.value = false
        mobileMore.value = false
    }
}

// ========================= ROUTER WATCH =========================
const router = useRouter()
watch(
    () => router.currentRoute.value.fullPath,
    () => {
        isMenuOpen.value = false
        mobileServices.value = false
        mobileFacilities.value = false
        mobileMore.value = false
    }
)

// ========================= ON MOUNT =========================
onMounted(() => {
    fetchServices()
    fetchFacilities()
    document.addEventListener("click", handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside)
})
</script>
