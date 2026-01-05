module.exports = {
    testEnvironment: 'node',
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'service/**/*.js',
        '!service/**/*.test.js',
        '!**/node_modules/**'
    ],
    testMatch: ['**/*.test.js'],
    verbose: true
};
