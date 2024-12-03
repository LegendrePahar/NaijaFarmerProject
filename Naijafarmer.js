const video = document.getElementById('video');
const captureButton = document.getElementById('capture');

// Add an event listener to the button to open the camera on click
captureButton.addEventListener('click', () => {
    // Request access to the device camera
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            // Display the live camera feed in the video element
            video.style.display = 'block'; // Show the video element
            video.srcObject = stream;
        })
        .catch((err) => {
            console.error("Error accessing the camera: ", err);
        });
});
    