# Данные для захода в amoCRM

Логин

```
sdgfbhiul@yandex.ru
```

Пароль

```
BestPasswordInTheWorld
```

[ссылка на amoCRM](https://sdgfbhiul.amocrm.ru/settings/profile/)

# Как запустить

## Приложение

1. Скачиваем архив, распаковываем
2. Устанавливаем библиотеки

```bash
npm install
```

3. Запускаем проект

```bash
npm run start
```

## Ngrok

1. Для запуска сервера, пишем в консоли

```bash
ngrok http http://localhost:3000
```

## amoCRM

В корневой папке проекта лежит `data.json`, для того, чтобы его заполнить, делаем следующее

1. нужно из crm переписать код авторизации, в переменную `client.code`.
   Расположение ключа:
   `amoМаркет -> Установленные -> MyService -> Ключи доступа -> Код авторизации (действует 20 минут)`
2. Что бы получить токен, нужно запустить приложение и перейти по маршруту `http://localhost:3000/api`,
    > Перезагрузите приложение, что бы изменения вступили в силу
3. После того, как вы получили токен, нужно вставить его в поле `server.access_token`, можно весь ответ скопировать в `server`.
4. Из консоли **Ngrok** нужно переписать ссылку
   **Пример**

```
Forwarding    https://c868-5-18-250-94.ngrok.io -> http://localhost:3000
```

https://c868-5-18-250-94.ngrok.io нужно переписать в `client.data.redirect_uri`

# Как пользоваться

Файл конфигурации postman лежит в корневой папке `postmanConfig.json`
`get Token` - возвращает токен с amoCRM
`TestContact1` и `TestContact2` - два тестовый пользователя
