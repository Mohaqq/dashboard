import RPi.GPIO as GPIO
from flask import Flask, render_template

app = Flask(__name__)

GPIO.setmode(GPIO.BCM)
motion_pin = 17  # GPIO pin connected to the motion sensor
lamp_state = False

GPIO.setup(motion_pin, GPIO.IN)

@app.route('/')
def index():
    return render_template('index.html', lamp_state=lamp_state)

def motion_detected(channel):
    global lamp_state
    lamp_state = not lamp_state
    # Add code to control the lamp (e.g., GPIO.output(lamp_pin, lamp_state))

if __name__ == '__main__':
    try:
        GPIO.add_event_detect(motion_pin, GPIO.RISING, callback=motion_detected)
        app.run(debug=True, host='0.0.0.0')
    except KeyboardInterrupt:
        GPIO.cleanup()
