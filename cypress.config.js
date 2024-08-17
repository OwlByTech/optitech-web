const { defineConfig } = require('cypress')
const path = require("path")
const dotenv = require("dotenv")

const envPath = path.join(__dirname, ".env")
dotenv.config({
    path: envPath,
})
module.exports = defineConfig({
    env: {
        API_URL: process.env.API_URL
    },
    component: {
        devServer: {
            framework: 'next',
            bundler: 'webpack',

        },
    },
    e2e: {
        setupNodeEvents(on, config) { },
        supportFile: false
    },

})
