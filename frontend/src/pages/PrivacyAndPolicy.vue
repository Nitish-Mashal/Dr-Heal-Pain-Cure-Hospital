<template>
  <div class="container py-4 px-4">
    <div class="mx-auto p-2 space-y-6">

      <h2 class="text-2xl font-bold text-gray-800 text-left mb-6">
        Privacy Policy – Dr. Heal Hospital
      </h2>

      <ol class="space-y-6 text-md text-gray-700 list-decimal list-inside">

        <!-- 1 -->
        <li>
          <strong>Information Collection</strong>
          <p class="ml-4 mt-2">
            We collect personal and medical information provided by patients during registration, appointments, and treatment processes. This information is necessary to deliver quality healthcare services.
          </p>
        </li>

        <!-- 2 -->
        <li>
          <strong>Use of Information</strong>
          <p class="ml-4 mt-2">
            Patient information is used for treatment, billing, audits, and compliance purposes. We do not use personal data for unrelated marketing or third-party promotions without consent.
          </p>
        </li>

        <!-- 3 -->
        <li>
          <strong>Sharing of Information</strong>
          <ul class="list-disc list-inside ml-4 mt-2 space-y-2">
            <li>
              Information may be shared with authorized medical staff and insurance providers for treatment or billing purposes.
            </li>
            <li>
              We do not sell or trade patient data to external organizations.
            </li>
            <li>
              Legal requirements may necessitate sharing certain data with authorities when applicable.
            </li>
          </ul>
        </li>

        <!-- 4 -->
        <li>
          <strong>Data Security</strong>
          <p class="ml-4 mt-2">
            All patient data is stored securely using hospital management systems with restricted access. We implement administrative and technical safeguards to protect against unauthorized access, alteration, or disclosure.
          </p>
        </li>

        <!-- 5 -->
        <li>
          <strong>Patient Rights</strong>
          <ul class="list-disc list-inside ml-4 mt-2 space-y-2">
            <li>
              Patients have the right to access their personal and medical information upon request.
            </li>
            <li>
              Requests for correction or deletion of personal data will be handled as per applicable laws and hospital policy.
            </li>
            <li>
              Patients may withdraw consent for non-essential uses of their data at any time.
            </li>
          </ul>
        </li>

        <!-- 6 -->
        <li>
          <strong>Cookies & Online Tracking</strong>
          <p class="ml-4 mt-2">
            Our website may use cookies and tracking technologies to enhance user experience. No personal medical data is collected via cookies unless explicitly submitted by the user.
          </p>
        </li>

        <!-- 7 -->
        <li>
          <strong>Third-Party Services</strong>
          <p class="ml-4 mt-2">
            We may use trusted third-party services for analytics or appointment management. These providers have access only to necessary data and are bound by confidentiality agreements.
          </p>
        </li>

        <!-- 8 -->
        <li>
          <strong>Retention of Data</strong>
          <p class="ml-4 mt-2">
            Patient information is retained as long as necessary for treatment, legal, and regulatory purposes. After this period, data will be securely deleted or anonymized.
          </p>
        </li>

        <!-- 9 -->
        <li>
          <strong>Policy Updates</strong>
          <p class="ml-4 mt-2">
            Dr. Heal Hospital reserves the right to update this Privacy Policy at any time. Updated policies will be published on our website, and continued use of our services indicates acceptance.
          </p>
        </li>

        <!-- 10 -->
        <li>
          <strong>Contact Information</strong>
          <p class="ml-4 mt-2">
            For any questions or concerns regarding this Privacy Policy or your personal data, please contact our hospital administration or data protection officer.
          </p>
        </li>

      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrivacyPolicy',
  data() {
    return {
      agreed: false
    }
  }
}
</script>
