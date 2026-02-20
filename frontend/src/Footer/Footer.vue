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
                    <!-- Install Buttons -->
                    <div class="flex flex-col gap-3 items-start">

                        <!-- INSIDE PWA → SHOW NOTHING -->
                        <template v-if="isStandalone">
                        </template>

                        <!-- BROWSER + INSTALLED -->
                        <button v-else-if="isInstalled" class="inline-flex items-center gap-3 px-4 py-2 w-[160px]
               bg-color-blue text-white rounded-xl shadow-md" @click="openApp">
                            <i class="bi bi-box-arrow-up-right text-xl"></i>
                            <div class="text-left">
                                <div class="text-xs opacity-80">Launch</div>
                                <div class="font-semibold">Open App</div>
                            </div>
                        </button>

                        <!-- BROWSER + NOT INSTALLED -->
                        <template v-else>

                            <!-- Android -->
                            <button class="inline-flex items-center gap-3 px-4 py-2 w-[160px]
                   bg-color-blue text-white rounded-xl shadow-md" @click="installApp">
                                <i class="bi bi-android2 text-xl"></i>
                                <div class="text-left">
                                    <div class="text-xs opacity-80">Get it on</div>
                                    <div class="font-semibold">Android</div>
                                </div>
                            </button>

                            <!-- iOS -->
                            <button class="inline-flex items-center gap-3 px-4 py-2 w-[160px]
                   bg-color-orange text-white rounded-xl shadow-md" @click="installApp">
                                <i class="bi bi-apple text-xl"></i>
                                <div class="text-left">
                                    <div class="text-xs opacity-80">Download on</div>
                                    <div class="font-semibold">iOS</div>
                                </div>
                            </button>

                        </template>

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
                        <!-- Phone -->
                        <div class="flex items-center gap-3">
                            <svg class="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                role="img" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                            </svg>
                            <a href="tel:07969288000" class="underline text-gray-700">07969288000</a>
                        </div>

                        <!-- Email -->
                        <div class="flex items-center gap-3">
                            <svg class="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                role="img" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg>
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

const isStandalone = ref(false); // Running inside PWA
const isInstalled = ref(false);  // Installed on device
const canInstall = ref(false);
const isIOS = ref(false);

// Detect iOS
const detectIOS = () => {
    isIOS.value = /iphone|ipad|ipod/i.test(navigator.userAgent);
};

// Detect if running inside PWA
const detectStandalone = () => {
    isStandalone.value =
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true;
};

// Install App
const installApp = async () => {

    // iOS Instructions
    if (isIOS.value) {
        alert(
            "To install this app on iPhone:\n\n" +
            "1. Tap Share\n" +
            "2. Tap Add to Home Screen\n" +
            "3. Tap Add"
        );
        return;
    }

    // Android install prompt
    if (!deferredPrompt.value) return;

    deferredPrompt.value.prompt();

    const result = await deferredPrompt.value.userChoice;

    if (result.outcome === "accepted") {
        isInstalled.value = true;
    }

    deferredPrompt.value = null;
    canInstall.value = false;
};

// Open Installed PWA
const openApp = () => {

    // Attempt to open installed PWA
    window.location.assign(window.location.origin);

    // Try to focus installed app
    setTimeout(() => {
        window.open("", "_self");
    }, 200);
};

onMounted(() => {

    detectIOS();
    detectStandalone();

    // Listen install prompt
    window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        deferredPrompt.value = e;
        canInstall.value = true;
    });

    // Installed event
    window.addEventListener("appinstalled", () => {
        isInstalled.value = true;
        canInstall.value = false;
    });

    // Detect already installed (Browser only)
    setTimeout(() => {
        if (!isStandalone.value && !canInstall.value) {
            isInstalled.value = true;
        }
    }, 1500);

});


const year = new Date().getFullYear()

const tagline = "Healing Pain Without Surgery. Restoring Life With Purpose."

const socialIcons = [
    { icon: "bi-facebook", url: "https://www.facebook.com/drhealbangalore", label: "Facebook" },
    { icon: "bi-youtube", url: "https://www.youtube.com/@drhealpaincurehospital", label: "YouTube" },
    { icon: "bi-instagram", url: "https://www.instagram.com/drhealpaincurehospital", label: "Instagram" },
    { icon: "bi-linkedin", url: "https://www.linkedin.com/company/drhealpaincurehospital/", label: "LinkedIn" },
    { icon: "bi-twitter-x", url: "https://x.com/drhealpaincure", label: "Twitter X" },
]

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
        path: {
            path: "/appointment",
            query: { department: "Orthopaedics" }
        }
    },
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
];
</script>
