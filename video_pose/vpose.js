// ML VIDEO POSE TRACKING 
// BY KEVIN WALKER JUNE 2023
// ADAPTED FROM VARIOUS EXAMPLES ON https://learn.ml5js.org/#/reference/posenet?id=examples
// and https://github.com/ml5js/ml5-library/tree/main/examples/p5js/PoseNet
// MY IMPLEMENTATION AT https://ai.postdigitalcultures.org/vpose.html

let video; // variable holds the vid
let poseNet; // holds the ML model
let poses = []; // holds poses detected

function setup() {
  // size the canvas to container div
  var offsets = document.getElementById('myContainer').getBoundingClientRect();
  let myCanvas = createCanvas(offsets.width, offsets.width*0.75);
  myCanvas.parent('myContainer');
  video = createVideo(['gigo640.mp4']); // changed from webcam example

  // Create a new poseNet method for multiple detection
  poseNet = ml5.poseNet(video, 'multiple', modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  video.hide(); // until modelReady
}

function modelReady() {
  video.loop();
}

function draw() {
  image(video, 0, 0);
  if (poses.length > 0) {
      drawSkeleton(poses);
      drawKeypoints(poses);
    }
 }

// THESE FUNCTIONS COME FROM THE IMAGE EXAMPLE AT https://learn.ml5js.org/#/reference/posenet?id=examples

function drawKeypoints(poses) {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255);
        stroke(20);
        strokeWeight(4);
        ellipse(round(keypoint.position.x), round(keypoint.position.y), 8, 8);
      }
    }
  }
}

function drawSkeleton(poses) {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255);
      strokeWeight(1);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
