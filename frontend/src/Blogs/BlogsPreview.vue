<template>
    <div class="container p-10 min-h-screen">

        <!-- Grid layout: 3 cards per row -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="(card, index) in cards" :key="index"
                class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-transform hover:scale-105 flex flex-col">

                <!-- 🔸 Top Orange Section -->
                <div class="bg-color-blue p-3 flex justify-between items-center h-48">
                    <!-- Left: Logo + Text -->
                    <div class="text-white w-1/2">
                        <h2 class="text-lg font-bold leading-snug">
                            {{ card.description_heading_1 || 'Untitled' }}
                        </h2>
                        <h3 class="text-yellow-100 text-sm font-medium">
                            {{ card.sub_description_heading_1 || '' }}
                        </h3>
                    </div>

                    <!-- Right: Image -->
                    <div class="w-1/2 flex justify-center">
                        <img :src="card.thumbnail_image" alt="Card Image"
                            class="w-32 h-32 object-cover rounded-full border-4 border-orange-300" />
                    </div>
                </div>

                <!-- 🔹 Bottom White Content -->
                <div class="p-3 flex-1">
                    <h3 class="text-lg font-semibold bold-test-color mb-2">
                        {{ card.description_heading_1 }}
                    </h3>
                    <p class="text-gray-600 text-sm mb-2 line-clamp-3">
                        {{ stripHtml(card.description_1) }}
                    </p>

                    <!-- Only render router-link if URL exists -->
                    <router-link v-if="card.url" :to="{ name: 'BlogDetails', params: { slug: card.url } }"
                        class="bold-test-color font-semibold text-sm hover:underline">
                        Read More >>
                    </router-link>
                </div>

                <!-- 🔸 Footer with line -->
                <div class="border-t border-[#2077BF] px-3 p-2 h-9">
                    <div class="text-gray-500 text-xs">
                        {{ formatDate(card.blog_date) }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const cards = ref([]);

// ✅ Utility to remove all HTML tags from text
const stripHtml = (html) => {
    if (!html) return "";
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
};

// ✅ Format date
const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

// ✅ Generate slug from name (fallback if URL is missing)
const generateSlug = (text) =>
    text?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

// ✅ Fetch blogs using fetch()
onMounted(async () => {
    try {
        const res = await fetch("/api/method/drheal_frontend.api.blogs.get_blogs");
        const data = await res.json();

        // Add fallback slug if url is missing
        cards.value = (data.message || []).map(card => ({
            ...card,
            url: card.url || generateSlug(card.name)
        }));

        console.log("Cards fetched:", cards.value);
    } catch (error) {
        console.error("❌ Error fetching blogs:", error);
    }
});
</script>
