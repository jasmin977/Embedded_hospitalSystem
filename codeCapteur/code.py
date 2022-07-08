
import RPi.GPIO as GPIO
import http.client
from json import dumps, loads

GPIO.setmode(GPIO.BCM)
GPIO.setup(23,GPIO.IN)      # pin du PIR configurée en entrée
GPIO.setup(26,GPIO.OUT)     # pin de la LED configurée en sortie

# config
IP_ADDRESS = "127.0.0.1"
PORT = 5000
compteur = 0

def sendData(data):
    con = http.client.HTTPConnection(IP_ADDRESS, PORT, timeout=10)
     # you can send any type of date (UPDATE the data Dict)
    headers = {'Content-type': 'application/json'}
     # Change python dictionary to json format to be send to the server
    json_data = dumps(data)
    # send an HTTP POST request
    con.request('POST', "/", json_data, headers)
    print("sending request...")
    res = con.getresponse()
    msg = res.read().decode("utf-8") 
    return msg

etatPrecedent = 0  # la dernière fois qu'on a vérifié...y avait-il du mouvement?

while True:
    mouvement = GPIO.input(23)
    if mouvement:      # mouvement détecté
        GPIO.output(26,GPIO.HIGH)  # on allume la LED
        if etatPrecedent == 0:
            print ("Detection d'un mouvement!")
            compteur=compteur+1
            print(compteur)
          
            #when detecting a movment send a request to the server to update the admin (frontend application)
            sendData({"motionDetected" : compteur})
          


    else:
        GPIO.output(26,GPIO.LOW)   # on éteint la LED
    etatPrecedent = mouvement
