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

// Добавление новой строки в таблицу
function addRow(tabId) {
    const table = document.getElementById(tabId + '-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    
    for (let i = 0; i < 9; i++) {
        const newCell = newRow.insertCell();
        newCell.contentEditable = true; // Делать ячейки редактируемыми
    }
    
    // Добавить кнопку "Удалить" в последнюю ячейку
    const deleteCell = newRow.insertCell();
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.onclick = function() {
        deleteRow(this);
    };
    deleteCell.appendChild(deleteButton);
}

// Удаление строки из таблицы
function deleteRow(button) {
    const row = button.parentElement.parentElement;
    row.parentElement.removeChild(row);
}
