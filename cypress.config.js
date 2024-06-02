const { defineConfig } = require('cypress')

module.exports = defineConfig({
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
