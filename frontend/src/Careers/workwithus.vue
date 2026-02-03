<template>
    <div>
        <h2 class="text-center text-gray-800 py-4">
            Latest Roles
        </h2>

        <div class="container">
            <div class="row g-4">

                <div class="col-md-4" v-for="job in jobs" :key="job.name">
                    <div class="
                        bg-white
                        rounded-lg
                        shadow-lg
                        p-6
                        pb-10
                        min-h-[240px]
                        relative
                        overflow-hidden
                        flex
                        flex-col
                    ">
                        <!-- Title -->
                        <h5 class="
                            text-color-blue
                            font-medium
                            mb-4
                            job-title
                        ">
                            {{ job.job_title }}
                        </h5>

                        <div class="flex-grow"></div>

                        <!-- Button -->
                        <button @click="goToJob(job)" class="
    px-4 py-2 border-2 border-[#30809D]
    text-color-blue text-sm rounded
    hover:bg-color-blue hover:text-white
    transition self-start
  ">
                            Know More
                        </button>

                        <!-- Bottom Strip -->
                        <div class="
                            absolute
                            bottom-0
                            left-0
                            w-full
                            h-[4px]
                            bg-color-orange
                        "></div>
                    </div>
                </div>

            </div>

            <!-- Empty State -->
            <p v-if="!jobs.length && !loading" class="text-center text-muted mt-4">
                No job openings available
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const jobs = ref([])
const loading = ref(false)

const fetchJobs = async () => {
    loading.value = true

    try {
        const res = await fetch(
            '/api/method/drheal_frontend.api.jobapp.get_job_hirings'
        ).then(r => r.json())

        if (res.message?.status === 'success') {
            jobs.value = res.message.data
        }
    } catch (err) {
        console.error('Failed to fetch jobs', err)
    }

    loading.value = false
}

const goToJob = (job) => {
    router.push({
        path: '/submit-job',
        query: { title: job.job_title }
    })
}

onMounted(fetchJobs)
</script>
