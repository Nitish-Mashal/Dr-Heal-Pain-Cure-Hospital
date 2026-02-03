<template>
    <div class="container py-5">
        <div class="row g-4">

            <!-- LEFT: Job Details -->
            <div class="col-md-6">
                <div v-if="job" class="p-4">

                    <!-- Job Title -->
                    <h3 class="text-color-blue fw-bold mb-4">
                        {{ job.job_title }}
                    </h3>

                    <!-- Job Details -->
                    <div class="space-y-3 text-gray-800">

                        <!-- Qualification -->
                        <div class="d-flex align-items-start gap-3">
                            <span class="mt-1 w-3 h-3 bg-color-orange rounded-sm"></span>
                            <div>
                                <div class="fw-semibold">Qualification</div>
                                <div>{{ job.qualification }}</div>
                            </div>
                        </div>

                        <!-- Experience -->
                        <div class="d-flex align-items-start gap-3">
                            <span class="mt-1 w-3 h-3 bg-color-orange rounded-sm"></span>
                            <div>
                                <div class="fw-semibold">Experience</div>
                                <div>{{ job.experience }}</div>
                            </div>
                        </div>

                        <!-- Department -->
                        <div class="d-flex align-items-start gap-3">
                            <span class="mt-1 w-3 h-3 bg-color-orange rounded-sm"></span>
                            <div>
                                <div class="fw-semibold">Department</div>
                                <div>{{ job.department }}</div>
                            </div>
                        </div>

                        <!-- Schedule -->
                        <div class="d-flex align-items-start gap-3">
                            <span class="mt-1 w-3 h-3 bg-color-orange rounded-sm"></span>
                            <div>
                                <div class="fw-semibold">Schedule</div>
                                <div>{{ job.schedule || 'N/A' }}</div>
                            </div>
                        </div>

                        <!-- Shift -->
                        <div class="d-flex align-items-start gap-3">
                            <span class="mt-1 w-3 h-3 bg-color-orange rounded-sm"></span>
                            <div>
                                <div class="fw-semibold">Shift</div>
                                <div>{{ job.shift || 'N/A' }}</div>
                            </div>
                        </div>

                        <!-- Description -->
                        <div class="mt-4 whitespace-pre-line">
                            <div class="fw-semibold mb-2">Description</div>
                            <div>{{ job.description }}</div>
                        </div>

                    </div>
                </div>

                <!-- Fallback -->
                <p v-if="!job && !loading" class="text-muted">
                    Job details not available
                </p>
            </div>


            <!-- RIGHT: Form -->
            <div class="col-md-6">
                <div class="bg-white shadow-lg rounded-lg p-4">

                    <input class="form-control mb-3" placeholder="Full Name*" v-model="form.full_name" />

                    <input class="form-control mb-3" placeholder="Contact No*" maxlength="10" v-model="form.contact"
                        @input="validatePhone" />

                    <input class="form-control mb-3" placeholder="Email ID*" v-model="form.email" />

                    <select class="form-control mb-3" v-model="form.city">
                        <option value="" disabled>Current City*</option>
                        <option v-for="city in cities" :key="city">
                            {{ city }}
                        </option>
                    </select>

                    <input class="form-control mb-3" placeholder="Qualification*" v-model="form.qualification" />

                    <input class="form-control mb-3" placeholder="Experience*" v-model="form.experience" />

                    <div class="mb-3">
                        <label class="d-block mb-1">Upload Resume</label>
                        <input type="file" class="form-control" @change="handleResumeUpload" />
                    </div>

                    <button class="w-100 bg-color-blue text-white py-2 rounded" :disabled="isLoading"
                        @click="submitForm">
                        Submit
                    </button>

                    <p v-if="successMsg" class="text-success mt-3 text-center">
                        {{ successMsg }}
                    </p>

                </div>
            </div>

        </div>

        <!-- Loader -->
        <div v-if="loading" class="position-fixed top-0 start-0 w-100 h-100
      d-flex align-items-center justify-content-center" style="background:rgba(0,0,0,0.4); z-index:9999">
            <div class="bg-white px-4 py-3 rounded">
                Loading...
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const jobTitle = route.query.title || ''

const job = ref(null)
const loading = ref(false)
const successMsg = ref('')

const cities = ['Mumbai', 'Pune', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Other']

const form = ref({
    full_name: '',
    contact: '',
    email: '',
    city: '',
    qualification: '',
    experience: ''
})

const resumeFile = ref(null)

const fetchJobDetails = async () => {
    loading.value = true
    const res = await fetch(
        '/api/method/drheal_frontend.api.jobapp.get_job_hirings'
    ).then(r => r.json())

    if (res.message?.status === 'success') {
        job.value = res.message.data.find(
            j => j.job_title === jobTitle
        )
    }
    loading.value = false
}

const validatePhone = (e) => {
    form.value.contact = e.target.value.replace(/\D/g, '').slice(0, 10)
}

const handleResumeUpload = (e) => {
    resumeFile.value = e.target.files[0]
}

const submitForm = async () => {
    if (!resumeFile.value) return

    const fd = new FormData()
    fd.append('cmd', 'drheal_frontend.api.jobapp.submit_job_application')
    fd.append('first_name', form.value.full_name)
    fd.append('contact_number', form.value.contact)
    fd.append('email', form.value.email)
    fd.append('city', form.value.city)
    fd.append('qualification', form.value.qualification)
    fd.append('experience', form.value.experience)
    fd.append('job_opening', jobTitle)

    // ✅ USE TYPO FIELD
    fd.append('description', job.value?.description || '')

    fd.append('resume', resumeFile.value)

    const res = await fetch(
        '/api/method/drheal_frontend.api.jobapp.submit_job_application',
        { method: 'POST', body: fd }
    ).then(r => r.json())

    if (res.message?.status === 'success') {
        successMsg.value = res.message.message
    }

    if (res.message?.status === 'success') {
        successMsg.value = res.message.message

        // 👇 Hide message after 3 seconds
        setTimeout(() => {
            successMsg.value = ''
        }, 3000)
    }
}

onMounted(fetchJobDetails)
</script>
