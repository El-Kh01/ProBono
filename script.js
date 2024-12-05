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
        console.log("Данные обновлены в Firestore.");
    } catch (error) {
        console.error("Ошибка при обновлении данных в Firestore:", error);
        alert("Произошла ошибка при обновлении данных.");
    }
}

// Добавление новой строки в таблицу и в Firestore
async function addRow(tabId) {
    const table = document.getElementById(tabId + '-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    
    const rowData = {
        "caseNumber": "",
        "applicantName": "",
        "applicantContact": "",
        "arrivalDate": "",
        "interviewDate": "",
        "consultationDate": "",
        "caseDescription": "",
        "interns": "",
        "curator": ""
    };
    
    // Заполняем строку данными
    Object.entries(rowData).forEach(([key, value], index) => {
        const newCell = newRow.insertCell();
        newCell.contentEditable = true; // Делать ячейки редактируемыми
        newCell.addEventListener('input', () => {
            rowData[key] = newCell.textContent; // Сохраняем данные в объект
        });
    });
    
    // Добавление кнопки удаления
    const deleteCell = newRow.insertCell();
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.onclick = function() {
        if (confirm("Вы уверены, что хотите удалить эту запись?")) {
            deleteRow(this, null, tabId); // Удаляем строку из таблицы, но не из Firestore, если не передан ID
        }
    };
    deleteCell.appendChild(deleteButton);
    
    // Добавляем строку в коллекцию Firestore
    try {
        const docRef = await addDoc(collection(db, tabId), rowData);
        console.log("Документ добавлен с ID: ", docRef.id);
    } catch (error) {
        console.error("Ошибка добавления документа в Firestore:", error);
        alert("Произошла ошибка при добавлении записи.");
    }
}

// Удаление строки из таблицы и Firestore
async function deleteRow(button, docId, tabId) {
    // Удаляем строку из таблицы
    const row = button.parentElement.parentElement;
    row.remove();
    
    // Удаляем данные из Firestore
    if (docId) {
        try {
            await deleteDoc(doc(db, tabId, docId));
            console.log(`Документ с ID ${docId} удален`);
        } catch (error) {
            console.error("Ошибка при удалении документа:", error);
            alert("Произошла ошибка при удалении записи.");
        }
    }
}

// При загрузке страницы загружаем данные для всех вкладок
document.addEventListener('DOMContentLoaded', function() {
    loadTableData('new');
    loadTableData('in-progress');
    loadTableData('completed');
});
