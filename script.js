document.addEventListener('DOMContentLoaded', function() {
    const authSection = document.getElementById('auth-section');
    const tableSection = document.getElementById('table-section');
    const loginButton = document.getElementById('login-button');
    const logoutButton = document.getElementById('logout-button');
    const addClientButton = document.getElementById('add-client-button');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const table = document.getElementById('clients-table').getElementsByTagName('tbody')[0];

    const validUsername = 'admin';
    const validPassword = 'password123';

    // Авторизация
    loginButton.addEventListener('click', function() {
        const username = usernameInput.value;
        const password = passwordInput.value;

        if (username === validUsername && password === validPassword) {
            authSection.style.display = 'none';
            tableSection.style.display = 'block';
        } else {
            alert('Invalid credentials. Try again.');
        }
    });

    logoutButton.addEventListener('click', function() {
        authSection.style.display = 'block';
        tableSection.style.display = 'none';
        usernameInput.value = '';
        passwordInput.value = '';
    });

    // Функция добавления нового клиента
    function addClient(name, status) {
        let row = table.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);

        cell1.textContent = name;
        cell2.textContent = status;
        cell3.innerHTML = '<button class="edit-button">Edit</button>';
    }

    // Добавление нового клиента
    addClientButton.addEventListener('click', function() {
        const name = prompt('Enter client name:');
        const status = prompt('Enter status (e.g., In Process, Completed):');

        if (name && status) {
            addClient(name, status);
        } else {
            alert('Name and status are required.');
        }
    });

    // Редактирование клиента
    table.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit-button')) {
            const row = event.target.closest('tr');
            const nameCell = row.cells[0];
            const statusCell = row.cells[1];

            const newName = prompt('Edit client name:', nameCell.textContent);
            const newStatus = prompt('Edit status:', statusCell.textContent);

            if (newName) nameCell.textContent = newName;
            if (newStatus) statusCell.textContent = newStatus;
        }
    });
});