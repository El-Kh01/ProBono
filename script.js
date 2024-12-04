document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const appContent = document.getElementById('app-content');
    const validUsername = 'admin';
    const validPassword = 'password123';

    // Обработка отправки формы
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === validUsername && password === validPassword) {
            alert('Вход выполнен успешно!');
            loginForm.style.display = 'none';
            appContent.style.display = 'block';
        } else {
            alert('Неверный логин или пароль. Попробуйте снова.');
        }
    });

    // Функция для отображения нужной вкладки
    window.showTab = function(tabName) {
        const tabs = document.querySelectorAll('.client-table');
        tabs.forEach(tab => tab.style.display = 'none');
        document.getElementById(tabName).style.display = 'block';
    };

    // Добавление клиентов в таблицы
    function addClient(tab, name, status) {
        const table = document.querySelector(#${tab} tbody);  // Строка была исправлена
        let row = table.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.textContent = name;
        cell2.textContent = status;
    }

    // Пример добавления клиентов
    addClient('new', 'Иван Иванов', 'Поступил');
    addClient('in-progress', 'Анна Смирнова', 'В процессе');
    addClient('completed', 'Олег Петров', 'Завершено');
});