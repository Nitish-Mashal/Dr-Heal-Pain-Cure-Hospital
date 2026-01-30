<template>
    <footer class="bg-color-blue text-white pt-8 pb-8">
        <div class="px-5 pt-10">
            <div class="row g-4">

                <!-- LOGO & SOCIAL -->
                <div class="col-md-3">
                    <img src="https://drheal.quantumberg.com/files/Dr.Heal-logo-white-logo.png"
                        alt="Dr Heal Hospital Logo" width="180" height="80" loading="lazy" decoding="async"
                        class="h-20 mb-4 object-contain" />

                    <p class="mb-4">{{ tagline }}</p>

                    <div class="flex gap-2 text-sm">
                        <a v-for="social in socialIcons" :key="social.icon" :href="social.url" target="_blank"
                            rel="noopener noreferrer" class="bg-color-orange px-2 py-1 rounded-5 text-white"
                            :aria-label="social.label">
                            <i :class="`bi ${social.icon}`" role="img" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>

                <!-- QUICK LINKS -->
                <div class="col-md-3">
                    <h5 class="mb-3 ml-8">Quick Links</h5>
                    <ul class="space-y-2 text-[15px]">
                        <li v-for="link in quickLinks" :key="link.path">
                            <router-link :to="link.path" class="text-white no-underline hover:underline">
                                {{ link.name }}
                            </router-link>
                        </li>
                    </ul>
                </div>

                <!-- WORKING HOURS -->
                <div class="col-md-3">
                    <h5 class="mb-3 ml-8">Working Hours</h5>
                    <ul class="leading-7 text-[15px]">
                        <li v-for="day in workingHours" :key="day.day" class="mb-3">
                            <strong>{{ day.day }}</strong><br />
                            {{ day.time }}
                        </li>
                    </ul>
                </div>

                <!-- ADDRESS & CONTACT -->
                <div class="col-md-3">
                    <h5 class="mb-3">Address</h5>
                    <p v-for="(address, index) in addresses" :key="index" class="text-[15px] mb-3 leading-6">
                        {{ address }}
                    </p>

                    <h5 class="mt-4 mb-2">Contact</h5>

                    <div class="text-[15px] space-y-3">
                        <!-- Phone -->
                        <div class="flex items-center gap-3">
                            <svg class="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                role="img" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                            </svg>
                            <a href="tel:07969288000" class="underline text-white">07969288000</a>
                        </div>

                        <!-- Email -->
                        <div class="flex items-center gap-3">
                            <svg class="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                role="img" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg>
                            <a href="mailto:info@drheal.in" class="underline text-white">info@drheal.in</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="w-full h-px bg-white my-2"></div>

        <div
            class="px-5 pt-6 flex flex-col md:flex-row md:justify-between md:items-center gap-2 text-center md:text-left">
            <p>Copyright © {{ year }}. All rights reserved.</p>
            <p>
                Powered by
                <a href="https://quantumberg.com/" target="_blank" rel="noopener noreferrer"
                    class="underline text-white">
                    Quantumberg Technologies Pvt Ltd
                </a>
            </p>
        </div>
    </footer>
</template>

<script setup>
const year = new Date().getFullYear()

const tagline = "Healing Pain Without Surgery. Restoring Life With Purpose."

const socialIcons = [
    { icon: "bi-facebook", url: "https://www.facebook.com/drhealbangalore", label: "Facebook" },
    { icon: "bi-twitter-x", url: "https://x.com/drhealpaincure", label: "Twitter X" },
    { icon: "bi-linkedin", url: "https://www.linkedin.com/company/drhealpaincurehospital/", label: "LinkedIn" },
    { icon: "bi-instagram", url: "https://www.instagram.com/drhealpaincurehospital", label: "Instagram" },
    { icon: "bi-youtube", url: "https://www.youtube.com/@drhealpaincurehospital", label: "YouTube" },
]

const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about-us" },
    { name: "Our Doctors", path: "/doctors-list" },
    { name: "Blogs", path: "/blog" },
    { name: "Careers", path: "/careers" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact Us", path: "/contact-us" },
    { name: "Book an Appointment", path: "/appointment" },
    { name: "Terms & Conditions", path: "/terms-and-conditions" },
    { name: "Privacy Policy", path: "/privacy-policy" },
]

const workingHours = [
    { day: "Monday - Sunday", time: "07:00 am - 06:00 pm" },
]

const addresses = [
    "392, Ganapa Arcade, 9th Main Road, 7th Sector, HSR Layout, Bengaluru - 560102, KA, INDIA.",
    "Doctor Heal Hospital and Diagnostics Road, next to Kaushalya Vikas Kendra, Weavers Colony, Pillaganahalli, Bengaluru - 560083.",
    "ACHARYA POLY CLINIC AND LAB (Dr. Heal Multispeciality Group Hospital), Bannerghatta Post, Anekal, Bengaluru - 560083.",
]
</script>
