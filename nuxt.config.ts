// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  runtimeConfig: {
    public: {
      serviceId: process.env.NUXT_ENV_EMAILJS_SERVICE_ID,
      templateId: process.env.NUXT_ENV_EMAILJS_TEMPLATE_ID,
      userId: process.env.NUXT_ENV_EMAILJS_USER_ID,
    },
  },
});
