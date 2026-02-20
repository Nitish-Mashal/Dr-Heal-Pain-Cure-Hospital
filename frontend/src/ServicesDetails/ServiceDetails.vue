<template>
    <div class="container-fluid mb-5">

        <!-- ================= BANNER ================= -->
        <div v-if="service" class="relative w-full mb-5 overflow-hidden rounded-4">
            <img :src="serviceImage" :alt="altText"
                class="w-full h-48 sm:h-56 md:h-80 object-contain md:object-cover" />
            <div class="absolute inset-0 bg-[#38113B] opacity-70"></div>
            <div class="absolute inset-0 flex items-center justify-center z-10 px-6">
                <h1 class="text-white font-semibold text-center text-3xl md:text-5xl">
                    {{ service.name1 }}
                </h1>
            </div>
        </div>

        <!-- ================= CONTENT ================= -->
        <div v-if="service" class="container">
            <div class="row">

                <!-- LEFT CONTENT -->
                <div class="col-md-8">
                    <div class="text-gray-700 leading-relaxed" v-html="service.description"></div>
                </div>

                <!-- RIGHT CONTACT FORM -->
                <div class="col-md-4">
                    <div class="card border-0 shadow-md rounded-4">
                        <div class="card-body">

                            <h5 class="text-center font-semibold mb-3">
                                Contact Us For Enquiry
                            </h5>

                            <el-form ref="contactForm" :model="form" :rules="rules" label-position="top">
                                <!-- Name -->
                                <el-form-item label="Name" prop="name">
                                    <input v-model="form.name" type="text" class="form-control"
                                        placeholder="Enter your name" />
                                </el-form-item>

                                <!-- Email -->
                                <el-form-item label="Email" prop="email">
                                    <input v-model="form.email" type="email" class="form-control"
                                        placeholder="Enter your email" />
                                </el-form-item>

                                <!-- Phone -->
                                <el-form-item label="Phone" prop="phone">
                                    <input v-model="form.phone" type="text" class="form-control"
                                        placeholder="Enter your phone number" />
                                </el-form-item>

                                <!-- Source -->
                                <el-form-item label="How did you find us?" prop="source">
                                    <select v-model="form.source" class="form-control">
                                        <option value="">Select option</option>
                                        <option value="facebook">Facebook</option>
                                        <option value="instagram">Instagram</option>
                                        <option value="google">Google</option>
                                        <option value="friend">Friend</option>
                                        <option value="other">Others</option>
                                    </select>
                                </el-form-item>

                                <!-- Submit -->
                                <el-button class="w-100 mt-2" type="primary" :loading="loading" @click="handleSubmit">
                                    SEND
                                </el-button>

                                <!-- Messages -->
                                <p v-if="successMsg" class="text-success text-center mt-3">
                                    {{ successMsg }}
                                </p>
                                <p v-if="errorMsg" class="text-danger text-center mt-3">
                                    {{ errorMsg }}
                                </p>
                            </el-form>

                        </div>
                    </div>
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
        : `https://www.drheal.in/${service.value.thumnail_image}`
})

const altText = computed(() =>
    service.value?.name1
        ? `Dr.Heal Multispeciality Hospital - ${service.value.name1}`
        : "Dr.Heal Multispeciality Hospital"
)

/* ---------------- CONTACT FORM ---------------- */
const contactForm = ref(null)
const loading = ref(false)
const successMsg = ref("")
const errorMsg = ref("")

const form = ref({
    name: "",
    email: "",
    phone: "",
    source: "",
})

const rules = {
    name: [{ required: true, message: "Please enter your name", trigger: "blur" }],
    email: [{ required: true, message: "Please enter your email", trigger: "blur" }],
    phone: [
        { required: true, message: "Please enter Phone Number", trigger: "blur" },
        {
            validator: (rule, value, callback) => {
                const digits = value.replace(/\D/g, "")
                if (!/^[6-9]\d{9}$/.test(digits)) {
                    callback(new Error("Enter valid 10 digit mobile number"))
                } else callback()
            },
            trigger: "blur",
        },
    ],
    source: [{ required: true, message: "Please select an option", trigger: "change" }],
}

const handleSubmit = () => {
    successMsg.value = ""
    errorMsg.value = ""

    contactForm.value.validate(async (valid) => {
        if (!valid) return

        loading.value = true
        try {
            const res = await fetch(
                "/api/method/drheal_frontend.api.contact.submit_contact",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form.value),
                }
            )

            const data = await res.json()

            if (data.message?.message === "success") {
                successMsg.value =
                    data.message.success_message ||
                    "Thank you for contacting us. We will connect shortly."
                contactForm.value.resetFields()
            } else {
                errorMsg.value = "Something went wrong. Please try again."
            }
        } catch (e) {
            errorMsg.value = "Server error. Please try later."
        } finally {
            loading.value = false
        }
    })
}

/* ---------------- WATCHERS ---------------- */
watch(() => route.params.slug, () => {
    service.value = null
    fetchService()
})

onMounted(fetchService)
</script>
