import requests

files = {
         'token': 'VOaJpmBzrC55yG-z7EJXk1R9AjIf8gGGlEOSjmXj:QlDlI78aS5FEbnwewAqNPF5vKH4=:eyJzY29wZSI6InRlc3QtZG91dyIsIm1pbWVMaW1pdCI6ImltYWdlL2pwZWc7aW1hZ2UvcG5nO2ltYWdlL2JtcDtpbWFnZS9naWY7aW1hZ2Uvd2VicCIsImRlYWRsaW5lIjoxNjE0MzMzNzQzfQ==',
         'file': ('1.jpg', open(r'E:\1.jpg', 'rb'), ),
         }

url = 'https://upload.qiniup.com/'
r = requests.post(url ,files=files)
print(r.text)

