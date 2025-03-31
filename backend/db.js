const { Sequelize } = require('sequelize');
require('dotenv').config();  // Загружаем переменные окружения из .env

// Настройка подключения к базе данных PostgreSQL
const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: 'postgres',
    logging: false  // Отключение логирования SQL запросов
});

sequelize.authenticate()
    .then(() => {
        console.log('Подключение к базе данных успешно установлено!');
    })
    .catch((err) => {
        console.error('Не удалось подключиться к базе данных:', err);
    });

module.exports = sequelize;
