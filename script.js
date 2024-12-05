// Импортируем необходимые функции из firebase.js
import { db, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from './firebase.js';

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
    try {
        const querySnapshot = await getDocs(collection(db, tabId));
        querySnapshot.forEach((doc) => {
            const newRow = table.insertRow();
            const data = doc.data();
            
            // Добавление данных в ячейки таблицы
            Object.entries(data).forEach(([key, value]) => {
                const newCell = newRow.insertCell();
                newCell.textContent = value;
                newCell.contentEditable = true; // Ячейки можно редактировать
                newCell.addEventListener('input', () => {
                    updateRowData(doc.id, tabId, key, newCell.textContent);
                });
            });
            
            // Добавить кнопку "Удалить" в последнюю ячейку
            const deleteCell = newRow.insertCell();
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Удалить';
            deleteButton.onclick = function() {
                if (confirm("Вы уверены, что хотите удалить эту запись?")) {
                    deleteRow(this, doc.id, tabId); // Удаление данных из Firestore
                }
            };
            deleteCell.appendChild(deleteButton);
        });
    } catch (error) {
        console.error("Ошибка при загрузке данных из Firestore:", error);
        alert("Произошла ошибка при загрузке данных.");
    }
}

// Обновление данных в Firestore при редактировании
async function updateRowData(docId, tabId, field, value) {
    try {
        const docRef = doc(db, tabId, docId);
        await updateDoc(docRef, {
            [field]: value
        });
    } catch (error) {
        console.error("Ошибка при обновлении данных:", error);
        alert("Произошла ошибка при обновлении данных.");
    }
}

// Удаление строки из таблицы и из Firestore
async function deleteRow(button, docId, tabId) {
    try {
        const docRef = doc(db, tabId, docId);
        await deleteDoc(docRef);
        button.closest('tr').remove(); // Удалить строку из таблицы
    } catch (error) {
        console.error("Ошибка при удалении данных:", error);
        alert("Произошла ошибка при удалении данных.");
    }
}

// Добавление новой записи в таблицу
function addRow(tabId) {
    const newRow = document.getElementById(tabId + '-table').getElementsByTagName('tbody')[0].insertRow();
    const columns = ['№ дела', 'ФИО заявителя', 'Контакты заявителя', 'Дата поступления', 'Дата интервью', 'Дата консультации', 'Краткое описание дела', 'Стажеры', 'Куратор'];

    columns.forEach(col => {
        const newCell = newRow.insertCell();
        newCell.contentEditable = true;
        newCell.addEventListener('input', () => {
            updateRowData('new', tabId, col, newCell.textContent);
        });
    });

    const deleteCell = newRow.insertCell();
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.onclick = function() {
        deleteRow(this, 'new', tabId);
    };
    deleteCell.appendChild(deleteButton);
}
