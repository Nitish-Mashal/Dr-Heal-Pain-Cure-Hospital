<template>
    <header class="sticky top-0 z-50 w-full bg-white shadow-md">
        <nav class="flex items-center justify-between px-6 md:px-20 py-3">

            <!-- Logo -->
            <div class="flex items-center">
                <img src="/files/DrHeal-Logo.webp" alt="Dr Heal Pain Cure Hospital" class="h-14" />
            </div>

            <!-- Desktop Menu -->
            <ul class="hidden md:flex items-center space-x-6 text-[13px] font-medium text-gray-800">
                <li><a href="#" class="nav-link">Home</a></li>
                <li><a href="#" class="nav-link">About Us</a></li>
                <li class="relative group">
                    <a href="#" class="nav-link">Our Services</a>
                </li>
                <li><a href="#" class="nav-link">Our Doctors</a></li>
                <li class="relative group">
                    <a href="#" class="nav-link">Facilities</a>
                </li>
                <li><a href="#" class="nav-link">Careers</a></li>
                <li><a href="#" class="nav-link">Blogs</a></li>
                <li><a href="#" class="nav-link">Contact us</a></li>
            </ul>

            <!-- Right Section (Desktop) -->
            <div class="hidden md:flex items-center space-x-4">
                <button class="bg-[#007f8c] text-white px-5 py-2 rounded-lg text-sm font-semibold">
                    Book an Appointment
                </button>

                <div class="flex items-center space-x-2 text-[#007f8c] font-semibold text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24
              11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1
              A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1
              11.36 11.36 0 00.57 3.56 1 1 0 01-.24 1.01l-2.2 2.22z" />
                    </svg>
                    <span>07969288000</span>
                </div>
            </div>

            <!-- Mobile Hamburger -->
            <button @click="toggleMenu" class="md:hidden focus:outline-none text-gray-800">
                <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>

                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </nav>

        <!-- Mobile Menu -->
        <transition enter-active-class="transition-all duration-300" enter-from-class="opacity-0 -translate-y-3"
            enter-to-class="opacity-100 translate-y-0" leave-active-class="transition-all duration-300"
            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-3">
            <div v-show="isMenuOpen" class="md:hidden bg-white px-6 pb-4">
                <ul class="flex flex-col space-y-3 text-gray-800 font-medium">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Our Services</a></li>
                    <li><a href="#">Our Doctors</a></li>
                    <li><a href="#">Facilities</a></li>
                    <li><a href="#">Careers</a></li>
                    <li><a href="#">Blogs</a></li>
                    <li><a href="#">Contact us</a></li>
                    <li>
                        <button class="w-full bg-[#007f8c] text-white py-2 rounded-lg">
                            Book an Appointment
                        </button>
                    </li>
                </ul>
            </div>
        </transition>
    </header>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}
</script>


<style scoped>
.nav-link {
    text-decoration: none;
    position: relative;
}

.nav-link:hover {
    color: #007f8c;
}
</style>
