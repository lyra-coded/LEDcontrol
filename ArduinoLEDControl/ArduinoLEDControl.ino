// color swirl! connect an RGB LED to the PWM pins as indicated
// in the #defines
// public domain, enjoy!

// gives arduino IDE permissions to program arduino on ttyACM0
// sudo chmod a+rw /dev/ttyACM0
 
#define REDPIN 5
#define GREENPIN 6
#define BLUEPIN 3

// ignore example code
#define prod
 
#define FADESPEED 6     // make this higher to slow down
#define RGB_STR_LEN 16

int serialInputVal = 0;
bool sendNewLineChar = 0;
bool msgReadSuccess = 0;
String rgbString;

typedef struct rgbColor {
  int red;
  int green;
  int blue;
};

void setup() {
  pinMode(REDPIN, OUTPUT);
  pinMode(GREENPIN, OUTPUT);
  pinMode(BLUEPIN, OUTPUT);
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(9600);
}

//
// Might be nice to turn this into a "connection" class
// it's a fairly simple device that probably won't need to handle multiple connections so I think c is fine
//

// parser for rgb(red, green, blue) text fron frontend
bool parseColorFromSerialData(rgbColor& color, String textInput) {
  // find string start
  int startVal = textInput.indexOf("(", 0);
  int endVal = textInput.indexOf(",", 0);

  Serial.println("Start/end vals:");
  Serial.write(startVal);
  Serial.write(endVal);

  color.red = textInput.substring(startVal+1, endVal-1).toInt();
  startVal = endVal;
  endVal = textInput.indexOf(",", startVal);
  color.green = textInput.substring(startVal+1, endVal-1).toInt();
  startVal = endVal;
  endVal = textInput.indexOf(",", startVal);
  color.blue = textInput.substring(startVal+1, endVal-1).toInt();
  startVal = endVal;
  endVal = textInput.indexOf(",", startVal);
  
  Serial.print("red: ");
  Serial.print(color.red);
  Serial.print("green: ");
  Serial.print(color.green);
  Serial.print("blue: ");
  Serial.print(color.blue);
  
  return true;
}

int serialReadCounter = 0;
void loop() {
  // initialize color inputs
  rgbColor inputColor;
  inputColor.red = UINT8_MAX;
  inputColor.green = UINT8_MAX;
  inputColor.blue = UINT8_MAX;

  digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(250);                       // wait for a 1/4 second
  digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
  delay(250);                       // wait for a 1/4 second

// troubleshooting
#ifndef prod
  Serial.println("NERD!");
  // convert this to use an array to concatenate read serial characters
  // int serialReadCounter = 0;
  Serial.println("Buffer size:");
  Serial.println(sizeof(serialReadCounter));
  Serial.println("Counter:");
  Serial.println(serialReadCounter);
  if (serialReadCounter < RGB_STR_LEN) {
    Serial.println("Prints if buffer would not overflow");
  }
#endif // prod

  serialReadCounter++;
  while (Serial.available()) {
    // if we are not overflowing the buffer, write data to the array and increment counter
    Serial.write("Loop interated...");
    if (serialReadCounter < RGB_STR_LEN) {
      rgbString = Serial.readString();
      serialReadCounter++;
      msgReadSuccess = true;
    // if we are overflowing the buffer, clear it and reset the counter
    } else {
      rgbString.remove(0, rgbString.length());
      serialReadCounter = 0;
      msgReadSuccess = false;
    }
  }

  // print and clear string on success
  if (msgReadSuccess) {
    parseColorFromSerialData(inputColor, rgbString);
    Serial.print(rgbString.c_str());
    Serial.println("");
    rgbString.remove(0, rgbString.length());
    msgReadSuccess = false;
  }
  
#ifndef prod
  int r = 0;
  int g = 0;
  int b = 0;
#endif // prod

  // parseColorFromSerialData(&inputColor, );
  // analogWrite(BLUEPIN, inputColor.blue);
  // analogWrite(REDPIN, inputColor.red);
  // analogWrite(GREENPIN, inputColor.green);

#ifndef prod
// example for color swirl
  // fade from blue to violet

  for (r = 0; r < 256; r++) { 
    analogWrite(REDPIN, r);
    delay(FADESPEED);
  } 
  // fade from violet to red
  for (b = 255; b > 0; b--) { 
    analogWrite(BLUEPIN, b);
    delay(FADESPEED);
  } 
  // fade from red to yellow
  for (g = 0; g < 256; g++) { 
    analogWrite(GREENPIN, g);
    delay(FADESPEED);
  } 
  // fade from yellow to green
  for (r = 255; r > 0; r--) { 
    analogWrite(REDPIN, r);
    delay(FADESPEED);
  } 
  // fade from green to teal
  for (b = 0; b < 256; b++) { 
    analogWrite(BLUEPIN, b);
    delay(FADESPEED);
  } 
  // fade from teal to blue
  for (g = 255; g > 0; g--) { 
    analogWrite(GREENPIN, g);
    delay(FADESPEED);
  }
#endif // prod
}
