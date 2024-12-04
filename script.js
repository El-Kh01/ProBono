document.addEventListener('DOMContentLoaded', function() {
    // Пример добавления нового клиента
    const table = document.getElementById('clients-table').getElementsByTagName('tbody')[0];

    function addClient(name, status) {
        let row = table.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);

        cell1.textContent = name;
        cell2.textContent = status;
    }

    // Добавляем нового клиента
    addClient('Alice Green', 'In Process');
});