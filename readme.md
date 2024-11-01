
# TAIL-APP

<img align="left" alt="tail-app | img" width="100%" style="max-width: 100%;" src="https://github.com/Vladimir-Grinko/tail-app/blob/master/public/tail-log.png" />

### Сервис просмотров логов

```
Работа сервера настроена на работу под операционной системой "Win32"
Передача информации осуществляется за счет WebSocket
Сервер не останавливается при достижении конца файла, а ждет, пока к входу будут добавлены 
дополнительные данные, затем моментально отправляются на сторону клиента.

1. Скачайте папку в необходимую директорию;

2. Переместите файл с логами "test.log" в папку logs;

3. Перейдите в корневую папку проекта;

```

## Переход в папку проекта

```
cd C:\Users\путь к папке\tail-app\
```

### Установка зависимостей

```
npm install
```

### Запуск сервера

Перед стартом убедитесь, что файл с логами находится в папке logs и правильно назван.
Если название файла не соответствует, то, либо переименуйте файл, либо в файле "package.json" 
в строке "start": "node app.js /logs/test.log" - "test.log" замените на название вашего файла.

Теперь можно начинать.

```
npm start
```

### Проверка работы

Сервер работает на

```
http://localhost:8000/

```
, перейтите по ссылке в браузере

### Отображение логов в браузере

Для страрта необходимо ввести число последних строк и нажать на кнопку "Начать"

в любой момент можно изменить число и снова нажать на кнопку "Начать"
