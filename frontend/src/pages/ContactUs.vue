<template>
    <div>
        <!-- Banner -->
        <div class="relative">
            <div class="w-full h-72 bg-cover bg-center" style="background-image: url('/files/contact-us.jpg');">
            </div>
        </div>

        <!-- Main Section -->
        <div class="container py-6">
            <div class="flex justify-center items-center">
                <!-- Outer Card -->
                <div
                    class="w-full max-w-7xl bg-white rounded-3xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-[50%_50%]">

                    <!-- Contact Form Section -->
                    <div class="px-5 py-4 w-full">
                        <div class="md:px-5 max-w-md">

                            <h2 class="text-4xl font-bold bold-test-color mb-1">Get in Touch</h2>
                            <p class="text-gray-600 text-sm mb-3">Have questions? We'd love to hear from you.</p>

                            <!-- ---------------- FORM START ---------------- -->
                            <el-form ref="contactForm" :model="form" :rules="rules" label-position="top">

                                <!-- Name -->
                                <el-form-item label="Name" prop="name">
                                    <input v-model="form.name" type="text" placeholder="Enter your name"
                                        class="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none" />
                                </el-form-item>

                                <!-- Email -->
                                <el-form-item label="Email" prop="email">
                                    <input v-model="form.email" type="email" placeholder="Enter your email"
                                        class="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none" />
                                </el-form-item>

                                <!-- Phone -->
                                <el-form-item label="Phone" prop="phone">
                                    <input v-model="form.phone" type="text" placeholder="Enter your phone number"
                                        class="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none" />
                                </el-form-item>

                                <!-- How did you find us? -->
                                <el-form-item label="How did you find us?" prop="source">
                                    <select v-model="form.source"
                                        class="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none">
                                        <option value="">Select option</option>
                                        <option value="google">Google</option>
                                        <option value="facebook">Facebook</option>
                                        <option value="friend">Friend</option>
                                        <option value="other">Other</option>
                                    </select>
                                </el-form-item>

                                <!-- Button -->
                                <el-button class="w-full py-2 mt-1 font-semibold rounded-md text-white transition-all"
                                    style="background-color: #30809D;" :loading="loading" @click="handleSubmit">
                                    SEND
                                </el-button>

                                <!-- Success / Error Messages -->
                                <p v-if="successMsg" class="text-green-600 mt-3 text-center text-sm">
                                    {{ successMsg }}
                                </p>
                                <p v-if="errorMsg" class="text-red-600 mt-3 text-center text-sm">
                                    {{ errorMsg }}
                                </p>

                            </el-form>
                            <!-- ---------------- FORM END ---------------- -->

                        </div>
                    </div>

                    <!-- Right Blue Section -->
                    <div class="relative flex items-center bg-color-blue p-5">
                        <!-- Center container -->
                        <div class="max-w-md mx-auto flex flex-col gap-8">

                            <!-- Item 1 -->
                            <div class="text-white text-left">
                                <h2 class="flex items-center gap-3 text-4xl font-bold mb-2">
                                    <div class="w-8 h-8 flex items-center justify-center bg-white rounded-full shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="w-5 h-5 text-gray-800">
                                            <path stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                        </svg>
                                    </div>
                                    <span>Contact Us</span>
                                </h2>

                                <p class="mb-2">Talk to us and see how we can work this together</p>
                                <p>
                                    Phone:
                                    <a href="tel:+917969263030" class="no-underline text-white">
                                        +91 79692 63030
                                    </a>
                                </p>
                            </div>

                            <!-- Item 2 -->
                            <div class="text-white text-left">
                                <h2 class="flex items-center gap-3 text-4xl font-bold mb-2">
                                    <div class="w-8 h-8 flex items-center justify-center bg-white rounded-full shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-800">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                    </svg>

                                    </div>
                                    <span>Email Us</span>
                                </h2>

                                <p class="mb-2">Please be patient, we’re usually replying within 24 hours</p>
                                <p>
                                    E-Mail:
                                    <a href="mailto:info@drheal.in?subject=Enquiry from Website"
                                        class="no-underline text-white">
                                            info@drheal.in
                                    </a>
                                </p>
                            </div>

                        </div>
                    </div>


                </div>
            </div>

        </div>
        
        <!-- Address Info Cards -->
<div class="container mt-4 mb-4">
    <div class="row g-4">

        <!-- Card 1 -->
        <div class="col-md-4">
            <div class="card shadow border-0 rounded-4">
                <div class="card-body h-48 d-flex align-items-center justify-content-center text-center">
                    <div>
                        <h5 class="fw-bold text-color-blue mb-2">
                            DR HEAL PAIN CURE HOSPITALS
                        </h5>
                        <div class="flex items-center gap-3">
                            <a href="https://www.google.com/maps?q=DR+HEAL+PAIN+CURE+HOSPITALS+HSR+Layout+Bangalore"
                            target="_blank"
                            class="flex items-start gap-1 text-muted small text-decoration-none">

                                <!-- Location Icon -->
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-5 h-5 shrink-0">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>

                                <!-- Address Text -->
                                <span>
                                    Ganapa Arcade, 392, 9th Main Rd, 7th Sector,  
                                    HSR Layout, Bengaluru, Karnataka 560102, India
                                </span>
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <!-- Card 2 -->
        <div class="col-md-4">
            <div class="card shadow border-0 rounded-4">
                <div class="card-body h-48 d-flex align-items-center justify-content-center text-center">
                    <div>
                        <h5 class="fw-bold text-color-blue mb-2">
                            Doctor Heal Hospital and Diagnostics
                        </h5>
                        <div class="flex items-center gap-3">
                            <a href="https://www.google.com/maps?q=Doctor+Heal+Hospital+and+Diagnostics+Pillaganahalli+Bangalore"
                            target="_blank"
                            class="flex items-start gap-1 text-muted small text-decoration-none">

                                <!-- Location Icon -->
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-5 h-5 shrink-0">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>

                                <!-- Address Text -->
                                <span>
                                    Road, next to Kaushalya Vikas Kendra,  
                                    Weavers Colony, Pillaganahalli,  
                                    Bengaluru, Karnataka 560083
                                </span>
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <!-- Card 3 -->
        <div class="col-md-4">
            <div class="card shadow border-0 rounded-4">
                <div class="card-body h-48 d-flex align-items-center justify-content-center text-center">
                    <div>
                        <h5 class="fw-bold text-color-blue mb-2">
                            ACHARYA POLY CLINIC AND LAB <br>
                            <span class="fst-italic text-sm">
                                (A Dr. Heal Multispeciality Group Hospital)
                            </span>
                        </h5>
                        <div class="flex items-center gap-3">
                            <a href="https://www.google.com/maps?q=ACHARYA+POLY+CLINIC+AND+LAB+Bannerghatta+Bangalore"
                            target="_blank"
                            class="flex items-start gap-1 text-muted small text-decoration-none">

                                <!-- Icon -->
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-5 h-5 shrink-0">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>

                                <!-- Text -->
                                <span>
                                    Taluk, Opposite Bus Stop, Shanubhoganahalli,  
                                    Bannerghatta Post, Anekal,  
                                    Bengaluru, Karnataka 560083
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>



    </div>
</template>

<script setup>
import { ref } from "vue";

// Form Refs
const contactForm = ref(null);
const loading = ref(false);
const successMsg = ref("");
const errorMsg = ref("");

// Form data
const form = ref({
    name: "",
    email: "",
    phone: "",
    source: "",
});

// Validation rules
const rules = {
    name: [{ required: true, message: "Please enter your name", trigger: "blur" }],
    email: [{ required: true, message: "Please enter your email", trigger: "blur" }],
    phone: [
        { required: true, message: "Please enter Phone Number", trigger: "blur" },
        {
            validator: (rule, value, callback) => {
                const digitsOnly = value.replace(/\D/g, "");
                if (!digitsOnly) {
                    callback(new Error("Please enter your mobile number."));
                } else if (!/^[6-9]\d{0,9}$/.test(digitsOnly)) {
                    callback(new Error("Please enter a valid Indian mobile number."));
                } else if (digitsOnly.length > 10) {
                    callback(new Error("Mobile number cannot exceed 10 digits."));
                } else if (digitsOnly.length < 10) {
                    callback(new Error("Mobile number must be 10 digits."));
                } else {
                    callback();
                }
            },
            trigger: "blur",
        },
    ],
    source: [{ required: true, message: "Please select an option", trigger: "blur" }],
};

// Submit contact form
const handleSubmit = () => {
    successMsg.value = "";
    errorMsg.value = "";

    contactForm.value.validate(async (valid) => {
        if (!valid) return;

        loading.value = true;

        try {
            const response = await fetch("/api/method/drheal_frontend.api.contact.submit_contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                },
                body: JSON.stringify(form.value),
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const res = await response.json();
            console.log("API RES:", res);

            if (res.message?.message === "success") {
                successMsg.value = "Message submitted successfully!";
                form.value = { name: "", email: "", phone: "", source: "" };
            } else {
                errorMsg.value = res.message?.message || "Something went wrong.";
            }

        } catch (error) {
            console.error("ERROR:", error);
            errorMsg.value = "Something went wrong.";
        } finally {
            loading.value = false;
        }
    });
};
</script>
