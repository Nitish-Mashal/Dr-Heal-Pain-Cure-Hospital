<template>
    <div class="container">
        <!-- HEADER -->
        <div class="text-center">
            <h6 class="text-color-orange uppercase tracking-widest mb-3">Our Blogs</h6>
            <h1 class="font-semibold text-color-blue">
                Explore real moments, success stories, <br /> and insights
            </h1>
        </div>

        <div class="row">
            <div class="col-md-2"></div>
            <!-- BLOGS -->
            <div class="col-md-8 flex flex-col gap-6 py-5">
                <div v-for="(blog, index) in blogs" :key="index"
                    class="flex flex-col md:flex-row overflow-hidden shadow-md hover:shadow-lg transition">
                    <!-- Image -->
                    <div class="md:w-1/2 h-64 md:h-auto">
                        <img :src="blog.image" :alt="blog.title" class="w-full h-full object-cover" />
                    </div>

                    <!-- Text content -->
                    <div class="md:w-1/2 bg-color-orange p-6 flex flex-col justify-center text-white rounded-r-md">
                        <h4 class="text-color-blue font-semibold mb-3 mt-4">
                            {{ blog.title }}
                        </h4>
                        <div class="text-white mb-4 text-xl">
                            {{ blog.excerpt }}
                        </div>
                        <a :href="blog.link"
                            class="inline-block bg-color-blue text-white py-2 px-4 rounded hover:bg-blue-800 transition w-max no-underline flex justify-center mb-2">
                            Read More
                        </a>
                    </div>
                </div>
            </div>
            <div class="col-md-2"></div>
        </div>
    </div>
</template>

<script setup>
const blogs = [
    {
        title: "Importance Of Diet In Management Of Rheumatoid Arthritis",
        excerpt:
            "Importance Of Diet In Management Of Rheumatoid Arthritis Home Importance Of Diet In Management Of Rheumatoid Arthritis Diet plays a significant...",
        image: "/files/OurBlogsHome.jpg",
        link: "#",
    },
];
</script>
