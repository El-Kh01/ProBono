document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const appContent = document.getElementById('app-content');

    const validUsername = 'admin';
    const validPassword = 'password123';

    // Обработка отправки формы
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === validUsername && password === validPassword) {
            alert('Login successful!');
            loginForm.style.display = 'none';
            appContent.style.display = 'block';
        } else {
            alert('Invalid username or password. Please try again.');
        }
    });

    // Функция добавления нового клиента
    const table = document.getElementById('clients-table').getElementsByTagName('tbody')[0];

    function addClient(name, status) {
        let row = table.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);

        cell1.textContent = name;
        cell2.textContent = status;
    }

    // Пример: добавляем клиента
    addClient('Alice Green', 'In Process');
});