#!/usr/bin/env python
import pika
import time
import json
import random
from datetime import datetime
# this queue is the destination queue
credentials = pika.PlainCredentials('admin', 'pass')
parameters = pika.ConnectionParameters('localhost', 5672, '/', credentials)
connection = pika.BlockingConnection(parameters)


channel = connection.channel()
channel.queue_declare(queue='vant')



# parse x:
# y = json.loads(x)
bateria = 100
for i in range(1, 10):
  v = random.randint(15,20)
  t = random.randint(28,32)
  u = random.randint(50,56)
  bateria -= 1
  p = bateria 
  now = datetime.now()
  d = now.strftime("%d-%m-%Y:T%H:%M:%S")
  y = '"registrationCode": "oo2x", "flyCode": 1, "velocidade": {0}, "temperatura": {1}, "umidade": {2}, "bateria": {3}, "pesticida":{4}, "latitude":"80.00123","longitude":"90.00123", "date":"{5}"'.format(v,t,u,bateria,p,d)
  
  x =  '{ "data": {'+ str(y)+'} }'
  channel.basic_publish(exchange='', routing_key='vant', body=x)
  print('Mensagem enviada: '+str(x))
  time.sleep(3)

connection.close()