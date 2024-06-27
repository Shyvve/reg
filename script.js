// Функция для регистрации нового пользователя
function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Проверяем, что поля заполнены
    if (!username || !password) {
        showMessage('Please fill in all fields');
        return;
    }

    // Отправляем данные на сервер для регистрации
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
        .then(response => response.text())
        .then(message => {
            showMessage(message);
            // Очищаем поля ввода после успешной регистрации
            if (message === 'Registration successful') {
                document.getElementById('username').value = '';
                document.getElementById('password').value = '';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showMessage('Registration failed');
        });
}

// Функция для вывода сообщений на страницу
function showMessage(message) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
}
