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

            <!-- Job Listing -->
            <div v-if="showJobDetails">
                <div class="flex justify-between items-center text-gray-800">
                    <h3 class="font-semibold text-2xl">{{ jobName }}</h3>

                    <div v-if="jobType"
                        class="border-1 border-gray-800 text-sm px-3 py-1 rounded-full inline-flex items-center justify-center whitespace-nowrap mt-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-4 h-4 mr-2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        {{ jobType }}
                    </div>
                </div>

                <div class="pt-2 text-justify">
                    {{ jobDescription }}
                </div>
            </div>


            <!-- Form -->
            <div class="row">

                <!-- Row 1 -->
                <div class="col-md-4">
                    <label class="form-label mt-4">First Name <span class="text-red-600">*</span></label>
                    <input type="text" class="form-control py-1 placeholder:text-sm" v-model="form.firstName"
                        @input="errors.firstName = false" placeholder="Enter your First Name *" />
                    <p v-if="errors.firstName" class="text-red-600 text-sm mt-1">First Name is required.</p>
                </div>

                <div class="col-md-4">
                    <label class="form-label mt-4">Middle Name</label>
                    <input type="text" class="form-control py-1 placeholder:text-sm" v-model="form.middleName"
                        placeholder="Enter your Middle Name" />
                </div>

                <div class="col-md-4">
                    <label class="form-label mt-4">Last Name <span class="text-red-600">*</span></label>
                    <input type="text" class="form-control py-1 placeholder:text-sm" v-model="form.lastName"
                        @input="errors.lastName = false" placeholder="Enter your Last Name *" />
                    <p v-if="errors.lastName" class="text-red-600 text-sm mt-1">Last Name is required.</p>
                </div>

                <!-- Row 2 -->
                <div class="col-md-4">
                    <label class="form-label mt-4">Experience <span class="text-red-600">*</span></label>
                    <input type="text" class="form-control py-1 placeholder:text-sm" v-model="form.experience"
                        @input="errors.experience = false" placeholder="Enter your Experience *" />
                    <p v-if="errors.experience" class="text-red-600 text-sm mt-1">Experience is required.</p>
                </div>

                <div class="col-md-4">
                    <label class="form-label mt-4">Email Address <span class="text-red-600">*</span></label>
                    <input type="email" class="form-control py-1 placeholder:text-sm" v-model="form.email"
                        @input="errors.email = false" placeholder="Enter your Email Address *" />
                    <p v-if="errors.email" class="text-red-600 text-sm mt-1">Valid Email is required.</p>
                </div>

                <div class="col-md-4">
                    <label class="form-label mt-4">Contact Number <span class="text-red-600">*</span></label>
                    <input type="text" class="form-control py-1 placeholder:text-sm" v-model="form.contact"
                        @input="validatePhone" maxlength="10" placeholder="Enter your Contact Number *" />
                    <p v-if="errors.contact" class="text-red-600 text-sm mt-1">
                        {{ errors.contact }}
                    </p>
                </div>
            </div>

            <!-- Upload + Submit -->
            <div class="flex flex-col md:flex-row md:justify-between md:items-start pt-4 gap-3 md:gap-0">

                <!-- Upload Resume -->
                <div class="flex flex-col">
                    <label class="cursor-pointer border-1 border-gray-800 px-5 py-1 rounded-full
        hover:bg-gray-100 transition inline-flex items-center
        w-full justify-center text-center overflow-hidden text-ellipsis whitespace-normal">

                        <input type="file" class="hidden" @change="handleResumeUpload" />

                        <span class="truncate w-full text-center">
                            {{ resumeName || "Upload Resume" }}
                        </span>
                    </label>

                    <p v-if="errors.resume" class="text-red-600 text-sm mt-1">
                        Resume is required.
                    </p>
                </div>


                <!-- Submit Button -->
                <button :disabled="isLoading" @click="submitForm"
                    class="cursor-pointer bg-color-blue text-white px-5 py-1 rounded-full hover:text-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed">
                    Submit
                </button>
            </div>

            <!-- SUCCESS MESSAGE -->
            <p v-if="successMsg" class="text-green-500 text-lg mt-3">
                {{ successMsg }}
            </p>


            <!-- Contact Info -->
            <div class="text-xl font-normal pt-4 pb-4">
                Interested candidates can contact or share resumes to
                <span class="font-semibold">info@drheal.in</span>
            </div>

        </div>

        <!-- FULL SCREEN LOADER -->
        <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white px-6 py-4 rounded-xl shadow-lg text-lg font-semibold">
                Submitting...
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

// API DATA
const jobName = ref("");
const jobType = ref("");
const jobDescription = ref("");

// Flag to show job details only if coming from listing page
const showJobDetails = ref(false);

const isLoading = ref(false);

// FORM DATA
const form = ref({
    firstName: "",
    middleName: "",
    lastName: "",
    experience: "",
    email: "",
    contact: "",
});

// ERROR FLAGS
const errors = ref({
    firstName: false,
    lastName: false,
    experience: false,
    email: false,
    contact: false,
    resume: false,
});

// SUCCESS MESSAGE
const successMsg = ref("");

// RESUME UPLOAD
const resumeFile = ref(null);
const resumeName = ref("");

// ROUTER QUERY
const route = useRoute();

const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
        resumeFile.value = file;
        resumeName.value = file.name;
        errors.value.resume = false;
    }
};

// Prefill job details using title from query and fetch full details dynamically
onMounted(async () => {
    const title = route.query.title;
    if (!title) return; // if no title in query, don't show anything

    jobName.value = title;
    showJobDetails.value = true;

    try {
        const response = await fetch("/api/method/drheal_frontend.api.jobapp.get_job_openings");
        const res = await response.json();

        if (res.message?.data?.length > 0) {
            // Find the job that matches the title
            const job = res.message.data.find(j => j.job_title === title);

            if (job) {
                jobType.value = job.job_type || "";
                jobDescription.value = job.description || "";
            }
        }
    } catch (error) {
        console.error("GET API Error:", error);
    }
});

const validatePhone = (e) => {
    let value = e.target.value;

    // Remove all non-digits
    value = value.replace(/\D/g, "");

    // Limit to 10 digits
    if (value.length > 10) value = value.slice(0, 10);

    form.value.contact = value;

    // Auto validation while typing
    if (!value) {
        errors.value.contact = "Contact Number is required.";
    } else if (!/^[6-9]/.test(value)) {
        errors.value.contact = "Indian numbers must start with 6, 7, 8 or 9.";
    } else if (value.length !== 10) {
        errors.value.contact = "Contact Number must be exactly 10 digits.";
    } else {
        errors.value.contact = false;
    }
};


const submitForm = async () => {
    // VALIDATIONS
    errors.value.firstName = !form.value.firstName
    errors.value.lastName = !form.value.lastName
    errors.value.email = !form.value.email
    errors.value.experience = !form.value.experience

    if (!form.value.contact) {
        errors.value.contact = 'Contact Number is required.'
    } else if (!/^[6-9]/.test(form.value.contact)) {
        errors.value.contact = 'Indian numbers must start with 6, 7, 8 or 9.'
    } else if (form.value.contact.length !== 10) {
        errors.value.contact = 'Contact Number must be exactly 10 digits.'
    } else {
        errors.value.contact = false
    }

    errors.value.resume = !resumeFile.value

    if (
        errors.value.firstName ||
        errors.value.lastName ||
        errors.value.email ||
        errors.value.experience ||
        errors.value.contact ||
        errors.value.resume
    ) {
        return
    }

    isLoading.value = true

    const formData = new FormData()
    formData.append('cmd', 'drheal_frontend.api.jobapp.submit_job_application')
    formData.append('first_name', form.value.firstName)
    formData.append('middle_name', form.value.middleName || '')
    formData.append('last_name', form.value.lastName)
    formData.append('email', form.value.email)
    formData.append('resume', resumeFile.value)
    formData.append('job_opening', jobName.value)
    formData.append('experience', form.value.experience)
    formData.append('contact_number', form.value.contact)
    formData.append('description', jobDescription.value || '')

    try {
        const response = await fetch('/api/method/drheal_frontend.api.jobapp.submit_job_application', {
            method: 'POST',
            body: formData
        })

        const res = await response.json()

        if (res.message && res.message.message) {
            successMsg.value = res.message.message
        }

        if (res.message && res.message.status === 'success') {
            form.value = {
                firstName: '',
                middleName: '',
                lastName: '',
                experience: '',
                email: '',
                contact: ''
            }
            resumeFile.value = null
            resumeName.value = ''
        }
    } catch (error) {
        console.error('POST API Error:', error)
        successMsg.value = 'Something went wrong, please try again.'
    }

    isLoading.value = false

    setTimeout(() => {
        successMsg.value = ''
    }, 3000)
}

</script>
