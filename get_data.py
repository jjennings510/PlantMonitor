import Adafruit_DHT as dht
import time
    
sensor = dht.DHT11
pin = 4

def getData():
    humidity, temperature = dht.read_retry(sensor, pin)
    if humidity is not None and temperature is not None:
        print('Temp={0:0.1f}*C Humidity={1:0.1f}%'.format(temperature, humidity))
    else:
        print('Failed to get reading')

    # time.sleep(600) # Get reading every 10 minutes (leave on overnight to test)
    return temperature, humidity
        
        
# TODO: probably sace these values into a csv, 
# so those can then be plotted without relying 
# on connection to internet

