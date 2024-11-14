from telethon import TelegramClient

# Данные вашего приложения
api_id = '18175724'
api_hash = '7269aad41a99d71b1c35f9fd8651a95e'
phone_number = '+998933479033'

# Инициализация клиента
client = TelegramClient('anon', api_id, api_hash)

async def main():
    # Отправка кода на номер телефона пользователя
    await client.send_code_request(phone_number)
    code = input('Введите код, который прислал Telegram: ')

    # Завершаем процесс авторизации
    await client.sign_in(phone_number, code)

    # Сохраняем сессию пользователя
    session_string = client.session.save()

    # Используйте session_string для дальнейшей работы
    print('Сессия сохранена:', session_string)

with client:
    client.loop.run_until_complete(main())