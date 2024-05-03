// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  css: ['~/assets/styles/_main.scss'],
  modules: ['nuxt-swiper', 'nuxt-icon', '@nuxt/ui', '@pinia/nuxt'],
  swiper: {

  },

  components: [
    {
      path: '~/components', // will get any components nested in let's say /components/test too
      pathPrefix: false,
    }
  ],
  runtimeConfig: {
  },
  vite: {
    resolve: {
      dedupe: [
        'vue'
      ]
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8080/',
          changeOrigin: true
        }
      }
    }
  },
  app: {
    pageTransition: {
      name: 'page',
    },
    layoutTransition: {
      name: 'page',
    },
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      script: [
        { src: '/highcharts.src.js' },
        { src: '/highcharts-more.src.js' },
        { src: '/highcharts-3d.src.js' },
        { src: '/solid-gauge.src.js' },
        { src: '/exporting.js' },

        { src: '/xlsx.full.min.js' }
      ]
    }
  }
})
