// ML IMAGE CLASSIFICATION 
// BY KEVIN WALKER JUNE 2023
// ADAPTED FROM https://learn.ml5js.org/#/reference/image-classifier
// MY IMPLEMENTATION AT https://ai.postdigitalcultures.org/index.html

// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
let classifier;

// A variable to hold the image we want to classify
let img;
var imgsrc;

function preload() { // for performance
  classifier = ml5.imageClassifier('MobileNet');
  imgsrc = "images/fdp63/fdp00" + Math.floor(Math.random() * 130 + 1) + ".png";
  img = loadImage(imgsrc);
}

function setup() {
  // create canvas sized to container div
  var offsets = document.getElementById('myContainer').getBoundingClientRect();
  let myCanvas = createCanvas(offsets.width, offsets.width*0.75);
  myCanvas.parent('myContainer');
  classifier.classify(img, gotResult);
  image(img, 0, 0, width, height);
}

// A function to run when we get any errors and the results
function gotResult(error, results) {
  select('#status').html('Model Loaded');
  // Display error in the console
  if (error) {
    console.error(error);
  } else {
    // The results are in an array ordered by confidence.
    console.log(results);
    // make sure to put the text inside the container div
    let c = createDiv(`Label: ${results[0].label}`);
    c.parent('myContainer');
    let d = createDiv(`Confidence: ${nf(results[0].confidence, 0, 2)*100}` + "%");
    d.parent('myContainer');
   }
}
