import requests

movie = input("enter movie name")
res = requests.post(url= 'http://localhost:5000/predict',json = {
    'movie':movie
})
print(movie)
if(res.status_code == 200):
    print(res.json())
elif(res.status_code>=500):
    print(res)
    print("Internal server error")
else:
    print("error")