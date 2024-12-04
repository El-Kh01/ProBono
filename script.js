<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Список клиентов юридической клиники</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Список клиентов</h1>

    <!-- Форма авторизации -->
    <form id="login-form">
        <label for="username">Логин:</label>
        <input type="text" id="username" required>
        <br>
        <label for="password">Пароль:</label>
        <input type="password" id="password" required>
        <br>
        <button type="submit">Войти</button>
    </form>

    <!-- Скрытый блок с таблицами -->
    <div id="app-content" style="display: none;">
        <h2>Список клиентов</h2>

        <!-- Кнопки для переключения вкладок -->
        <div>
            <button class="tab-btn" onclick="showTab('new')">Поступившие</button>
            <button class="tab-btn" onclick="showTab('in-progress')">В процессе</button>
            <button class="tab-btn" onclick="showTab('completed')">Завершённые</button>
        </div>

        <!-- Таблицы клиентов -->
        <div id="new" class="client-table" style="display: block;">
            <h3>Поступившие</h3>
            <table>
                <thead>
                    <tr>
                        <th>Имя клиента</th>
                        <th>Статус</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Здесь будет список поступивших клиентов -->
                </tbody>
            </table>
        </div>

        <div id="in-progress" class="client-table" style="display: none;">
            <h3>В процессе</h3>
            <table>
                <thead>
                    <tr>
                        <th>Имя клиента</th>
                        <th>Статус</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Здесь будет список клиентов в процессе -->
                </tbody>
            </table>
        </div>

        <div id="completed" class="client-table" style="display: none;">
            <h3>Завершённые</h3>
            <table>
                <thead>
                    <tr>
                        <th>Имя клиента</th>
                        <th>Статус</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Здесь будет список завершённых клиентов -->
                </tbody>
            </table>
        </div>
    </div>

    <script>
        // Функция для переключения вкладок
        function showTab(tabId) {
            // Скрыть все вкладки
            var tabs = document.querySelectorAll('.client-table');
            tabs.forEach(function(tab) {
                tab.style.display = 'none';
            });

            // Показать выбранную вкладку
            var selectedTab = document.getElementById(tabId);
            selectedTab.style.display = 'block';
        }

        // Функция для отображения контента после авторизации
        document.getElementById('login-form').addEventListener('submit', function(event) {
            event.preventDefault(); // Отменить стандартное поведение формы
            document.getElementById('app-content').style.display = 'block';
            document.getElementById('login-form').style.display = 'none';
        });
    </script>

</body>
</html>