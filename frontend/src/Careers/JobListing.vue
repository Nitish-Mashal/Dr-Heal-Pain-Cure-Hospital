<template>
    <div>
        <div class="container pt-4 bold-test-color text-gray-800">

            <!-- We're Hiring -->
            <div
                class="border-1 border-gray-800 px-5 py-1 rounded-full inline-flex items-center justify-center whitespace-nowrap">
                We're Hiring!
            </div>

            <!-- Intro -->
            <div class="font-semibold pt-3 pb-4 text-gray-800">
                <div class="text-7xl">Be a part of our Team</div>
                <div class="text-xl font-normal pt-2">
                    We're looking for passionate people to join us on our mission. We value flat hierarchies, <br>
                    clear communication, and full ownership and responsibility.
                </div>
            </div>

            <!-- Resume Upload -->
            <div class=" shadow py-4 rounded-4 bg-color-blue">
                <div class="flex flex-col justify-center items-center">
                    <router-link to="/apply-job" class="text-gray-800">
                        <div
                            class="cursor-pointer border-1 border-gray-50 text-gray-50 px-5 py-1 rounded-full transition inline-flex items-center whitespace-nowrap">
                            Apply For a Job
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="h-4 w-4 ml-2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </div>
                    </router-link>

                    <input id="resume-upload" type="file" class="hidden" @change="handleResumeUpload" />

                    <div v-if="uploading" class="text-sm text-gray-600 mt-2">Uploading file...</div>
                    <div v-if="uploadedFileName && !uploading" class="text-sm text-green-700 mt-2">
                        {{ uploadedFileName }}
                    </div>
                </div>

                <div class="text-xl font-normal text-center pt-4 text-gray-50">
                    Interested candidates can contact or share resumes to
                    <span class="font-semibold">info@drheal.in</span>
                </div>
            </div>

            <!-- Job Listings -->
            <div v-for="(job, index) in jobs" :key="index">
                <hr class="mt-4" />

                <div class="flex justify-between items-center text-gray-800">
                    <h3 class="font-semibold text-2xl">{{ job.title }}</h3>

                    <router-link :to="{
                        name: 'JobApply',
                        query: { title: job.title }
                    }" class="no-underline text-inherit">
                        <button
                            class="flex items-center gap-1 hover:underline text-inherit bg-color-blue px-3 py-1 rounded-5 text-white">
                            Apply
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="h-5 w-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                        </button>
                    </router-link>


                </div>

                <div class="pt-2">
                    {{ truncate(job.description, 100) }}
                </div>

                <!-- Job Type — hide if empty -->
                <div v-if="job.type"
                    class="bg-color-orange text-white text-sm px-3 py-1 rounded-full inline-flex items-center whitespace-nowrap mt-3 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-4 h-4 mr-2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    {{ job.type }}
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const jobs = ref([]);
const loading = ref(false);

const fetchJobs = async () => {
    loading.value = true;
    try {
        const res = await fetch("/api/method/drheal_frontend.api.jobapp.get_job_openings");
        const json = await res.json();

        const apiJobs = json?.message?.data ?? [];

        jobs.value = apiJobs.map(j => ({
            title: j.job_title,
            description: j.description,
            type: j.job_type || null
        }));

    } catch (error) {
        console.error("Error fetching jobs:", error);
    } finally {
        loading.value = false;
    }
};

const truncate = (text, limit = 100) => {
    if (!text) return "";
    return text.length > limit ? text.substring(0, limit) + "..." : text;
};

onMounted(() => {
    fetchJobs();
});
</script>
