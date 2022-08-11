function setup(){
    canvas = createCanvas(380,280);
    canvas.position(425,250);
    video = createCapture(VIDEO);
    video.hide();
    video.size(380,280);
    
    }
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = 'object mentioned found.';
    object_name = document.getElementById(object_input).value;

}
object_name = "";
status1 = "";
objects = [];
function modelLoaded(){
    console.log("model loaded");
    status1 = true;
}
function draw(){
    image(video, 0, 0, 380, 280);
    if(status1 != ""){
        objectDetector.detect(video, gotResult);
        for(i=0; i < objects.length; i++){
        fill("#FF0000");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        if(objects[i].label == object_name){
            video.stop;
            objectDetector.detect(gotResult);
            document.getElementById('status').innerHTML = object_name;
            synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(object_name + "found");
            synth.speak(utterThis);
            
        }
    
        }
    }
    
    
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}