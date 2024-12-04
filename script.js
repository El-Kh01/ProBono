document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const appContent = document.getElementById('app-content');

    const validUsername = 'admin';  // Имя пользователя
    const validPassword = 'password123';  // Пароль

    // Обработка отправки формы
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === validUsername && password === validPassword) {
            alert('Вход выполнен успешно!');
            loginForm.style.display = 'none';
            appContent.style.display = 'block';
        } else {
            alert('Неверное имя пользователя или пароль. Пожалуйста, попробуйте снова.');
        }
    });

    // Функция для редактирования таблицы
    function makeEditable(cell) {
        const currentValue = cell.textContent;
        const input = document.createElement('input');
        input.value = currentValue;

        // Заменяем содержимое ячейки на поле ввода
        cell.textContent = '';
        cell.appendChild(input);

        // Обработчик для потери фокуса
        input.addEventListener('blur', function () {
            cell.textContent = input.value;
        });

        // Обработчик для нажатия Enter
        input.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                cell.textContent = input.value;
            }
        });
    }

    // Обработчик для кнопок "Редактировать"
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', function () {
            const row = button.closest('tr');
            const cells = row.getElementsByTagName('td');
            
            // Редактируем имя клиента
            makeEditable(cells[0]);
            // Редактируем статус клиента
            makeEditable(cells[1]);
        });
    });
});