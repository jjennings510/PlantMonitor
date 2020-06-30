from flask import Flask, jsonify, render_template, request
import threading, queue
from datetime import datetime
from get_data import getData
import serial

ser = serial.Serial("/dev/ttyACM0", 9600)
app = Flask(__name__)
q = queue.Queue()

temperature = []
humidity = []
soil_moisture = []
light = []
time_ax = []

def data_collection():
    while(1):
        hum, temp, soil, ldr = getData(ser)
        time_read = datetime.now()
        q.put(hum)
        q.put(temp)
        q.put(soil)
        q.put(ldr)
        q.put(time_read.strftime("%H:%M"))
        
@app.route("/update", methods = ['GET'])
def update_chart():
    while not q.empty():
        humidity.append(q.get())
        temperature.append(q.get())
        soil_moisture.append(q.get())
        light.append(q.get())
        time_ax.append(q.get())
    return jsonify(results = [humidity, temperature, soil_moisture, light, time_ax])  
        

@app.route("/")
def index():
    return render_template('index.html')

if __name__ == '__main__':
    x = threading.Thread(target=data_collection)
    x.start()
    app.run(host = '0.0.0.0', port = 5000)
