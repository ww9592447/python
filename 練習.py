import asyncio
import aiohttp

async def send_request():
    async with aiohttp.ClientSession() as session:
        data = aiohttp.FormData()
        data.add_field('token', 'VOaJpmBzrC55yG-z7EJXk1R9AjIf8gGGlEOSjmXj:QlDlI78aS5FEbnwewAqNPF5vKH4=:eyJzY29wZSI6InRlc3QtZG91dyIsIm1pbWVMaW1pdCI6ImltYWdlL2pwZWc7aW1hZ2UvcG5nO2ltYWdlL2JtcDtpbWFnZS9naWY7aW1hZ2Uvd2VicCIsImRlYWRsaW5lIjoxNjE0MzMzNzQzfQ==')
        data.add_field('file', open(r'E:\1.jpg', 'rb'), filename='1.jpg',
                       content_type='multipart/form-data')

        async with session.post('https://upload.qiniup.com/', data=data) as resp:
            print(await resp.text())

asyncio.run(send_request())