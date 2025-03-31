const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('./models/User');
const sequelize = require('./db');
const { Op } = require('sequelize');  // Не забудь импортировать Op

dotenv.config();

const app = express();
app.use(express.json());  // Для парсинга JSON данных

// Обслуживание статичных файлов (HTML, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Главная страница (авторизация)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));  // Отправка страницы login.html
});

// Страница регистрации
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));  // Отправка страницы register.html
});

// Синхронизация базы данных
sequelize.sync().then(() => {
    console.log('База данных finance_goals синхронизирована!');
});

// Регистрация пользователя
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Все поля обязательны для заполнения' });
    }

    try {
        // Проверка на существование пользователя с таким email или username
        const existingUser = await User.findOne({
            where: { [Op.or]: [{ email }, { username }] }
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Пользователь с таким email или username уже существует' });
        }

        // Хеширование пароля
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создание нового пользователя
        const newUser = await User.create({ username, email, password: hashedPassword });

        res.status(201).json({ message: 'Регистрация успешна', user: newUser });
    } catch (error) {
        console.error('Ошибка на сервере: ', error);
        res.status(500).json({ message: 'Ошибка регистрации', error });
    }
});

// Логин пользователя
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email и пароль обязательны для входа' });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            console.error('Пользователь не найден');
            return res.status(400).json({ message: 'Пользователь не найден' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.error('Неверный пароль');
            return res.status(400).json({ message: 'Неверный пароль' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Вход успешен', token });
    } catch (error) {
        console.error('Ошибка авторизации:', error);
        res.status(500).json({ message: 'Ошибка авторизации', error });
    }
});

// Пример защищенного маршрута
app.get('/profile', authenticateToken, (req, res) => {
    res.json({ message: 'Доступ к профилю разрешен', userId: req.user.id });
});

// Middleware для проверки JWT
function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Токен не предоставлен' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Неверный токен' });
        }

        req.user = user;
        next();
    });
}

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
