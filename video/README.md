# Video classification

In-browser video clasification using ML5 and MobileNet
Created May 2023, updated Aug 2024

I didn't create a new branch, instead there are two versions here. 

First version: index.html and video.js is adapted from <a href="https://github.com/ml5js/ml5-library/tree/main/examples/p5js/ImageClassification">this code</a>. Afterwards I dispensed with p5 and just used javascript with ML5 library. It classifies each frame in real time - fun to watch but not too functional.

Second version I rebuilt from scratch: class.html and classification.js
Averages the classifications from each frame then displays the most frequent one at the end. 
