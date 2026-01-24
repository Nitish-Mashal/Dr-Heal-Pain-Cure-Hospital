<template>
    <div class="w-full py-12 px-4">

        <div class="pb-5">
            <h2 class="text-center text-color-blue">Gallery</h2>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center py-12">
            <div class="w-10 h-10 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
            <span class="ml-3 text-gray-800 font-medium">
                Loading images...
            </span>
        </div>

        <!-- Gallery -->
        <div v-else class="container">
            <div class="row">
                <div class="col-md-4 mb-2" v-for="(col, index) in imageColumns" :key="index">
                    <img v-for="(img, i) in col" :key="i" :src="img" alt="Dr Heal Gallery Image"
                        class="img-fluid mb-2 rounded-lg shadow-sm" loading="lazy" />
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

/* ---------------- State ---------------- */
const images = ref([]);
const loading = ref(true);

/* ---------------- Computed ---------------- */
// 3 columns × 2 images each (max 6 images)
const imageColumns = computed(() => {
    const cols = [[], [], []];
    for (let i = 0; i < Math.min(images.value.length, 6); i++) {
        cols[Math.floor(i / 2)].push(images.value[i]);
    }
    return cols;
});

/* ---------------- Methods ---------------- */
const fetchGalleryImages = async () => {
    try {
        const startTime = Date.now();

        const res = await fetch(
            "/api/method/drheal_frontend.api.gallery.get_gallery_images"
        );
        const data = await res.json();

        // Convert object to array & remove empty values
        images.value = Object.values(data.message || {}).filter(Boolean);

        // Smooth loader (minimum 1s)
        const elapsed = Date.now() - startTime;
        setTimeout(() => {
            loading.value = false;
        }, Math.max(1000 - elapsed, 0));

    } catch (error) {
        console.error("Failed to load gallery images:", error);
        loading.value = false;
    }
};

/* ---------------- Lifecycle ---------------- */
onMounted(() => {
    fetchGalleryImages();
});
</script>
