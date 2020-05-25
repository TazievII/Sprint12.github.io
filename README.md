# Sprint12
## Backend
### Ver. 0.1.0
#### npm run start - запуск сервера, run dev - в режиме разработки с hotreload
Установлено: 
1. Eslint
2. Nodemon
3. Express, body-parser, mongoose, validator
4. Api get users / cards / userId / cardsId , delete cardsId, patch user
## Taziev Ilya 
(tazievii@gmail.com)


## Show Users 
Возвращает всех пользователей
URL /users
Methot: GET
Успех запроса:
Code: 200, Content: Массив из { "_id":"str","name":"str","about":"str","avatar":"URL" }


## Show User
Возвращает json одного пользователя по _id
URL /users/:id
Method: GET
URL Params Required: id=[integer]
Success Response:
Code: 200, Content: { "_id":"str","name":"str","about":"str","avatar":"URL" }
Error Response:
Code: 404 NOT FOUND, Content: { message: 'Пользователь не найден' }


## Show cards
Возвращает json с массивом всех карточек
URL /cards
Method: GET
Успех запроса:
Code: 200, Content: Массив из { "likes": Массив с id пользователей,"createdAt":"Дата формирования","_id":"str","name":"str","link":"URL","owner":"id сформировавшего" }


## Create User
Создает нового пользователя
URL /users
Method: POST
Успех запроса:
Code: 200, Content: Массив из { "_id":"str","name":"str","about":"str","avatar":"URL" }
Code: 412, Валидируется ссылка на аватар, если не проходит вернет json { message: 'Ошибка в ссылке на аватар' }
Code: 400, Content: JSON { message: err.message } - Если валидацию не прошли name - about


## Update User
Обновление name и about
URL /users/me
Method: PATCH
Успех запроса:
Code: 200, Content: Массив из { "_id":"str","name":"str","about":"str","avatar":"URL" }
Code: 400, Content: JSON { message: err.message } - Если валидацию не прошли name - about


## Update User Avatar
Обновление avatar
URL /users/me/avatar
Method: PATCH
Успех запроса:
Code: 200, Content: Массив из { "_id":"str","name":"str","about":"str","avatar":"URL" }
Code: 412, Валидируется ссылка на аватар, если не проходит вернет json { message: 'Ошибка в ссылке на аватар' }

## Delete Card
Удаление карточки
URL /cards/:cardId
Method: DELETE
Code: 200, Content: { "likes": Массив с id пользователей,"createdAt":"Дата формирования","_id":"str","name":"str","link":"URL","owner":"id сформировавшего" }
Code: 404, Eсли не найдена вернет json { message: 'Карточка не найдена' }

## Like Card
Добавление лайка
URL /cards/:cardId/likes
Method: PUT
Code: 200, Content: "likes": Массив с id пользователей + новый,"createdAt":"Дата формирования","_id":"str","name":"str","link":"URL","owner":"id сформировавшего"

## Dislike Card
Удаление лайка
URL /cards/:cardId/likes
Method: DELETE
Code: 200, Content: "likes": Массив с id пользователей - удаленный,"createdAt":"Дата формирования","_id":"str","name":"str","link":"URL","owner":"id сформировавшего"
