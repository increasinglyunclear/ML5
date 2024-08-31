document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('myVideo');
    const status = document.getElementById('status');
    let classifier;
    const results = [];  // Array to store classification results

    // Load the MobileNet model using a callback
    classifier = ml5.imageClassifier('MobileNet', function() {
        status.textContent = 'Model loaded. Play the video to the end to analyse.';
    });

    // Update status when the video starts playing
    video.addEventListener('play', function() {
        status.textContent = 'Analysing...';
    });

    // Classify each frame of the video
    video.addEventListener('timeupdate', function() {
        if (classifier && !video.paused && !video.ended) {
            classifyFrame();
        }
    });

    // Function to classify the current frame of the video
    function classifyFrame() {
        classifier.classify(video, function(err, predictions) {
            if (err) {
                console.error('Error during classification:', err);
                return;
            }
            const result = predictions[0];  // Take the top prediction
            results.push({
                label: result.label,
                confidence: result.confidence
            });
        });
    }

    // Handle video end
    video.addEventListener('ended', function() {
        // Step 1: Group results by label dynamically
        const groupedResults = results.reduce((acc, result) => {
            if (!acc[result.label]) {
                acc[result.label] = { count: 0, totalConfidence: 0 };
            }
            acc[result.label].count += 1;
            acc[result.label].totalConfidence += result.confidence;
            return acc;
        }, {});

        // Step 2: Calculate the average confidence for each label
        const averages = Object.keys(groupedResults).map(label => {
            const data = groupedResults[label];
            return {
                label: label,
                averageConfidence: data.totalConfidence / data.count,
                count: data.count
            };
        });

        // Step 3: Find the most frequent classification
        const mostFrequent = averages.reduce((prev, current) => {
            return current.count > prev.count ? current : prev;
        }, averages[0]);

        // Step 4: Display the most frequent classification and its average confidence
        const resultText = `${mostFrequent.label} (${(mostFrequent.averageConfidence * 100).toFixed(2)}%`;
        status.textContent = `Most Frequent Classification: ${resultText} confidence)`;
    });

    // Optional: Error handling if video fails to load
    video.addEventListener('error', function() {
        status.textContent = "An error occurred while loading the video.";
    });
});
