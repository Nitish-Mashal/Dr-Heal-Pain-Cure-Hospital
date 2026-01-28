<template>
    <div class="w-full px-4">

        <!-- Heading / Banner -->
        <div class="relative w-full mb-5 overflow-hidden rounded-4">
            <img src="https://drheal.quantumberg.com/files/dr-heal-about-us.webp" alt="Dr Heal About Us Image" class="
                    w-full
                    h-48
                    sm:h-56
                    md:h-80
                    object-contain md:object-cover
                    rounded-4
                " />

            <div class="absolute inset-0 flex items-center justify-center px-4 sm:px-[250px]">
                <div class="text-white text-center">
                    <h1 class="font-semibold">Gallery</h1>
                </div>
            </div>
        </div>

        <!-- TAG BUTTONS -->
        <div v-if="tags.length" class="flex justify-center flex-wrap gap-2 mb-6">
            <button v-for="tag in tags" :key="tag" @click="activeTag = tag"
                class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200" :class="activeTag === tag
                    ? 'bg-color-blue text-white shadow-md'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'">
                {{ tag }}
            </button>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center py-12">
            <div class="w-10 h-10 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
            <span class="ml-3 text-gray-800 font-medium">
                Loading images...
            </span>
        </div>

        <!-- Empty State -->
        <div v-else-if="!images.length" class="text-center text-gray-500 py-12">
            No images available for this category
        </div>

        <!-- GALLERY (ROW-WISE) -->
        <div v-else class="container">
            <div class="row">
                <div v-for="(img, index) in images" :key="index" class="col-12 col-sm-6 col-md-4 mb-3">
                    <img :src="img" alt="Dr Heal Gallery Image" class="img-fluid w-100 rounded-lg shadow-sm"
                        loading="lazy" />
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

/* ---------------- STATE ---------------- */
const loading = ref(true);
const tags = ref([]);
const imagesByTag = ref({});
const activeTag = ref("");

/* ---------------- COMPUTED ---------------- */
const images = computed(() => {
    return imagesByTag.value[activeTag.value] || [];
});

/* ---------------- METHODS ---------------- */
const fetchGalleryImages = async () => {
    try {
        const startTime = Date.now();

        const res = await fetch(
            "/api/method/drheal_frontend.api.gallery.get_gallery_images"
        );
        const data = await res.json();

        const message = data.message || {};

        tags.value = message.tags || [];
        imagesByTag.value = message.images_by_tag || {};

        // Default tag
        activeTag.value = tags.value[0] || "";

        // Smooth loader
        const elapsed = Date.now() - startTime;
        setTimeout(() => {
            loading.value = false;
        }, Math.max(800 - elapsed, 0));

    } catch (error) {
        console.error("Failed to load gallery images:", error);
        loading.value = false;
    }
};

/* ---------------- LIFECYCLE ---------------- */
onMounted(fetchGalleryImages);
</script>

<style scoped>
img {
    transition: transform 0.25s ease, box-shadow 0.25s ease;
}

img:hover {
    transform: scale(1.02);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
}
</style>
