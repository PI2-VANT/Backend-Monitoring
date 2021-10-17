#!/usr/bin/env python
import pika
import time
import json
# this queue is the destination queue
credentials = pika.PlainCredentials('admin', 'pass')
parameters = pika.ConnectionParameters('localhost', 5672, '/', credentials)
connection = pika.BlockingConnection(parameters)


channel = connection.channel()
channel.queue_declare(queue='vant')


x =  '{ "data": { "id": 123, "flyId": 1, "voo": [32,1,2,3] } }'

# parse x:
y = json.loads(x)
for i in range(1, 10):
  channel.basic_publish(exchange='', routing_key='vant', body=x)
  print('Mensagem enviada: '+str(x))
  time.sleep(3)

connection.close()