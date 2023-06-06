// ML VIDEO CLASSIFICATION 
// BY KEVIN WALKER JUNE 2023
// ADAPTED FROM https://github.com/ml5js/ml5-library/tree/main/examples/p5js/ImageClassification/ImageClassification_Video
// MY IMPLEMENTATION AT https://ai.postdigitalcultures.org/video.html

let classifier;
let video;
let resultsP; // status paragraph
let playing = true; // video plays automatically

function setup() {
  // create canvas sized to container div
  var offsets = document.getElementById('myContainer').getBoundingClientRect();
  let myCanvas = createCanvas(offsets.width, offsets.width*0.75);
  myCanvas.parent('myContainer');
  // size the vid to the canvas/container
  var top = offsets.top;
  var left = offsets.left;
  video = createVideo(['gigo30.mp4']);
  video.position(left,top);
  video.size(width,height);
  video.pause(); // until model is loaded
  video.mousePressed(toggleVid); 
  // Initialize the Image Classifier method with MobileNet and the video as the second argument
  classifier = ml5.imageClassifier('MobileNet', video, modelReady);
  resultsP = createP('Loading model and video...');
  resultsP.parent('myContainer'); // ensure the P is in container div
}

function modelReady() {
  console.log('Model Ready');
  classifyVideo();
  video.loop(); // now play the vid
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.classify(gotResult);
}

// When we get a result
function gotResult(err, results) {
  // The results are in an array ordered by confidence.
  // note I am converting to a  percentage
  resultsP.html(`${results[0].label  } ${nf(results[0].confidence, 0, 2)*100}`+'%');
  classifyVideo();
}

// plays or pauses the video depending on current state
function toggleVid() {
  if (playing) {
    video.pause();
  } else {
    video.loop();
  }
  playing = !playing;
}
