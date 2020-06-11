import Adafruit_DHT as dht
import time
    
sensor = dht.DHT11
pin = 4

def getData():
    humidity, temperature = dht.read_retry(sensor, pin)
    if humidity is not None and temperature is not None:
        print('Temp={0:0.1f}*C Humidity={1:0.1f}%'.format(temperature, humidity))
        # time.sleep(60) # Get reading every 1 minute(s) (leave on overnight to test)
    else:
        print('Failed to get reading')

    time.sleep(60)
    return temperature, humidity
        
        
# getData()

