// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    AUTH0_CLIENTID: "",
    AUTH0_SECRET: "",
    BASEURL: "",
    ISSUER: "",
    STRIPE_PUBLIC: "",
    STRIPE_SECRET: "",
    AWS_S3_BUCKET_NAME: "",
    EMAIL_SOURCE_ADDRESS: "",
  },
});
