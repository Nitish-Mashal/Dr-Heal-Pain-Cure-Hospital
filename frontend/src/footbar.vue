```vue
<template>
    <div class="fixed bottom-0 left-0 w-full bg-sky-50 border-t shadow-md z-50 md:hidden">
        <div class="grid grid-cols-4 text-center py-2">

            <!-- Install App -->
            <button @click="handleAppButton"
                class="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600">
                <i class="bi bi-google-play text-xl"></i>
                <span class="text-xs mt-1">Install App</span>
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
            <a href="https://wa.me/917019017309"
                target="_blank"
                rel="noopener noreferrer"
                class="flex flex-col items-center justify-center text-gray-800 hover:text-green-600">
                <i class="bi bi-whatsapp text-xl"></i>
                <span class="text-xs mt-1">WhatsApp</span>
            </a>

        </div>
    </div>
</template>

<script setup>
const PLAY_STORE_URL =
    "https://play.google.com/store/apps/details?id=com.drheal.paincurehospital";

const handleAppButton = () => {
    window.open(PLAY_STORE_URL, "_blank");
};
</script>