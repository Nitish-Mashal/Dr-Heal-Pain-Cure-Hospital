<template>
    <footer class="text-gray-700 pb-8">
        <div class="w-full h-px bg-gray-700 my-2"></div>
        <div class="px-5 pt-10">
            <div class="row g-4">

                <!-- LOGO & SOCIAL -->
                <div class="col-md-3">
                    <img src="https://www.drheal.in/files/DrHeal-Logo.webp"
                        alt="Dr. Heal Multispeciality Hospital – Dr Heal Logo" width="180" height="80" loading="lazy"
                        decoding="async" class="h-20 mb-4 object-contain" />

                    <p class="mb-4">{{ tagline }}</p>

                    <!-- Social Icons -->
                    <div class="flex gap-2 text-sm mb-2">
                        <a v-for="social in socialIcons" :key="social.icon" :href="social.url" target="_blank"
                            rel="noopener noreferrer" class="bg-color-orange px-2 py-1 rounded-5 text-white mb-3"
                            :aria-label="social.label">
                            <i :class="`bi ${social.icon}`"></i>
                        </a>
                    </div>

                    <!-- Install / Open Buttons -->
                    <div class="flex flex-col gap-3 items-start">

                        <!-- Show Install buttons if app NOT installed -->
                        <button v-if="!isInstalled" id="installAndroid" class="inline-flex items-center gap-3 px-4 py-2 w-[150px]
                                       bg-color-blue text-white
                                       rounded-xl shadow-md transition duration-300" @click="installApp">
                            <i class="bi bi-android2 text-xl"></i>
                            <div class="text-left">
                                <div class="text-xs opacity-80">Get it on</div>
                                <div class="font-semibold">Android</div>
                            </div>
                        </button>

                        <button v-if="!isInstalled" id="installIOS" class="inline-flex items-center gap-3 px-4 py-2 w-[150px]
                                       bg-color-orange text-white
                                       rounded-xl shadow-md transition duration-300" @click="installApp">
                            <i class="bi bi-apple text-xl"></i>
                            <div class="text-left">
                                <div class="text-xs opacity-80">Download on</div>
                                <div class="font-semibold">iOS</div>
                            </div>
                        </button>

                        <!-- Show Open App button if installed -->
                        <!-- <button v-else class="inline-flex items-center gap-3 px-4 py-2 w-[150px]
                                       bg-color-green text-white
                                       rounded-xl shadow-md transition duration-300" @click="openApp">
                            <i class="bi bi-box-arrow-up-right text-xl"></i>
                            <div class="text-left">
                                <div class="font-semibold">Open App</div>
                            </div>
                        </button> -->

                    </div>
                </div>

                <!-- QUICK LINKS -->
                <div class="col-md-3">
                    <h5 class="mb-3 ml-8">Quick Links</h5>
                    <ul class="space-y-2 text-[15px]">
                        <li v-for="link in quickLinks" :key="link.path">
                            <router-link :to="link.path" class="text-gray-700 no-underline hover:underline">
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
                    <div class="text-[15px] space-y-3 pb-4">
                        <div class="flex items-center gap-3">
                            <a href="tel:07969288000" class="underline text-gray-700">07969288000</a>
                        </div>
                        <div class="flex items-center gap-3">
                            <a href="mailto:info@drheal.in" class="underline text-gray-700">info@drheal.in</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="w-full h-px bg-gray-700 my-2"></div>

        <div
            class="px-5 pt-4 flex flex-col md:flex-row md:justify-between md:items-center gap-2 text-center md:text-left">
            <p>Copyright © {{ year }}. All rights reserved.</p>
            <p>
                Powered by
                <a href="https://quantumberg.com/" target="_blank" rel="noopener noreferrer"
                    class="underline text-gray-700">
                    Quantumberg Technologies Pvt Ltd
                </a>
            </p>
        </div>
    </footer>
</template>

<script setup>
import { ref, onMounted } from "vue";

const deferredPrompt = ref(null);
const isInstalled = ref(false);
const isIOS = ref(false);

// Detect iOS
const detectIOS = () => {
    isIOS.value = /iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase());
};

// Detect if PWA is installed
const checkInstalled = () => {
    const standaloneMode =
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true;

    const savedInstall = localStorage.getItem("pwaInstalled") === "true";

    if (standaloneMode || savedInstall) {
        isInstalled.value = true;
    }
};

// Capture install prompt
window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt.value = e;
});

// Detect successful install
window.addEventListener("appinstalled", () => {
    isInstalled.value = true;
    localStorage.setItem("pwaInstalled", "true");
    deferredPrompt.value = null;
});

// Install button click
const installApp = async () => {
    if (isInstalled.value) return;

    // iOS instructions
    if (isIOS.value) {
        alert(
            "To install this app on iPhone:\n\n" +
            "1. Tap Share\n" +
            "2. Add to Home Screen\n" +
            "3. Tap Add"
        );
        return;
    }

    // Android install popup
    if (deferredPrompt.value) {
        deferredPrompt.value.prompt();

        const result = await deferredPrompt.value.userChoice;

        if (result.outcome === "accepted") {
            isInstalled.value = true;
            localStorage.setItem("pwaInstalled", "true");
        }

        deferredPrompt.value = null;
    }
};

const year = new Date().getFullYear();
const tagline = "Healing Pain Without Surgery. Restoring Life With Purpose.";

const socialIcons = [
    { icon: "bi-facebook", url: "https://www.facebook.com/drhealbangalore", label: "Facebook" },
    { icon: "bi-youtube", url: "https://www.youtube.com/@drhealpaincurehospital", label: "YouTube" },
    { icon: "bi-instagram", url: "https://www.instagram.com/drhealpaincurehospital", label: "Instagram" },
    { icon: "bi-linkedin", url: "https://www.linkedin.com/company/drhealpaincurehospital/", label: "LinkedIn" },
    { icon: "bi-twitter-x", url: "https://x.com/drhealpaincure", label: "Twitter X" },
];

const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about-us" },
    { name: "Our Doctors", path: "/doctors-list" },
    { name: "Blogs", path: "/blog" },
    { name: "Careers", path: "/careers" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact Us", path: "/contact-us" },
    {
        name: "Book an Appointment",
        path: { path: "/appointment", query: { department: "Orthopaedics" } }
    },
    { name: "Terms & Conditions", path: "/terms-and-conditions" },
    { name: "Privacy Policy", path: "/privacy-policy" },
];

const workingHours = [
    { day: "Monday - Sunday", time: "07:00 am - 06:00 pm" },
];

const addresses = [
    "392, Ganapa Arcade, 9th Main Road, 7th Sector, HSR Layout, Bengaluru - 560102, KA, INDIA.",
    "Doctor Heal Hospital and Diagnostics Road, next to Kaushalya Vikas Kendra, Weavers Colony, Pillaganahalli, Bengaluru - 560083.",
    "ACHARYA POLY CLINIC AND LAB (Dr. Heal Multispeciality Group Hospital), Bannerghatta Post, Anekal, Bengaluru - 560083.",
];

onMounted(() => {
    detectIOS();
    checkInstalled();

    // Re-check after load (important for Chrome)
    setTimeout(checkInstalled, 1000);
});
</script>
