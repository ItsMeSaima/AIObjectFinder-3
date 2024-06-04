
object_name = "";
status= "";
objects = [];

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
webcam = createCapture(VIDEO);
    webcam.size(480, 380);
    webcam.hide();
}

function draw(){
    image(webcam, 0, 0, 480, 380);
    if ( status != "") {
        objectDetector.detect( webcam, gotResults);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
           
            percent = floor(objects[i].confidence * 100);
            text ( objects[i].label + " " + percent +  "%",objects[i].x , objects[i].y );
            noFill();
            stroke ("#FF0000");
            rect (objects[i].x - 15 , objects[i].y - 15 , objects[i].width , objects[i].height);

            if(objects[i].label ==  object_name){
                webcam.stop();
                document.getElementById("object_status").innerHTML  =  object_name + "  Found  ";
              
              synth = window.speechSynthesis;
              utterThis = new SpeechSynthesisUtterance(object_name + "Found");
              synth.speak(utterThis);

             }
             else{
                document.getElementById("object_status").innerHTML  =  object_name + " Not Found  ";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name + "Not Found");
                synth.speak(utterThis);
             }
            }
        }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
   object_name = document.getElementById("input").value;
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
   
}
function gotResults(error,results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
}
function showAlert() {
    
    alert("You will have to put an object name in the input and click start. Then, it will let you know if that object is found or not. For example, if you write cup and there is a cup in front of the webcam it will say 'found', if its not a cup and its something else then it will say 'not found'. ---> On your google chrome, towards the top right corner there will be 3 dots. Click those dots and adjust your screen size to 80%, so you can have a perfect layout of the wep app.");
   
     
   }
   