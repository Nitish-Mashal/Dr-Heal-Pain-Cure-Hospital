<template>
    <div class="bg-white">
        <!-- ================= CTA SECTION ================= -->
        <div class="px-5 relative z-20">
            <section class="relative bg-[#38113B] text-white rounded-3xl overflow-hidden -mb-40">
                <div class="relative z-10 px-6 py-20 mt-4 flex flex-col items-center text-center">
                    <h6 class="text-yellow-400 uppercase tracking-widest mb-2">
                        {{ cta.subtitle }}
                    </h6>

                    <h1 class="font-semibold mb-4" v-html="cta.title"></h1>

                    <p class="mb-8 max-w-xl" v-html="cta.description"></p>

                    <div class="flex gap-4">
                        <button
                            class="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-md transition">
                            {{ cta.primaryBtn }}
                        </button>

                        <button
                            class="bg-white text-[#38113B] font-medium px-6 py-2 rounded-md hover:bg-gray-100 transition">
                            {{ cta.secondaryBtn }}
                        </button>
                    </div>
                </div>

                <img src="/files/Footer-Overlay.jpg" alt="CTA Background"
                    class="absolute inset-0 w-full h-full object-cover opacity-30" />
            </section>
        </div>

        <!-- ================= FOOTER ================= -->
        <footer class="bg-[#065f7f] text-white pt-40 pb-10">
            <div class="px-5 pt-10">
                <div class="row g-4">

                    <!-- LOGO & SOCIAL -->
                    <div class="col-md-3">
                        <img src="/files/Dr.Heal-logo-white-logo.png" alt="Dr Heal" class="h-20 mb-4" />

                        <p class="mb-4">{{ tagline }}</p>

                        <div class="flex gap-2 text-sm">
                            <i v-for="icon in socialIcons" :key="icon"
                                :class="`bi ${icon} bg-color-orange px-2 py-1 rounded-5`"></i>
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
                            📞 {{ contact.phone }} <br />
                            ✉️
                            <a :href="`mailto:${contact.email}`" class="text-white underline">
                                {{ contact.email }}
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
                        class="no-underline text-white transition">
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
    "bi-facebook",
    "bi-twitter-x",
    "bi-linkedin",
    "bi-instagram",
    "bi-youtube",
]

const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Our Doctors", path: "/doctors" },
    { name: "Blogs", path: "/blogs" },
    { name: "Careers", path: "/careers" },
    { name: "Contact Us", path: "/contact" },
    { name: "Book an Appointment", path: "/appointment" },
]

const workingHours = [
    { day: "Monday - Friday", time: "07:00 am - 05:00 pm" },
    { day: "Saturday", time: "09:00 am - 02:00 pm" },
    { day: "Sunday", time: "10:00 am - 02:00 pm" },
]

const addresses = [
    "392, Ganapa Arcade, 9th Main Road, 7th Sector, HSR Layout, Bengaluru - 560102, KA, INDIA.",
    "Doctor Heal Hospital and Diagnostics Road, next to Kaushalya Vikas Kendra, Weavers Colony, Pillaganahalli, Bengaluru - 560083.",
    "ACHARYA POLY CLINIC AND LAB (A Dr. Heal Multispeciality Group Hospital), Opposite Bus Stop, Shanubhoganahalli, Bannerghatta Post, Anekal, Bengaluru - 560083.",
]

const contact = {
    phone: "079 6926 3030",
    email: "info@drheal.in",
}
</script>