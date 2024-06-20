Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
   });
   
       camera = document.getElementById("camera");
   
   Webcam.attach( '#camera' );
   
   function take_snapshot(){
       Webcam.snap(function(data_uri) {
           document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
       })
   }
   
   console.log('ml5 version', ml5.version);
   
   classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/MdBKrd3Uo/model.json',modelLoaded);
   function modelLoaded(){
       console.log('Model Loaded!');
   }

function speak(){
    var synth = window.speechSynthesis;
    speak_data = toSpeak;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}
function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("result_gestore_name").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        toSpeak = "";
        if(results[0].label == "amazing"){
            toSpeak = "This looks amazing";
            document.getElementById("update_gestore").innerHTML = "&#128076";
        }
        else if(results[0].label == "best"){
            toSpeak = "All the best";
            document.getElementById("update_gestore").innerHTML = "&#128077";

        }
        else if(results[0].label == "victory"){
            toSpeak = "That was a marvelous victory";
            document.getElementById("update_gestore").innerHTML = "&#9996";
        }
        speak();
    }
}