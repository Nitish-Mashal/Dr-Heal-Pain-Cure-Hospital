<template>
    <div class="py-10 px-5 md:px-5">

        <!-- Loading State -->
        <div v-if="isLoading" class="text-center py-20 text-gray-500 text-lg">
            Loading blog details...
        </div>

        <!-- Blog Details -->
        <div v-else-if="blog" class="max-w-6xl mx-auto mb-12">

            <!-- MOBILE FULL WIDTH IMAGE -->
            <div class="relative -mx-5 md:mx-0">
                <img v-if="blog.header_image" :src="blog.header_image" :alt="getBlogAlt(blog)" class="
            w-full
            h-56
            sm:h-64
            md:h-96
            object-contain
            md:object-cover
            rounded-none
            md:rounded-lg
            mb-6
          " loading="lazy" />
            </div>

            <!-- Description Headings & Content -->
            <div v-for="(heading, index) in descriptionHeadings" :key="index">
                <h2 v-if="heading" class="text-2xl font-bold text-gray-800 mb-3">
                    {{ heading }}
                </h2>
                <p v-if="descriptions[index]" class="text-gray-700 text-lg leading-relaxed"
                    v-html="descriptions[index]" />
            </div>

            <!-- Custom HTML -->
            <div v-if="blog.custom_html" v-html="blog.custom_html"></div>

        </div>

        <!-- Fallback -->
        <div v-else class="text-center text-gray-500 py-20">
            Blog not found.
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

/* ---------------- ROUTE ---------------- */
const route = useRoute()

/* ---------------- STATE ---------------- */
const blog = ref(null)
const isLoading = ref(true)
const descriptionHeadings = ref([])
const descriptions = ref([])

/* ---------------- FETCH BLOG ---------------- */
const fetchBlogDetails = async () => {
    const blogSlug = route.params.slug

    if (!blogSlug) {
        isLoading.value = false
        return
    }

    try {
        const response = await fetch('/api/method/drheal_frontend.api.blogs.get_blogs')
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

        const res = await response.json()
        const allBlogs = res.message || []

        blog.value = allBlogs.find(b => b.url === blogSlug) || null

        if (blog.value) {
            updatePageSEO(blog.value)

            descriptionHeadings.value = []
            descriptions.value = []

            for (let i = 1; i <= 4; i++) {
                const heading = blog.value[`description_heading_${i}`]
                const desc = blog.value[`description_${i}`]

                if (heading || desc) {
                    descriptionHeadings.value.push(heading || '')
                    descriptions.value.push(desc || '')
                }
            }
        }
    } catch (err) {
        console.error('Error fetching blog details:', err)
        blog.value = null
    } finally {
        isLoading.value = false
    }
}

/* ---------------- ALT TEXT ---------------- */
const getBlogAlt = (blog) => {
    if (!blog) return 'Dr Heal Pain Cure Hospital'

    const title =
        blog.meta_title ||
        blog.title ||
        blog.description_heading_1

    return title
        ? `Dr Heal Pain Cure Hospital - ${title}`
        : 'Dr Heal Pain Cure Hospital'
}

/* ---------------- SEO ---------------- */
const updateMeta = (key, content, attr = 'name') => {
    if (!content) return

    let meta = document.querySelector(`meta[${attr}='${key}']`)
    if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(attr, key)
        document.head.appendChild(meta)
    }
    meta.setAttribute('content', content)
}

const updatePageSEO = (data) => {
    const title =
        data.meta_title ||
        data.title ||
        `${data.package_name || 'Health Checkup'} | Triguna Healthcare`

    document.title = title

    updateMeta('description', data.meta_description || data.short_description)
    updateMeta('keywords', data.meta_keyword)
    updateMeta('header_tag', data.header_tag)
}

/* ---------------- INIT ---------------- */
onMounted(fetchBlogDetails)
</script>
