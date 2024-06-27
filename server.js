const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000; // Порт, на котором будет работать сервер

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Функция для загрузки пользователей из файла users.json
function loadUsers() {
    try {
        const data = fs.readFileSync('users.json');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading users.json file:', err);
        return {};
    }
}

// Функция для сохранения пользователей в файл users.json
function saveUsers(users) {
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
}

// Главная страница - отдаем статические файлы (HTML, CSS, JS)
app.use(express.static('public'));

// Обработка регистрации нового пользователя
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const users = loadUsers();
    if (users[username]) {
        res.status(400).send('Username already exists');
    } else {
        users[username] = { password };
        saveUsers(users);
        res.send('Registration successful');
    }
});

// Обработка входа пользователя
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = loadUsers();
    if (users[username] && users[username].password === password) {
        res.send('Login successful');
    } else {
        res.status(401).send('Invalid username or password');
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
