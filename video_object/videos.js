// ML VIDEO OBJECT DETECTION 
// BY KEVIN WALKER JUNE 2023
// ADAPTED FROM https://github.com/ml5js/ml5-library/blob/main/examples/p5js/ObjectDetector/ObjectDetector_COCOSSD_Video/sketch.js
// MY IMPLEMENTATION AT https://ai.postdigitalcultures.org/videoo.html

let video;
let detector;
let detections = [];
let playing = true; // video plays automatically

function setup() {
  // create canvas sized to container div
  var offsets = document.getElementById('myContainer').getBoundingClientRect();
  let myCanvas = createCanvas(offsets.width, offsets.width*0.75);
  myCanvas.parent('myContainer');
  // size the vid to the canvas/container
  var top = offsets.top;
  var left = offsets.left;
  video = createVideo(['gigo30.mp4'], videoReady);
  video.position(left,top);
  video.size(width,height);
  video.pause(); // until model is loaded
  video.hide(); // until model is loaded
}

function videoReady() {
  // Models available are 'cocossd', 'yolo'
  detector = ml5.objectDetector('cocossd', modelReady);
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results;
  detector.detect(video, gotDetections);
}

function modelReady() {
  detector.detect(video, gotDetections);
  video.loop(); // now play the vid
}

function draw() {
  image(video, 0, 0); // show the vid

  // draw text & boxes for objects detected

  for (let i = 0; i < detections.length; i += 1) {
    const object = detections[i];
    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    rect(object.x, object.y, object.width, object.height);
    noStroke();
    fill(255);
    textSize(24);
    text(object.label, object.x + 10, object.y + 24);
  }
}

// plays or pauses the video depending on current state
function mousePressed() {
  if (playing) {
    video.pause();
  } else {
    video.loop();
  }
  playing = !playing;
}
