module.exports = {
    testEnvironment: 'node',
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'service/**/*.js',
        '!**/node_modules/**',
        '!**/coverage/**'
    ],
    testMatch: [
        '**/__tests__/**/*.test.js',
        '**/*.test.js'
    ],
    verbose: true,
    testTimeout: 10000
};
