In-browser video clasification using ML5 and MobileNet
Created May 2023, updated Aug 2024

I didn't create a new branch, so there are two version here. 

First version: index.html and video.js is adapted from https://github.com/ml5js/ml5-library/tree/main/examples/p5js/ImageClassification
I dispensed with p5js and just used javascript with ML5 library. It classifies each frame in real time - fun to watch but not too functional.

Second version rebuilt from scratch: class.html and classification.js
Averages the classifications then displays the most frequent one at the end. 
