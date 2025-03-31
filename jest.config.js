module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest',  // Используется babel-jest для трансформации файлов .js и .jsx
    },
    testEnvironment: 'jsdom',  // Для тестов с React
  };
  