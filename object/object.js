// ML OBJECT DETECTION IN IMAGES
// BY KEVIN WALKER JUNE 2023
// ADAPTED FROM https://learn.ml5js.org/#/reference/object-detector
// MY IMPLEMENTATION AT https://ai.postdigitalcultures.org/object.html

let objectDetector; // to hold the ML model
let img; // the image to analyse


// PRELOAD BOTH IMAGE AND MODEL FOR BETTER PERFORMANCE

function preload() { 
  // Select a random image from folder of numbered files - adapt this to your context
  imgsrc = "images/fdp63/fdp00" + Math.floor(Math.random() * 130 + 1) + ".png"; 
  // call imageReady when loaded
  // check the difference between loadImage and createImg
  img = createImg(imgsrc, imageReady); 
  img.hide(); // hide the image in the browser until loaded
  objectDetector = ml5.objectDetector('cocossd');
}

function imageReady(){
  image(img, 0, 0); // now display the image
  objectDetector.detect(img, gotResult); // detect objects
}

// NOTE THERE IS NO DRAW LOOP

function setup() {
  // Create a canvase sized to the div containing it
  var offsets = document.getElementById('myContainer').getBoundingClientRect();
  let myCanvas = createCanvas(offsets.width, offsets.width*0.75);
  myCanvas.parent('myContainer');
}

// A function to run when we get any errors and the results
function gotResult(err, results) {
  select('#status').html('Model Loaded');
  if (err) {
    console.log(err);
  }

  // draw bounding box & label:

  for (let i = 0; i < results.length; i += 1) {
    noStroke();
    fill(0, 255, 0);
    text(
      `${results[i].label} ${nfc(results[i].confidence * 100.0, 2)}%`,
      results[i].x + 5,
      results[i].y + 15,
    );
    noFill();
    strokeWeight(4);
    stroke(0, 255, 0);
    rect(results[i].x, results[i].y, results[i].width, results[i].height);
  }
}
