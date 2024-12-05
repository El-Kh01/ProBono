// Импортируем необходимые функции из firebase.js
import { db, collection, addDoc, getDocs, deleteDoc, doc } from './firebase.js';

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

// Получение данных из Firestore и отображение в таблице
async function loadTableData(tabId) {
    const table = document.getElementById(tabId + '-table').getElementsByTagName('tbody')[0];
    const querySnapshot = await getDocs(collection(db, tabId));
    querySnapshot.forEach((doc) => {
        const newRow = table.insertRow();
        const data = doc.data();
        
        // Добавление данных в ячейки таблицы
        Object.values(data).forEach(value => {
            const newCell = newRow.insertCell();
            newCell.textContent = value;
            newCell.contentEditable = true; // Ячейки можно редактировать
        });
        
        // Добавить кнопку "Удалить" в последнюю ячейку
        const deleteCell = newRow.insertCell();
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.onclick = function() {
            deleteRow(this, doc.id, tabId); // Удаление данных из Firestore
        };
        deleteCell.appendChild(deleteButton);
    });
}

// Добавление новой строки в таблицу и в Firestore
async function addRow(tabId) {
    const table = document.getElementById(tabId + '-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    
    const rowData = {};
    for (let i = 0; i < 9; i++) {
        const newCell = newRow.insertCell();
        newCell.contentEditable = true; // Делать ячейки редактируемыми
        newCell.addEventListener('input', () => {
            rowData['field' + (i + 1)] = newCell.textContent; // Сохраняем данные в объект
        });
    }
    
    // Добавить кнопку "Удалить" в последнюю ячейку
    const deleteCell = newRow.insertCell();
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.onclick = function() {
        deleteRow(this);
    };
    deleteCell.appendChild(deleteButton);

    // Добавить строку в Firestore
    try {
        const docRef = await addDoc(collection(db, tabId), rowData);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

// Удаление строки из таблицы и из Firestore
async function deleteRow(button, docId, tabId) {
    const row = button.parentElement.parentElement;
    row.parentElement.removeChild(row);
    
    // Удаление документа из Firestore
    try {
        await deleteDoc(doc(db, tabId, docId));
        console.log("Document deleted with ID: ", docId);
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}

// Загрузка данных при старте страницы
document.addEventListener('DOMContentLoaded', function() {
    loadTableData('tab1'); // Загружаем данные для таба 'tab1', замените на нужный таб
});
