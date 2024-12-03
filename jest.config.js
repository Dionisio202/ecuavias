module.exports = {
    testEnvironment: 'jsdom', // Usamos jsdom para simular un entorno de navegador
    transform: {
        '^.+\\.jsx?$': 'babel-jest', // Usar babel-jest para transformar archivos .js y .jsx
    },
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'], // Asegura que Jest reconozca estas extensiones
    testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignorar test en node_modules y dist
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'], // Configurar jest-dom
    transformIgnorePatterns: ['/node_modules/(?!@testing-library)'], // No transformar los módulos de @testing-library
};
