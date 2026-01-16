<template>
    <header class="sticky top-0 z-50 w-full bg-white">
        <nav class="flex items-center justify-between px-6 md:px-20 py-3">
            <!-- Logo -->
            <router-link to="/" class="flex items-center">
                <img src="https://drheal.quantumberg.com/files/DrHeal-Logo.webp" alt="Dr Heal Pain Cure Hospital"
                    class="h-14" />
            </router-link>

            <!-- Desktop Menu -->
            <ul class="hidden md:flex items-center space-x-6 text-[13px] font-medium text-gray-800">
                <li><router-link to="/" class="nav-link">Home</router-link></li>
                <li><a href="#" class="nav-link">About Us</a></li>
                <li><a href="#" class="nav-link">Our Services</a></li>
                <li><a href="#" class="nav-link">Our Doctors</a></li>

                <!-- Dropdown -->
                <li class="relative group">
                    <div class="flex items-center gap-1 cursor-pointer hover:text-[#007f8c]">
                        More
                        <svg class="w-3 h-3 mt-[1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                    <ul
                        class="absolute left-0 top-full w-44 bg-white rounded-lg shadow-xl hidden group-hover:block z-[9999]">
                        <li>
                            <a href="#" class="dropdown-item">Facilities</a>
                        </li>
                        <li>
                            <a href="#" class="dropdown-item">Careers</a>
                        </li>
                        <li>
                            <a href="#" class="dropdown-item">Blogs</a>
                        </li>
                    </ul>
                </li>

                <li><a href="#" class="nav-link">Contact Us</a></li>
            </ul>

            <!-- Desktop Buttons -->
            <div class="hidden md:flex items-center space-x-4">
                <!-- Phone -->
                <div class="flex items-center gap-2 text-[#007f8c] font-semibold text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24
                            11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1
                            A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1
                            11.36 11.36 0 00.57 3.56 1 1 0 01-.24 1.01l-2.2 2.22z" />
                    </svg>
                    <span>07969288000</span>
                </div>

                <!-- Book Appointment -->
                <button class="bg-color-blue text-white px-5 py-2 rounded-lg text-sm font-semibold">
                    Book an Appointment
                </button>

                <!-- Login (FIXED) -->
                <a href="https://drheal.quantumberg.com/login"
                    class="bg-color-orange px-4 py-2 rounded-lg text-sm font-semibold text-white hover:bg-orange-600 transition text-center no-underline">
                    Login
                </a>
            </div>

            <!-- Mobile Hamburger -->
            <button @click="toggleMenu" class="md:hidden text-gray-800">
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

        <!-- Mobile Buttons -->
        <div class="md:hidden px-4 py-2 flex gap-3">
            <button class="flex-1 bg-color-blue text-white py-2 rounded-lg text-sm font-semibold">
                Book an Appointment
            </button>

            <a href="https://drheal.quantumberg.com/login"
                class="flex-1 bg-color-orange py-2 rounded-lg text-sm font-semibold text-white hover:bg-orange-600 transition text-center no-underline">
                Login
            </a>
        </div>

        <!-- Mobile Menu -->
        <div v-show="isMenuOpen" class="md:hidden bg-white px-3 pb-4">
            <ul class="flex flex-col space-y-3 font-medium">
                <li><router-link to="/" class="text-gray-800">Home</router-link></li>
                <li><a href="#" class="text-gray-800">About Us</a></li>
                <li><a href="#" class="text-gray-800">Our Services</a></li>
                <li><a href="#" class="text-gray-800">Our Doctors</a></li>

                <li>
                    <button @click="toggleSubMenu" class="flex items-center justify-between w-full text-gray-800">
                        More
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    <ul v-show="isSubMenuOpen" class="pl-4 mt-2 space-y-2 text-sm">
                        <li><a href="#" class="text-gray-800">Facilities</a></li>
                        <li><a href="#" class="text-gray-800">Careers</a></li>
                        <li><a href="#" class="text-gray-800">Blogs</a></li>
                    </ul>
                </li>

                <li><a href="#" class="text-gray-800">Contact Us</a></li>
            </ul>
        </div>
    </header>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)
const isSubMenuOpen = ref(false)

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

const toggleSubMenu = () => {
    isSubMenuOpen.value = !isSubMenuOpen.value
}
</script>

<style scoped>
.nav-link {
    position: relative;
}

.nav-link:hover {
    color: #007f8c;
}

.dropdown-item {
    display: block;
    padding: 0.5rem 1rem;
    font-size: 13px;
    color: #1f2937;
}

.dropdown-item:hover {
    background: #f3f4f6;
    color: #007f8c;
}
</style>
