import serial

def getData(ser):
    hum = ser.read(5).decode('utf-8')
    temp = ser.read(5).decode('utf-8')
    soil = ser.read(5).decode('utf-8')
    ldr = ser.read(5).decode('utf-8')

    return hum, temp, soil, ldr
