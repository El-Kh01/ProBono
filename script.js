document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const appContent = document.getElementById('app-content');
    
    const validUsername = 'admin';
    const validPassword = 'password123';

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === validUsername && password === validPassword) {
            alert('Успешный вход!');
            loginForm.style.display = 'none';
            appContent.style.display = 'block';
        } else {
            alert('Неверный логин или пароль. Попробуйте снова.');
        }
    });

    // Функция для отображения вкладок
    function showTab(tabId) {
        const tabs = document.querySelectorAll('.tab-content');
        tabs.forEach(tab => tab.style.display = 'none');
        
        const activeTab = document.getElementById(tabId);
        activeTab.style.display = 'block';
    }

    // Функция для сохранения редактирования в строке
    function saveRow(button) {
        const row = button.closest('tr');
        const cells = row.querySelectorAll('td[contenteditable="true"]');
        cells.forEach(cell => {
            const updatedValue = cell.textContent;
            console.log(Сохранено: ${updatedValue});
        });
    }

    // Пример: Показать вкладку "Поступившие"
    showTab('incoming');
});