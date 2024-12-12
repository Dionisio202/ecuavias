


module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFiles: ['dotenv/config'], // Cargar automáticamente el archivo .env
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
};
