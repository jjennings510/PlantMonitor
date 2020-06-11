from flask import Flask, jsonify, render_template, request
import threading, queue
from datetime import datetime
from get_data import getData


app = Flask(__name__)
q = queue.Queue()

temperature = []
humidity = []
time_ax = []

def data_collection():
    while(1):
        temp, hum = getData()
        time_read = datetime.now()
        q.put(temp)
        q.put(hum)
        q.put(time_read.strftime("%H:%M"))
        
@app.route("/update", methods = ['GET'])
def update_chart():
    while not q.empty():
        temperature.append(q.get())
        humidity.append(q.get())
        time_ax.append(q.get())
    return jsonify(results = [temperature, humidity, time_ax])  
        

@app.route("/")
def index():
    return render_template('index.html')

if __name__ == '__main__':
    x = threading.Thread(target=data_collection)
    x.start()
    app.run(host = '0.0.0.0', port = 5000)
