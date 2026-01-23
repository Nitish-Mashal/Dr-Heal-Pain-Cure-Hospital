<template>
    <div class="container-fluid mb-5">

        <!-- ================= BANNER ================= -->
        <div v-if="service" class="relative w-full mb-5 overflow-hidden rounded-4">

            <!-- Background Image -->
            <img :src="serviceImage" :alt="service.name1" class="
      w-full 
      h-48          /* mobile height */
      sm:h-56       /* small screens */
      md:h-80       /* desktop height */
      object-contain md:object-cover  /* contain on mobile, cover on desktop */
    " />

            <!-- Overlay -->
            <div class="absolute inset-0 bg-[#38113B] opacity-70"></div>

            <!-- Title -->
            <div class="absolute inset-0 flex items-center justify-center z-10 px-6">
                <h1 class="text-white font-semibold text-center">
                    {{ service.name1 }}
                </h1>
            </div>

        </div>

        <!-- ================= CONTENT ================= -->
        <div v-if="service" class="container">
            <div class="row">
                <div class="col-12">

                    <!-- HTML CONTENT FROM API -->
                    <div class="text-gray-700 leading-relaxed" v-html="service.description"></div>

                </div>
            </div>
        </div>

        <!-- ================= LOADING ================= -->
        <div v-else class="text-center py-20 text-gray-500">
            Loading service details...
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const service = ref(null)

/* ---------------- FETCH SERVICE ---------------- */
const fetchService = async () => {
    try {
        const res = await fetch(
            "/api/method/drheal_frontend.api.our_services.get_our_services"
        )
        const data = await res.json()

        if (data.message?.status === "success") {
            service.value = data.message.data.find(
                item => item.url === route.params.slug
            )
        }
    } catch (error) {
        console.error("Failed to fetch service details", error)
    }
}

/* ---------------- IMAGE ---------------- */
const serviceImage = computed(() => {
    if (!service.value?.thumnail_image) return ""
    return service.value.thumnail_image.startsWith("http")
        ? service.value.thumnail_image
        : `https://drheal.quantumberg.com${service.value.thumnail_image}`
})

/* ---------------- SEO ---------------- */
const updateMeta = (key, content, attr = "name") => {
    if (!content) return
    let meta = document.querySelector(`meta[${attr}='${key}']`)
    if (!meta) {
        meta = document.createElement("meta")
        meta.setAttribute(attr, key)
        document.head.appendChild(meta)
    }
    meta.setAttribute("content", content)
}

const updatePageSEO = (data) => {
    document.title =
        data.meta_title ||
        data.name1 ||
        "Dr Heal Pain Cure Hospital"

    updateMeta("description", data.meta_description)
    updateMeta("keywords", data.meta_keyword)

    updateMeta("og:title", data.meta_title || data.name1, "property")
    updateMeta("og:description", data.meta_description, "property")
    updateMeta("og:image", serviceImage.value, "property")
    updateMeta("og:type", "website", "property")
}

/* ---------------- WATCHERS ---------------- */
watch(service, (val) => {
    if (val) updatePageSEO(val)
})

// 🔥 THIS FIXES YOUR ISSUE
watch(
    () => route.params.slug,
    () => {
        service.value = null
        fetchService()
    }
)

/* ---------------- INIT ---------------- */
onMounted(fetchService)
</script>
