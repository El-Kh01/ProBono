// Функция для переключения вкладок
function showTab(tabId) {
    // Скрыть все вкладки
    const tabs = document.querySelectorAll('.client-table');
    tabs.forEach(tab => {
        tab.style.display = 'none';
    });

    // Показать выбранную вкладку
    const selectedTab = document.getElementById(tabId);
    selectedTab.style.display = 'block';
}

// Авторизация пользователя
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Отключить стандартное поведение формы
    document.getElementById('app-content').style.display = 'block'; // Показать контент
    document.getElementById('login-form').style.display = 'none'; // Скрыть форму
});
