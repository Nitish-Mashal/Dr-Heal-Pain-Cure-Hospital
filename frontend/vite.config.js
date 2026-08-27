import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import prerender from 'vite-plugin-prerender'
import { getProxyOptions } from 'frappe-ui/src/utils/vite-dev-server'
import { webserver_port } from '../../../sites/common_site_config.json'

const outDir = path.resolve(__dirname, '../drheal_frontend/public/frontend')

const prerenderRoutes = [
  '/',
  '/about-us',
  '/services',
  '/doctors-list',
  '/appointment',
  '/AppointmentNotice',
  '/blog',
  '/gallery',
  '/contact-us',
  '/careers',
  '/send-your-resume',
  '/submit-job',
  '/terms-and-conditions',
  '/privacy-policy',
  '/services/knee-pain-treatment-in-bangalore',
  '/services/joint-pain-treatment-in-bangalore',
  '/services/back-pain-treatment-in-bangalore',
  '/services/disc-bulge-treatment-in-bangalore',
  '/services/degenerative-diseases-of-the-disc-joint-in-bangalore',
  '/services/facet-joints-treatment-in-bangalore',
  '/services/sciatica-treatment-in-bangalore',
  '/services/iliosacritis-treatment-in-bangalore',
  '/services/discogenic-pain-treatment-in-bangalore',
  '/services/cervical-and-lumbar-spondylosis-spondylitis-in-bangalore',
  '/services/lumbar-sprains-strains-treatment-in-bangalore',
  '/services/knee-osteoarthritis-treatment-in-bangalore',
  '/services/osteomyelitis-treatment-in-bangalore',
  '/services/biological-management-of-fractures-treatment-in-bangalore',
  '/services/spinal-canal-stenosis-treatment-in-bangalore',
  '/services/anti-ccp-positive-test-in-bangalore',
  '/services/hlab27-positive-test-in-bangalore',
  '/services/myasthenia-gravis-treatment-in-bangalore',
  '/services/myosotis-treatment-in-bangalore',
  '/services/shoulder-elbow-pain-treatment-in-bangalore',
  '/services/neck-pain-treatment-in-bangalore',
  '/services/wrist-pain-treatment-in-bangalore',
  '/services/hip-pain-treatment-in-bangalore',
  '/services/diet-modifications-in-bangalore',
  '/services/regenerative-treatment-in-bangalore',
  '/services/rejuvenation-injections-in-bangalore',
  '/facilities/pharmacy',
  '/facilities/chelation-therapy',
  '/facilities/clinical-nutrition',
  '/facilities/medical-counseling',
  '/facilities/pain-cure-medicine',
  '/facilities/functional-medicine',
  '/facilities/orthopedic-medicine',
  '/facilities/regenerative-medicine',
  '/facilities/functional-psychotherapy',
  '/facilities/laboratory-services-radiology',
  '/facilities/out-patient-in-patient-services',
  '/facilities/nutrition-detoxification-therapy',
  '/facilities/basic-life-support-emergency-medicine',
  '/blogdetails/non-surgical-treatment-for-back-pain',
  '/blogdetails/taking-control-of-your-cholesterol',
  '/blogdetails/importance-of-diet-in-management-of-rheumatoid-arthritis',
  '/viewProfile/HLC-PRAC-2026-00001',
  '/viewProfile/HLC-PRAC-2026-00002',
  '/viewProfile/HLC-PRAC-2026-00003',
  '/viewProfile/HLC-PRAC-2026-00004',
  '/appointment?doctor_id=HLC-PRAC-2026-00001',
  '/appointment?doctor_id=HLC-PRAC-2026-00002',
  '/appointment?doctor_id=HLC-PRAC-2026-00003',
  '/appointment?doctor_id=HLC-PRAC-2026-00004',
]

export default defineConfig({
  base: process.env.NODE_ENV === 'production'
    ? '/assets/drheal_frontend/'
    : '/',
  plugins: [
    vue(),
    prerender({
      routes: prerenderRoutes,
      staticDir: outDir,
      renderAfterDocumentEvent: 'render-event',
    }),
  ],
  server: {
    port: 8081,
    proxy: getProxyOptions({ port: webserver_port }),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: `../${path.basename(path.resolve('..'))}/public/frontend`,
    emptyOutDir: true,
    target: 'es2015',

    // ✅ Split CSS per component for faster LCP
    cssCodeSplit: true,

    // ✅ Minify JS and CSS aggressively
    minify: 'esbuild',

    // ✅ Reduce sourcemap size in production
    sourcemap: false,
  },
  optimizeDeps: {
    include: [
      'frappe-ui > feather-icons',
      'showdown',
      'engine.io-client',
      'debug',
    ],
    esbuildOptions: {
      target: 'esnext', // handle async generators
    },
  },
})
