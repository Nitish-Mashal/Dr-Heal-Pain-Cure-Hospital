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
                <img v-if="blog.header_image" :src="blog.header_image" :alt="blog.header_image" class="
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
                    v-html="descriptions[index]"></p>
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


<script>
import { useRoute } from 'vue-router'

export default {
    name: "BlogDetails",
    data() {
        return {
            blog: null,
            isLoading: true,
            descriptionHeadings: [],
            descriptions: []
        }
    },
    setup() {
        const route = useRoute()
        return { route }
    },
    mounted() {
        this.fetchBlogDetails()
    },
    methods: {

        async fetchBlogDetails() {
            const blogSlug = this.route.params.slug
            if (!blogSlug) {
                this.isLoading = false
                return
            }

            try {
                const response = await fetch('/api/method/drheal_frontend.api.blogs.get_blogs')
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

                const res = await response.json()
                const allBlogs = res.message || []

                // Find blog by slug/url
                this.blog = allBlogs.find(b => b.url === blogSlug) || null

                if (this.blog) {
                    // Update SEO meta
                    this.updatePageSEO(this.blog)

                    // Prepare description headings & contents
                    this.descriptionHeadings = []
                    this.descriptions = []

                    for (let i = 1; i <= 4; i++) {
                        const heading = this.blog[`description_heading_${i}`]
                        const desc = this.blog[`description_${i}`]
                        if (heading || desc) {
                            this.descriptionHeadings.push(heading || '')
                            this.descriptions.push(desc || '')
                        }
                    }
                }
            } catch (err) {
                console.error('Error fetching blog details:', err)
                this.blog = null
            } finally {
                this.isLoading = false
            }
        },

        // ---------------- SEO FUNCTIONS ----------------
        updatePageSEO(data) {
            const title =
                data.meta_title ||
                data.title ||
                `${data.package_name || "Health Checkup"} | Triguna Healthcare`;

            document.title = title;

            this.updateMeta("description", data.meta_description || data.short_description);
            this.updateMeta("keywords", data.meta_keyword);
            this.updateMeta("header_tag", data.header_tag);
        },

        updateMeta(key, content, attr = "name") {
            if (!content) return;
            let meta = document.querySelector(`meta[${attr}='${key}']`);
            if (!meta) {
                meta = document.createElement("meta");
                meta.setAttribute(attr, key);
                document.head.appendChild(meta);
            }
            meta.setAttribute("content", content);
        }
    }
}
</script>
