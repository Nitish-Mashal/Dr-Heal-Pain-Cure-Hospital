<template>
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-md-6 col-lg-5">

                <!-- FORM -->
                <div class="space-y-4">

                    <!-- Full Name -->
                    <input type="text" class="form-control mb-3" placeholder="Full Name*" v-model="form.full_name" />

                    <!-- Contact -->
                    <input type="text" class="form-control mb-3" placeholder="Contact No*" maxlength="10"
                        v-model="form.contact" @input="validatePhone" />

                    <!-- Email -->
                    <input type="email" class="form-control mb-3" placeholder="Email ID*" v-model="form.email" />

                    <!-- City -->
                    <select class="form-control mb-3" v-model="form.city">
                        <option value="" disabled>Current City*</option>
                        <option v-for="city in cities" :key="city" :value="city">
                            {{ city }}
                        </option>
                    </select>

                    <!-- Qualification -->
                    <input type="text" class="form-control mb-3" placeholder="Qualification*"
                        v-model="form.qualification" />

                    <!-- Experience -->
                    <input type="text" class="form-control mb-4" placeholder="Experience*" v-model="form.experience" />

                    <!-- Resume -->
                    <div class="mb-4">
                        <label class="mb-1 d-block">Upload Resume</label>
                        <input type="file" class="form-control" @change="handleResumeUpload" />
                    </div>

                    <!-- Submit -->
                    <button class="rounded-3 w-100 text-white py-2 bg-color-blue" :disabled="isLoading"
                        @click="submitForm">
                        Submit
                    </button>

                    <!-- Success -->
                    <p v-if="successMsg" class="text-success mt-3 text-center">
                        {{ successMsg }}
                    </p>

                </div>

            </div>
        </div>

        <!-- Loader -->
        <div v-if="isLoading" class="position-fixed top-0 start-0 w-100 h-100 d-flex
                   align-items-center justify-content-center" style="background:rgba(0,0,0,0.4); z-index:9999">
            <div class="bg-white px-4 py-3 rounded fw-semibold">
                Submitting...
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const jobName = ref(route.query.title || '')

const isLoading = ref(false)
const successMsg = ref('')

const cities = [
    'Mumbai', 'Pune', 'Delhi', 'Bangalore',
    'Hyderabad', 'Chennai', 'Kolkata', 'Other'
]

const form = ref({
    full_name: '',
    contact: '',
    email: '',
    city: '',
    qualification: '',
    experience: ''
})

const resumeFile = ref(null)

const handleResumeUpload = (e) => {
    resumeFile.value = e.target.files[0]
}

const validatePhone = (e) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 10) value = value.slice(0, 10)
    form.value.contact = value
}

const submitForm = async () => {

    if (
        !form.value.full_name ||
        !form.value.contact ||
        !form.value.email ||
        !form.value.city ||
        !form.value.qualification ||
        !form.value.experience ||
        !resumeFile.value
    ) return

    isLoading.value = true

    const formData = new FormData()
    formData.append('cmd', 'drheal_frontend.api.jobapp.submit_job_application')
    formData.append('first_name', form.value.full_name)
    formData.append('contact_number', form.value.contact)
    formData.append('email', form.value.email)
    formData.append('city', form.value.city)
    formData.append('qualification', form.value.qualification)
    formData.append('experience', form.value.experience)
    formData.append('job_opening', jobName.value)
    formData.append('resume', resumeFile.value)

    try {
        const res = await fetch(
            '/api/method/drheal_frontend.api.jobapp.submit_job_application',
            { method: 'POST', body: formData }
        ).then(r => r.json())

        if (res.message?.status === 'success') {
            successMsg.value = res.message.message

            // reset form
            form.value = {
                full_name: '',
                contact: '',
                email: '',
                city: '',
                qualification: '',
                experience: ''
            }
            resumeFile.value = null

            // 👇 auto-hide success message after 3 seconds
            setTimeout(() => {
                successMsg.value = ''
            }, 3000)
        }
    } catch (e) {
        successMsg.value = 'Something went wrong'

        setTimeout(() => {
            successMsg.value = ''
        }, 3000)
    }

    isLoading.value = false
}
</script>
