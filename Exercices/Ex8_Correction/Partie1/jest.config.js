module.exports = {
    testEnvironment: 'node',
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        '*.js',
        '!*.test.js',
        '!jest.config.js',
        '!coverage/**'
    ],
    testMatch: [
        '**/*.test.js'
    ],
    verbose: true
};
