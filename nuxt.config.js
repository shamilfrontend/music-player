module.exports = {
  srcDir: 'client/',

  mode: 'universal',

  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },

  loading: {
    color: '#1160de'
  },

  css: ['normalize.css/normalize.css', './assets/styles/base.css'],

  plugins: [],

  buildModules: ['@nuxtjs/eslint-module'],

  modules: ['@nuxtjs/axios', '@nuxtjs/pwa'],

  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000'
  },

  build: {
    extend(config, ctx) {}
  }
}
