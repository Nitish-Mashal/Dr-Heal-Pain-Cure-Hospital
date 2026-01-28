<template>
    <div class="bg-white">

        <!-- ================= FOOTER ================= -->
        <!-- <footer class="bg-color-blue text-white pt-40 pb-10"> -->
        <footer class="bg-color-blue text-white pt-8 pb-8">
            <div class="px-5 pt-10">
                <div class="row g-4">

                    <!-- LOGO & SOCIAL -->
                    <div class="col-md-3">
                        <img src="https://drheal.quantumberg.com/files/Dr.Heal-logo-white-logo.png" alt="Dr Heal"
                            class="h-20 mb-4" />

                        <p class="mb-4">{{ tagline }}</p>

                        <div class="flex gap-2 text-sm">
                            <a v-for="social in socialIcons" :key="social.icon" :href="social.url" target="_blank"
                                rel="noopener noreferrer" class="bg-color-orange px-2 py-1 rounded-5 text-white">
                                <i :class="`bi ${social.icon}`"></i>
                            </a>
                        </div>
                    </div>

                    <!-- QUICK LINKS -->
                    <div class="col-md-3">
                        <h5 class="mb-3">Quick Links</h5>
                        <ul class="list-unstyled space-y-2 text-[15px]">
                            <li v-for="link in quickLinks" :key="link.name">
                                <router-link :to="link.path" class="text-white no-underline hover:underline">
                                    {{ link.name }}
                                </router-link>
                            </li>
                        </ul>
                    </div>

                    <!-- WORKING HOURS -->
                    <div class="col-md-3">
                        <h5 class="mb-3">Working Hours</h5>
                        <ul class="list-unstyled leading-7 text-[15px]">
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
                        <p class="text-[15px]">
                            📞
                            <a href="tel:07969288000" class="text-white underline">
                                07969288000
                            </a>
                            <br />

                            ✉️
                            <a href="mailto:info@drheal.in" class="text-white underline">
                                info@drheal.in
                            </a>
                        </p>
                    </div>

                </div>
            </div>

            <div class="w-full h-px bg-white my-2"></div>

            <div
                class="px-5 pt-6 flex flex-col md:flex-row md:justify-between md:items-center gap-2 text-center md:text-left">
                <p>
                    Copyright © {{ new Date().getFullYear() }}. All rights reserved.
                </p>

                <p>
                    Powered by
                    <a href="https://quantumberg.com/" target="_blank" rel="noopener noreferrer"
                        class="underline text-white transition">
                        Quantumberg Technologies Pvt Ltd
                    </a>
                </p>
            </div>
        </footer>
    </div>
</template>

<script setup>

const tagline =
    "Healing Pain Without Surgery. Restoring Life With Purpose."

const cta = {
    subtitle: "Book Now",
    title: "Book Your Healthcare <br> Appointment Today",
    description:
        "Easily schedule your ortho care visit with expert doctors from the <br> comfort of your home. Quick, reliable, and personalized care just a click away.",
    primaryBtn: "Book Now",
    secondaryBtn: "Contact Us",
}

const socialIcons = [
    { icon: "bi-facebook", url: "https://www.facebook.com/drhealbangalore" },
    { icon: "bi-twitter-x", url: "https://x.com/drhealpaincure" },
    { icon: "bi-linkedin", url: "https://www.linkedin.com/company/drhealpaincurehospital/" },
    { icon: "bi-instagram", url: "https://www.instagram.com/drhealpaincurehospital" },
    { icon: "bi-youtube", url: "https://www.youtube.com/@drhealpaincurehospital" },
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
    { day: "Monday - Friday", time: "07:00 am - 06:00 pm" },
    { day: "Saturday", time: "07:00 am - 06:00 pm" },
    { day: "Sunday", time: "07:00 am - 06:00 pm" },
]

const addresses = [
    "392, Ganapa Arcade, 9th Main Road, 7th Sector, HSR Layout, Bengaluru - 560102, KA, INDIA.",
    "Doctor Heal Hospital and Diagnostics Road, next to Kaushalya Vikas Kendra, Weavers Colony, Pillaganahalli, Bengaluru - 560083.",
    "ACHARYA POLY CLINIC AND LAB (A Dr. Heal Multispeciality Group Hospital), Opposite Bus Stop, Shanubhoganahalli, Bannerghatta Post, Anekal, Bengaluru - 560083.",
]
</script>