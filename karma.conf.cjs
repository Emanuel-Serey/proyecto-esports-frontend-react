module.exports = function (config) {

    config.set({

        frameworks: [
            "jasmine",
            "webpack"
        ],

        files: [
            {
                pattern: "src/testSetup.js",
                watched: false
            },
            {
                pattern: "src/**/*.spec.js",
                watched: true
            },
            {
                pattern: "src/**/*.spec.jsx",
                watched: true
            }
        ],

        preprocessors: {
            "src/**/*.spec.js": [
                "webpack"
            ],
            "src/**/*.spec.jsx": [
                "webpack"
            ]
        },

        webpack: {

            mode: "development",

            devtool: "inline-source-map",

            module: {

                rules: [
                    {
                        test: /\.(js|jsx)$/,

                        exclude: /node_modules/,

                        use: {
                            loader: "babel-loader",

                            options: {

                                presets: [
                                    [
                                        "@babel/preset-env",
                                        {
                                            targets: "defaults"
                                        }
                                    ],

                                    [
                                        "@babel/preset-react",
                                        {
                                            runtime: "automatic"
                                        }
                                    ]
                                ],

                                plugins: [
                                    [
                                        "babel-plugin-istanbul",
                                        {
                                            exclude: [
                                                "**/*.spec.js",
                                                "**/*.spec.jsx"
                                            ]
                                        }
                                    ]
                                ]
                            }
                        }
                    }
                ]
            },

            resolve: {
                extensions: [
                    ".js",
                    ".jsx"
                ]
            }
        },

        reporters: [
            "progress",
            "coverage"
        ],

        coverageReporter: {

            dir: "coverage",

            reporters: [
                {
                    type: "html",
                    subdir: "html"
                },
                {
                    type: "text-summary"
                }
            ]
        },

        browsers: [
            "ChromeHeadless"
        ],

        singleRun: true,

        autoWatch: false

    });
};