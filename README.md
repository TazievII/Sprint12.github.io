# Sprint12
## Backend
### Ver. 0.1.5
#### npm run start - запуск сервера, run dev - в режиме разработки с hotreload
### 84.201.169.248:80 - публичный IP
### https://api.mestechko-tazievii.ml/ https://www.api.mestechko-tazievii.ml Доменное имя 
Установлено: 
1. Eslint
2. Nodemon
3. Express, body-parser, mongoose, validator, bcrypt, jwt
4. Api get users / cards / userId / cardsId , delete cardsId, patch user, signin, signup, auth
## Taziev Ilya 
(tazievii@gmail.com)

## Sighin
### Авторизация
### URL /signin
### Method: POST
### Успех запроса: token
Code: 200

## Signup
### Регистрация
### URL /signup
### Method: POST
### Успех запроса: 
Code 200, JSON - _id: user._id, name: user.name, about: user.about, avatar: user.avatar, email: user.email,

## Show Users 
### Возвращает всех пользователей
### URL /users
### Methot: GET
### Успех запроса:
### Code: 200, Content: Массив из { "_id":"str","name":"str","about":"str","avatar":"URL" }


## Show User
### Возвращает json одного пользователя по _id
### URL /users/:id
### Method: GET
### URL Params Required: id=[integer]
### Success Response:
### Code: 200, Content: { "_id":"str","name":"str","about":"str","avatar":"URL" }
### Error Response: Code: 404 NOT FOUND, Content: { message: 'Пользователь не найден' }


## Show cards
### Возвращает json с массивом всех карточек
### URL /cards
### Method: GET
### Успех запроса:
### Code: 200, Content: Массив из { "likes": Массив с id пользователей,"createdAt":"Дата формирования","_id":"str","name":"str","link":"URL","owner":"id сформировавшего" }


## Create User
### Создает нового пользователя
### URL /users
### Method: POST
### Успех запроса:
### Code: 200, Content: Массив из { "_id":"str","name":"str","about":"str","avatar":"URL" }
### Code: 400, Валидируется ссылка на аватар, если не проходит вернет json { message: 'Ошибка в ссылке на аватар' }
### Code: 400, Content: JSON { message: err.message } - Если валидацию не прошли name - about


## Update User
### Обновление name и about
### URL /users/me
### Method: PATCH
### Успех запроса:
### Code: 200, Content: Массив из { "_id":"str","name":"str","about":"str","avatar":"URL" }
### Code: 400, Content: JSON { message: err.message } - Если валидацию не прошли name - about


## Update User Avatar
### Обновление avatar
### URL /users/me/avatar
### Method: PATCH
### Успех запроса:
### Code: 200, Content: Массив из { "_id":"str","name":"str","about":"str","avatar":"URL" }
### Code: 400, Валидируется ссылка на аватар, если не проходит вернет json { message: 'Ошибка в ссылке на аватар' }

## Delete Card
### Удаление карточки
### URL /cards/:cardId
### Method: DELETE
### Code: 200, Content: { "likes": Массив с id пользователей,"createdAt":"Дата формирования","_id":"str","name":"str","link":"URL","owner":"id сформировавшего" }
### Code: 404, Eсли не найдена вернет json { message: 'Карточка не найдена' }

## Like Card
### Добавление лайка
### URL /cards/:cardId/likes
### Method: PUT
### Code: 200, Content: "likes": Массив с id пользователей + новый,"createdAt":"Дата формирования","_id":"str","name":"str","link":"URL","owner":"id сформировавшего"

## Dislike Card
### Удаление лайка
### URL /cards/:cardId/likes
### Method: DELETE
### Code: 200, Content: "likes": Массив с id пользователей - удаленный,"createdAt":"Дата формирования","_id":"str","name":"str","link":"URL","owner":"id сформировавшего"
