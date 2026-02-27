<template>
    <div class="fixed bottom-0 left-0 w-full bg-sky-50 border-t shadow-md z-50 md:hidden">
        <div class="grid grid-cols-4 text-center py-2">

            <!-- Install / Open App -->
            <button @click="handleAppButton"
                class="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600">

                <i v-if="!isInstalled" class="bi bi-download text-xl"></i>
                <i v-else class="bi bi-box-arrow-up-right text-xl"></i>

                <span class="text-xs mt-1">
                    {{ isInstalled ? 'Open in App' : 'Install' }}
                </span>
            </button>

            <!-- Call -->
            <a href="tel:07969288000"
                class="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600">
                <i class="bi bi-telephone text-xl"></i>
                <span class="text-xs mt-1">Call</span>
            </a>

            <!-- Contact -->
            <router-link to="/contact-us"
                class="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600">
                <i class="bi bi-person text-xl"></i>
                <span class="text-xs mt-1">Contact</span>
            </router-link>

            <!-- WhatsApp -->
            <a href="https://wa.me/918123619994" target="_blank"
                class="flex flex-col items-center justify-center text-gray-800 hover:text-green-600">
                <i class="bi bi-whatsapp text-xl"></i>
                <span class="text-xs mt-1">WhatsApp</span>
            </a>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const deferredPrompt = ref(null);
const isInstalled = ref(false);
const isStandalone = ref(false);

// Detect if running as PWA
const detectStandalone = () => {
    isStandalone.value =
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true;

    if (isStandalone.value) {
        isInstalled.value = true;
    }
};

onMounted(() => {

    detectStandalone();

    // Install available
    window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        deferredPrompt.value = e;
        isInstalled.value = false;
        console.log("Install available");
    });

    // App installed
    window.addEventListener("appinstalled", () => {
        isInstalled.value = true;
        deferredPrompt.value = null;
        console.log("App installed");
    });

    // Detect if already installed
    setTimeout(() => {
        if (!deferredPrompt.value) {
            isInstalled.value = true;
        }
    }, 1500);
});

// Button click handler
const handleAppButton = async () => {

    // Already running as PWA
    if (window.matchMedia("(display-mode: standalone)").matches) {
        return;
    }

    // Install available
    if (deferredPrompt.value) {
        deferredPrompt.value.prompt();
        const result = await deferredPrompt.value.userChoice;
        deferredPrompt.value = null;
        return;
    }

    // Already installed but in browser
    alert("Please open it from your device's app list.");
};

</script>
